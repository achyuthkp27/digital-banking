import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Syne } from "next/font/google";
import CustomCursor from "@/components/common/CustomCursor";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

export const metadata: Metadata = {
  title: "DB | Digital Banking Platform",
  description:
    "Enterprise-grade digital banking solutions with cutting-edge security, seamless integration, and unparalleled user experience across all platforms.",
  keywords: [
    "digital banking",
    "fintech",
    "banking platform",
    "mobile banking",
    "corporate banking",
    "payment solutions",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${syne.variable}`}>
      <body className={GeistSans.className}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
