import { poppins } from "@/fonts";
import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/providers";

export const metadata: Metadata = {
  title: "AnimeVerse",
  description: "Watch anime here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}  antialiased `}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}