import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Image Compressor",
  description: "Image Compressor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
