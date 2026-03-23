
import type { Metadata } from 'next';
import './globals.css';
import { AppShell } from '@/src/components/layout/AppShell';
import { AnnotatorPlugin } from '@/src/components/annotationPlugin';

import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Acadivate',
  description: 'Acadivate Research & Innovation Foundation website',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {


  return (
    <html lang="en">
      
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppShell>{children}</AppShell>
     
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
