'use client';
import { useState } from 'react';
import Button from '@/components/Button';
import Snackbar from '@mui/material/Snackbar';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';

interface CopyButtonProps {
  textToCopy: string;
}

export default function CopyButton({ textToCopy }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = async () => {
    try {
      const type = 'text/plain';
      const clipboardItemData = {
        [type]: textToCopy,
      };
      const clipboardItem = new ClipboardItem(clipboardItemData);
      await navigator.clipboard.write([clipboardItem]);
      setIsCopied(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSnackbarClose = () => {
    setIsCopied(false);
  };

  return (
    <>
      <Button onClick={handleClick} startIcon={<ContentCopyRoundedIcon />}>
        Copy shortened URL
      </Button>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        message="Shortened URL copied."
        open={isCopied}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      />
    </>
  );
}
