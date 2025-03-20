import { headers } from 'next/headers';
import Typography from '@mui/material/Typography';
import Button from '@/components/Button';
import CopyButton from '@/components/CopyButton';
import Link from '@mui/material/Link';
import { HOME_PATH } from '@/constants';

interface ShortUrlInfoProps {
  originalUrl: string;
  shortKey: string;
}

export default async function ShortUrlInfo({
  originalUrl,
  shortKey,
}: ShortUrlInfoProps) {
  const headersList = await headers();
  const hostname = headersList.get('x-forwarded-host');
  const xForwardedProto = headersList.get('x-forwarded-proto');
  const shortenedUrl = `${hostname}/${shortKey}`;
  const shortenedUrlWithProto = `${xForwardedProto}://${shortenedUrl}`;

  return (
    <div
      className={`
        flex h-full min-h-screen w-full flex-col items-center justify-center
        gap-20 px-12 py-40
      `}
    >
      <div className="flex flex-col items-center gap-16">
        <Link
          href={shortenedUrlWithProto}
          rel="noopener"
          target="_blank"
          variant="h3"
        >
          {shortenedUrl}
        </Link>
        <div className="flex flex-col items-center gap-2">
          <Typography variant="subtitle2">Original URL</Typography>
          <Link
            href={originalUrl}
            rel="noopener"
            target="_blank"
            underline="hover"
          >
            {originalUrl}
          </Link>
        </div>
      </div>
      <div className="flex gap-2">
        <CopyButton textToCopy={shortenedUrlWithProto} />
        <Button href={HOME_PATH} variant="outlined">
          Navigate back home
        </Button>
      </div>
    </div>
  );
}
