import { NextResponse } from 'next/server';

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
  turnstileToken?: string;
};

function parseLabels(): string[] {
  const raw = process.env.CONTACT_GITHUB_LABELS?.trim();
  if (!raw) return [];
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Verifies Turnstile token and opens a GitHub issue in the configured repository.
 *
 * @see https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */
export async function POST(req: Request) {
  let body: ContactBody;
  try {
    body = (await req.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { name, email, message, turnstileToken } = body;

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof message !== 'string' ||
    typeof turnstileToken !== 'string' ||
    !name.trim() ||
    !email.trim() ||
    !message.trim() ||
    !turnstileToken.trim()
  ) {
    return NextResponse.json(
      { error: 'Name, email, message, and verification are required.' },
      { status: 400 },
    );
  }

  if (message.length > 10000) {
    return NextResponse.json(
      { error: 'Message is too long.' },
      { status: 400 },
    );
  }

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (!turnstileSecret) {
    return NextResponse.json(
      { error: 'Server is missing Turnstile configuration.' },
      { status: 500 },
    );
  }

  const verifyRes = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: turnstileSecret,
        response: turnstileToken,
      }),
    },
  );

  const verifyJson = (await verifyRes.json()) as {
    success?: boolean;
    'error-codes'?: string[];
  };

  if (!verifyJson.success) {
    return NextResponse.json(
      {
        error: 'Verification failed. Please refresh and try again.',
      },
      { status: 400 },
    );
  }

  const ghToken =
    process.env.GITHUB_CONTACT_TOKEN?.trim() ||
    process.env.GITHUB_TOKEN?.trim();
  if (!ghToken) {
    return NextResponse.json(
      { error: 'Server is missing GitHub token configuration.' },
      { status: 500 },
    );
  }

  const owner = process.env.CONTACT_GITHUB_OWNER?.trim() || 'phsims';
  const repo = process.env.CONTACT_GITHUB_REPO?.trim() || 'monorepo';

  const safeTitle = name
    .trim()
    .replace(/[\r\n]+/g, ' ')
    .slice(0, 120);
  const issueTitle = `[Contact] ${safeTitle}`;

  const issueBody = [
    '## Contact form submission',
    '',
    `**Name:** ${name.trim()}`,
    `**Email:** ${email.trim()}`,
    '',
    '### Message',
    '',
    message.trim(),
    '',
    '---',
    '_Submitted via CookbookKeeper contact form._',
  ].join('\n');

  const labels = parseLabels();
  const ghPayload: Record<string, unknown> = {
    title: issueTitle,
    body: issueBody,
  };
  if (labels.length > 0) {
    ghPayload.labels = labels;
  }

  const ghRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/issues`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${ghToken}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
      body: JSON.stringify(ghPayload),
    },
  );

  if (!ghRes.ok) {
    return NextResponse.json(
      { error: 'Could not create GitHub issue. Try again later.' },
      { status: 502 },
    );
  }

  const issue = (await ghRes.json()) as {
    html_url?: string;
    number?: number;
  };

  return NextResponse.json({
    issueUrl: issue.html_url,
    issueNumber: issue.number,
  });
}
