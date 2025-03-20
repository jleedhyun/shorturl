'use client';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Button from '@/components/Button';
import { HOME_PATH } from '@/constants';

export default function CheckShortenedUrl() {
  const router = useRouter();

  const [url, setUrl] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsInvalid(false);
    setUrl(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!url.includes(window.location.host)) {
      setIsInvalid(true);
      return;
    }

    const shortKey = url.split(`${window.location.host}/`)[1];
    router.push(`expand/${shortKey}`);
  };

  return (
    <div
      className={`
        flex h-full min-h-screen w-full flex-col items-center justify-center
        gap-12 px-12 py-40
      `}
    >
      <div className="flex flex-col items-center gap-6">
        <Typography variant="h3">Check a shortened URL</Typography>
      </div>
      <form
        className="flex w-100 max-w-full flex-col items-center gap-10"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full flex-col gap-1">
          <TextField
            error={isInvalid}
            fullWidth
            label="Type a shortened URL"
            onChange={handleChange}
            value={url}
            variant="outlined"
          />
          {isInvalid && (
            <Typography color="error" variant="caption">
              Please enter a valid shortened URL
            </Typography>
          )}
        </div>
        <Button
          disabled={isInvalid}
          startIcon={<SearchRoundedIcon />}
          size="large"
          type="submit"
        >
          Check
        </Button>
      </form>
      <Link href={HOME_PATH}>Navigate back home</Link>
    </div>
  );
}
