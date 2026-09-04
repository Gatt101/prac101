import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gaurav Patil · Agentic AI Engineer",
  description:
    "Portfolio of Gaurav Patil — Agentic AI Engineer specializing in LLM AI Agents, Multi-Agent Systems, and Enterprise RAG Solutions.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
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
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
      >
        {/* SVG rough filter defs for organic hand-drawn annotations from Opensource UI */}
        <svg className="absolute h-0 w-0 pointer-events-none" aria-hidden="true">
          <defs>
            <filter id="hd-rough" x="-30%" y="-30%" width="160%" height="160%">
              <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed="4" result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <filter id="hd-rough-soft" x="-30%" y="-30%" width="160%" height="160%">
              <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="11" result="n2" />
              <feDisplacementMap in="SourceGraphic" in2="n2" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}
