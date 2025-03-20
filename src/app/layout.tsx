import type { Metadata } from 'next';
import '@/styles/app.css';
import MuiThemeProvider from '@/components/MuiThemeProvider';

export const metadata: Metadata = {
  title: 'ShortURL',
  description: 'Shorten any URL so it is easier to share.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MuiThemeProvider>{children}</MuiThemeProvider>
      </body>
    </html>
  );
}
