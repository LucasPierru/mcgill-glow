import "./globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display, Raleway } from "next/font/google";
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
        <Navbar />
        <div className="overflow-y-auto max-h-[var(--page-size)] h-full scrollbar scrollbar-smooth pb-16 lg:pb-0">
          <main className="max-w-7-xl mx-auto">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
