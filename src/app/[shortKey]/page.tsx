import NotFound from '@/components/NotFound';
import connectMongoDB from '@/lib/mongodb';
import ShortUrl from '@/models/shortUrl';
import { redirect } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ shortKey: string }>;
}) {
  const { shortKey } = await params;

  await connectMongoDB();

  const shortUrl = await ShortUrl.findOne({ shortKey });

  if (shortUrl) {
    redirect(shortUrl.originalUrl);
  }

  return <NotFound />;
}
