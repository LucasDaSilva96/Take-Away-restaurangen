import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/shared/Nav";
import Noise from "@/components/shared/Noise";
import Cartoverlay from "@/components/shared/Cartoverlay";

const Heart = localFont({
  src: "./fonts/Heart.ttf",
  variable: "--font-heart",
  weight: "100 900",
});
const Motter = localFont({
  src: "./fonts/Motter.otf",
  variable: "--font-motter",
  weight: "100 900",
});

const Alumni = localFont({
  src: "./fonts/Alumni.ttf",
  variable: "--font-alumni",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Motter.variable} ${Heart.variable} ${Alumni.variable} antialiased`}
      >
        <Nav />
        <Cartoverlay />
        {children}
        <Noise />
      </body>
    </html>
  );
}
