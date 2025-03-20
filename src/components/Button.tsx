'use client';
import React from 'react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import Link from 'next/link';

interface ButtonProps extends MuiButtonProps {
  children: React.ReactNode;
}

export default function Button({ children, sx, ...restProps }: ButtonProps) {
  return (
    <MuiButton
      LinkComponent={Link}
      color="primary"
      sx={{ textTransform: 'none', ...sx }}
      variant="contained"
      {...restProps}
    >
      {children}
    </MuiButton>
  );
}
