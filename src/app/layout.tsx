import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const bebasNeue = Bebas_Neue({ weight: "400", variable: "--font-display", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mrtorino.io"),
  title: {
    default: "mrtorino.io — Software Studio",
    template: "%s | mrtorino.io",
  },
  alternates: { canonical: "https://www.mrtorino.io" },
  description:
    "A software studio building trading tools, AI automation systems, and education platforms. Products include TradeSchool AI, WeatherDashboard, ClaudeOmatic, and more.",
  keywords: [
    "trading software", "AI automation", "day trading education", "Kalshi trading",
    "BTC prediction", "weather markets", "TradeSchool AI", "ClaudeOmatic",
    "WeatherDashboard", "trading simulator", "prediction markets", "mrtorino",
  ],
  authors: [{ name: "mrtorino" }],
  creator: "mrtorino",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.mrtorino.io",
    siteName: "mrtorino.io",
    title: "mrtorino.io — Software Studio",
    description:
      "Trading tools, AI automation, and education platforms built with real systems behind them.",
  },
  twitter: {
    card: "summary_large_image",
    title: "mrtorino.io — Software Studio",
    description: "Trading tools, AI automation, and education platforms.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
