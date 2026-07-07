import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Space_Grotesk, Syne } from "next/font/google";
import { AppProviders } from "@/components/providers";
import { hasValidClerkConfig } from "@/lib/clerk";
import "./globals.css";

const displayFont = Syne({
  variable: "--font-display",
  subsets: ["latin"],
});

const bodyFont = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI NFT Collection Generator",
  description: "Enterprise-grade AI pipeline for launching production-ready NFT collections.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png",          sizes: "any",   type: "image/png" },
    ],
    apple:   { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    other: [
      { rel: "android-chrome", url: "/android-chrome-192x192.png", sizes: "192x192" },
      { rel: "android-chrome", url: "/android-chrome-512x512.png", sizes: "512x512" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#07111f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authEnabled = hasValidClerkConfig();

  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#030712] text-white">
        {authEnabled ? (
          <ClerkProvider>
            <AppProviders>{children}</AppProviders>
          </ClerkProvider>
        ) : (
          <AppProviders>{children}</AppProviders>
        )}
      </body>
    </html>
  );
}
