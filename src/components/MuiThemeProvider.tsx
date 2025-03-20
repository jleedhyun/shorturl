'use client';
import { useEffect, useState } from 'react';
import { Theme, ThemeProvider, createTheme } from '@mui/material';

interface MuiThemeProviderProps {
  children: React.ReactNode;
}

export default function MuiThemeProvider({ children }: MuiThemeProviderProps) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const cssVar = (name: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(name);

    const theme = createTheme({
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              '&.MuiButton-outlined': {
                borderColor: `${cssVar('--primary')}80`,
                color: 'var(--primary)',
                '&:hover': {
                  borderColor: 'var(--primary)',
                },
              },
            },
          },
        },
        MuiLink: {
          styleOverrides: {
            root: {
              color: 'var(--primary)',
              textDecorationColor: `${cssVar('--primary')}80`,
              '&:hover': {
                textDecorationColor: 'var(--primary)',
              },
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              '&:hover:not(.Mui-focused):not(.Mui-error) .MuiOutlinedInput-notchedOutline':
                {
                  borderColor: 'var(--on-surface)',
                },
              '&.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline':
                {
                  borderColor: 'var(--primary)',
                },
            },
            notchedOutline: {
              borderColor: 'var(--outline)',
            },
            input: {
              color: 'var(--on-surface)',
            },
          },
        },
        MuiInputLabel: {
          styleOverrides: {
            root: {
              '&.Mui-focused:not(.Mui-error)': {
                color: 'var(--primary)',
              },
            },
          },
        },
      },
      palette: {
        action: {
          disabledBackground: `${cssVar('--on-surface')}1F`,
          disabled: `${cssVar('--on-surface')}61`,
        },
        primary: {
          main: cssVar('--primary-container'),
          contrastText: cssVar('--on-primary-container'),
        },
        secondary: {
          main: cssVar('--secondary-container'),
          contrastText: cssVar('--on-secondary-container'),
        },
        error: {
          main: cssVar('--error'),
        },
      },
      typography: {
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ].join(','),
        allVariants: {
          color: cssVar('--on-surface'),
        },
        subtitle1: {
          color: cssVar('--on-surface-variant'),
        },
        subtitle2: {
          color: cssVar('--on-surface-variant'),
        },
      },
    });
    setTheme(theme);
  }, []);

  if (!theme) return null;

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
