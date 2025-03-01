import "./globals.css";
import type { Metadata } from "next";
import { Playfair_Display, Raleway } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const playfair = Playfair_Display({ subsets: ["latin"] });
const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "McGill GLOW - Empowering Through Beauty",
  description: "Empowering McGill students through makeup and self-expression",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`h-screen overflow-hidden ${raleway.className}`}>
        {children}
      </body>
    </html>
  );
}
