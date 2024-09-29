import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Providers, ToastProvider } from './providers';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Events List App',
  description: 'Events registration application',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <ToastProvider>
            <main className="flex flex-col items-center min-h-screen h-auto   mx-auto bg-slate-800">
              {children}
              {modal}
            </main>
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
