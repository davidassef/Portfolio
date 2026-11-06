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
  title: "David Assef | AI Engineer & Full-Stack Developer",
  description: "AI Engineer building AI products end to end: LLM agents in production, MCP tooling, automations and full-stack platforms.",
  keywords: ["David Assef", "AI Engineer", "AI Builder", "LLM", "AI Agents", "MCP", "Full-Stack Developer", "React", "Next.js", "TypeScript", "Python", "Go", "Machine Learning"],
  authors: [{ name: "David Assef Carneiro" }],
  creator: "David Assef Carneiro",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://davidassef.me",
    title: "David Assef | AI Engineer & Full-Stack Developer",
    description: "AI Engineer building AI products end to end: LLM agents, automations and full-stack platforms.",
    siteName: "David Assef Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "David Assef | AI Engineer & Full-Stack Developer",
    description: "AI Engineer building AI products end to end: LLM agents, automations and full-stack platforms.",
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
