import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "McGill GLOW - Empowering Through Beauty",
  description: "Empowering McGill students through makeup and self-expression",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="relative top-16 overflow-y-auto h-[var(--page-size)] scrollbar scrollbar-smooth">
        <main className="max-w-7-xl mx-auto">{children}</main>
        <Footer />
      </div>
    </>
  );
}
