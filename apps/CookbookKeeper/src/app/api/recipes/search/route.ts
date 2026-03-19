import { getRecipesByQuery } from 'api/spoonacular';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const query = url.searchParams.get('query') ?? '';
  const numberRaw = url.searchParams.get('number');
  const number = numberRaw ? Number(numberRaw) : undefined;

  if (!query.trim()) {
    return NextResponse.json({ recipes: [] });
  }

  const data = await getRecipesByQuery({
    query,
    number: Number.isFinite(number) ? number : undefined,
  });

  return NextResponse.json(data);
}
