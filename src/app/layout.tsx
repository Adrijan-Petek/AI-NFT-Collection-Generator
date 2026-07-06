import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Space_Grotesk, Syne } from "next/font/google";
import { AppProviders } from "@/components/providers";
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
  description: "AI NFT Collection Generator SaaS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#030712] text-white">
        <ClerkProvider>
          <AppProviders>{children}</AppProviders>
        </ClerkProvider>
      </body>
    </html>
  );
}
