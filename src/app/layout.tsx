import type { Metadata } from "next";
import "@/styles/globals.css";
import localFont from 'next/font/local'
import Header from "@/components/Header";

// NanumSquare 폰트 설정
export const nanumSquare = localFont({
  src: [
    {
      path: "../fonts/NanumSquareR.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/NanumSquareB.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/NanumSquareEB.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-nanumSquare", 
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
    <html lang="ko" className={`${nanumSquare.variable}`}>
      <head>
      <link rel="icon" href="/images/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${nanumSquare.className} mx-auto overflow-hidden bg-gray-50`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
