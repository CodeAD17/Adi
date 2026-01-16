import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ADI | Builds Systems, Not Noise",
  description: "Personal portfolio of ADI - Building deliberate, controlled systems with restraint and authority.",
  keywords: ["developer", "portfolio", "systems", "design", "technology"],
  authors: [{ name: "ADI" }],
  openGraph: {
    title: "ADI | Builds Systems, Not Noise",
    description: "Personal portfolio of ADI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
