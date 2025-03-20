import NotFound from '@/components/NotFound';
import ShortUrlInfo from '@/components/ShortUrlInfo';
import connectMongoDB from '@/lib/mongodb';
import ShortUrl from '@/models/shortUrl';

export default async function Page({
  params,
}: {
  params: Promise<{ shortKey: string }>;
}) {
  const { shortKey } = await params;

  await connectMongoDB();

  const shortUrl = await ShortUrl.findOne({ shortKey });

  if (shortUrl) {
    return (
      <ShortUrlInfo
        originalUrl={shortUrl.originalUrl}
        shortKey={shortUrl.shortKey}
      />
    );
  }

  return <NotFound isForExpandedUrl />;
}
