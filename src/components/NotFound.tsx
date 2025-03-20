import Typography from '@mui/material/Typography';
import Button from '@/components/Button';
import { HOME_PATH } from '@/constants';

const DEFAULT_NOT_FOUND_TEXT = `The page you were looking for doesn't exist.`;
const EXPANDED_URL_NOT_FOUND_TEXT = `The shortened url you were trying to check doesn't exist.`;

interface NotFoundProps {
  isForExpandedUrl?: boolean;
}

export default function NotFound({ isForExpandedUrl }: NotFoundProps) {
  return (
    <div
      className={`
        flex h-full min-h-screen w-full flex-col items-center justify-center
        gap-12 px-12 py-40
      `}
    >
      <div className="flex flex-col items-center gap-6">
        <Typography variant="h3">Not found</Typography>
        <span className="text-on-surface-variant">
          {isForExpandedUrl
            ? EXPANDED_URL_NOT_FOUND_TEXT
            : DEFAULT_NOT_FOUND_TEXT}
        </span>
      </div>
      <Button href={HOME_PATH}>Navigate back home</Button>
    </div>
  );
}
