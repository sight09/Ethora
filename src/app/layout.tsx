import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { EthoraProvider } from "@/context/EthoraContext";
import AppLayoutClient from "@/components/layout/AppLayoutClient";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ETHORA — Ethiopia's Premier Gaming & Esports Network",
  description:
    "Where Gamers Become Legends. Discover verified tournaments, rise through Ethiopian regional rankings, build competitive teams, and connect with premier esports organizations.",
  keywords: [
    "ETHORA",
    "Ethiopia Esports",
    "Ethiopian Gamers",
    "Valorant Ethiopia",
    "EA FC 24 Ethiopia",
    "CS2 Ethiopia",
    "Addis Ababa Gaming",
    "Esports Tournament Platform",
  ],
  icons: {
    icon: "/images/ethora-logo.jpg",
    apple: "/images/ethora-logo.jpg",
  },
};

export const viewport: Viewport = {
  themeColor: "#08090E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#08090E] text-slate-100 selection:bg-violet-600 selection:text-white`}
      >
        <EthoraProvider>
          <AppLayoutClient>{children}</AppLayoutClient>
        </EthoraProvider>
      </body>
    </html>
  );
}
