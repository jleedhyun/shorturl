'use client';
import { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import AutoFixNormalRoundedIcon from '@mui/icons-material/AutoFixNormalRounded';
import Button from '@/components/Button';

export default function Home() {
  const router = useRouter();

  const [url, setUrl] = useState('');
  const [isPending, setIsPending] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        <TextField
          fullWidth
          label="Type a URL"
          onChange={handleChange}
          value={url}
          variant="outlined"
        />
        <Button
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
