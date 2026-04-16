import type { Metadata } from "next";
import "./globals.css";
import Cursor from "@/components/Cursor";

export const metadata: Metadata = {
  title: "Wishbox Intelligence",
  description: "Strategic intelligence for those who cannot afford to be wrong.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Cursor />
        {children}
      </body>
    </html>
  );
}
