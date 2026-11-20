import type { Metadata, Viewport } from "next";
import "./globals.css";
import { EthoraProvider } from "@/context/EthoraContext";
import AppLayoutClient from "@/components/layout/AppLayoutClient";

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
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/images/ethora-logo.jpg", type: "image/jpeg" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A12",
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
        className="antialiased min-h-screen bg-[#0A0A12] text-[#B8B3CC] selection:bg-[#A855F7] selection:text-white font-sans"
      >
        <EthoraProvider>
          <AppLayoutClient>{children}</AppLayoutClient>
        </EthoraProvider>
      </body>
    </html>
  );
}
