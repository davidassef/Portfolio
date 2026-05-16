import type { Metadata } from "next";
import { JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    <html lang="pt-BR" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
