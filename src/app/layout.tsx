import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "David Assef | Full-Stack Developer & AI Engineer",
  description: "AI-driven developer building smart tools with ML, voice cloning & music generation. Clean code, automated tests, and comprehensive documentation.",
  keywords: ["David Assef", "Full-Stack Developer", "AI Engineer", "React", "Next.js", "TypeScript", "Python", "Go", "Machine Learning"],
  authors: [{ name: "David Assef Carneiro" }],
  creator: "David Assef Carneiro",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://davidassef.me",
    title: "David Assef | Full-Stack Developer & AI Engineer",
    description: "AI-driven developer building smart tools with ML, voice cloning & music generation.",
    siteName: "David Assef Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "David Assef | Full-Stack Developer & AI Engineer",
    description: "AI-driven developer building smart tools with ML, voice cloning & music generation.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
