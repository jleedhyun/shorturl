import connectMongoDB from '@/lib/mongodb';
import ShortUrl from '@/models/shortUrl';
import { generateRandomString, validateUrl } from '@/utils';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const shortKey = searchParams.get('shortKey');

  if (!shortKey) {
    return NextResponse.json(
      { message: 'shortKey query parameter is required' },
      { status: 400 },
    );
  }

  await connectMongoDB();

  const shortUrl = await ShortUrl.findOne({ shortKey });
  if (shortUrl) {
    return NextResponse.json(shortUrl);
  }

  return NextResponse.json(
    { message: 'Short URL does not exist' },
    { status: 404 },
  );
}

export async function POST(req: Request) {
  const { url } = await req.json();
  await connectMongoDB();

  if (!validateUrl(url)) {
    return NextResponse.json({ message: 'URL is invalid' }, { status: 400 });
  }

  const originalUrl =
    url.startsWith('http://') || url.startsWith('https://')
      ? url
      : `http://${url}`;

  const existingShortUrl = await ShortUrl.findOne({ originalUrl });
  if (existingShortUrl) {
    return NextResponse.json(existingShortUrl);
  }

  const shortKey = generateRandomString();
  const shortUrl = await ShortUrl.create({ originalUrl, shortKey });
  return NextResponse.json(shortUrl, { status: 201 });
}
