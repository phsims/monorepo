import { NextResponse } from 'next/server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseLabels(): string[] {
  const raw = process.env.CONTACT_GITHUB_LABELS?.trim();
  if (!raw) return [];
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function humanizeKey(key: string): string {
  return key
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Verifies Turnstile token and opens a GitHub issue in the configured repository.
 * Accepts any string fields plus `turnstileToken` (e.g. `name`, `email`, `message`, or custom keys).
 *
 * @see https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */
export async function POST(req: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const turnstileToken = raw.turnstileToken;

  if (typeof turnstileToken !== 'string' || !turnstileToken.trim()) {
    return NextResponse.json(
      { error: 'Verification token is required.' },
      { status: 400 },
    );
  }

  const payload: Record<string, string> = {};
  for (const [key, value] of Object.entries(raw)) {
    if (key === 'turnstileToken') continue;
    if (typeof value !== 'string') {
      return NextResponse.json(
        { error: `Field "${key}" must be a string.` },
        { status: 400 },
      );
    }
    const trimmed = value.trim();
    if (!trimmed) {
      return NextResponse.json(
        { error: `Field "${key}" cannot be empty.` },
        { status: 400 },
      );
    }
    if (trimmed.length > 10000) {
      return NextResponse.json(
        { error: `Field "${key}" is too long.` },
        { status: 400 },
      );
    }
    payload[key] = trimmed;
  }

  if (Object.keys(payload).length === 0) {
    return NextResponse.json(
      { error: 'At least one form field is required.' },
      { status: 400 },
    );
  }

  if (
    Object.prototype.hasOwnProperty.call(payload, 'email') &&
    !EMAIL_RE.test(payload.email)
  ) {
    return NextResponse.json(
      { error: 'Please provide a valid email address.' },
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

  const titleSource =
    payload.name ??
    payload.subject ??
    payload.title ??
    Object.values(payload)[0] ??
    'Contact';

  const safeTitle = titleSource
    .replace(/[\r\n]+/g, ' ')
    .replace(/[[\]]/g, '')
    .slice(0, 120);
  const issueTitle = `[Contact] ${safeTitle}`;

  const bodySections = Object.entries(payload).map(
    ([key, val]) => `### ${humanizeKey(key)}\n\n${val}`,
  );

  const issueBody = [
    '## Contact form submission',
    '',
    ...bodySections.flatMap((block) => [block, '']),
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
