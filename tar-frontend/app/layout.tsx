import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Nav from '@/components/shared/Nav';
import Noise from '@/components/shared/Noise';
import Cartoverlay from '@/components/shared/Cartoverlay';
import { Toaster } from 'react-hot-toast';

const Heart = localFont({
  src: './fonts/Heart.ttf',
  variable: '--font-heart',
  weight: '100 900',
});
const Motter = localFont({
  src: './fonts/Motter.otf',
  variable: '--font-motter',
  weight: '100 900',
});

const Alumni = localFont({
  src: './fonts/Alumni.ttf',
  variable: '--font-alumni',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Pizza De Luxe',
  description: 'Pizza De Luxe, the best pizza in town',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${Motter.variable} ${Heart.variable} ${Alumni.variable} bg-main-light antialiased overflow-x-hidden no-scrollbar`}
      >
        <Nav />
        <Cartoverlay />
        {children}
        <Noise />
        <Toaster
          position='top-center'
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 3000,
            style: {
              background: '#EBA13D',
              color: '#fff',
            },

            success: {
              duration: 3000,
              style: {
                background: '#003B2D',
                color: '#fff',
              },
            },

            error: {
              duration: 3000,
              style: {
                background: '#B42638',
                color: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
