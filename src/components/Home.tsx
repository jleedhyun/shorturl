'use client';
import { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { validateUrl } from '@/utils';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import AutoFixNormalRoundedIcon from '@mui/icons-material/AutoFixNormalRounded';
import Button from '@/components/Button';

export default function Home() {
  const router = useRouter();

  const [url, setUrl] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsInvalid(false);
    setUrl(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateUrl(url)) {
      setIsInvalid(true);
      return;
    }

    setIsPending(true);

    try {
      const {
        data: { shortKey },
      } = await axios.post('/api/short-urls', { url });

      router.push(`expand/${shortKey}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`
        flex h-full min-h-screen w-full flex-col items-center justify-center
        gap-12 px-12 py-40
      `}
    >
      <div className="flex flex-col items-center gap-6">
        <Typography variant="h3">Shorten a URL</Typography>
      </div>
      <form
        className="flex w-100 max-w-full flex-col items-center gap-10"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full flex-col gap-1">
          <TextField
            error={isInvalid}
            fullWidth
            label="Type a URL"
            onChange={handleChange}
            value={url}
            variant="outlined"
          />
          {isInvalid && (
            <Typography color="error" variant="caption">
              Please enter a valid URL
            </Typography>
          )}
        </div>
        <Button
          disabled={isInvalid}
          loading={isPending}
          startIcon={<AutoFixNormalRoundedIcon />}
          size="large"
          type="submit"
        >
          Shorten
        </Button>
      </form>
      <Link href="/expand">Want to check a shortened URL?</Link>
    </div>
  );
}
