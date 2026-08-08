import type { Metadata } from "next";
import { Orbitron, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ScanlineOverlay } from "@/components/ui/ScanlineOverlay";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FluidBackground } from "@/components/ui/FluidBackground";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["700", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Cyberpunk Portfolio | System Online",
  description: "A cyberpunk themed autonomous portfolio built with Next.js and GitHub API.",
  openGraph: {
    title: "Cyberpunk Portfolio | System Online",
    description: "A cyberpunk themed autonomous portfolio built with Next.js and GitHub API.",
    type: "website",
    url: "https://example.com",
    images: [{ url: "/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${orbitron.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} antialiased font-space-grotesk relative`}
      >
        <FluidBackground />
        <ScanlineOverlay />
        <Navbar />
        <main className="relative z-10 flex flex-col min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
