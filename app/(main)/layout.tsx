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
      <div className="overflow-y-auto max-h-[var(--page-size)] h-full scrollbar scrollbar-smooth pb-0 lg:pb-0">
        <main className="max-w-7-xl mx-auto">{children}</main>
        <Footer />
      </div>
    </>
  );
}
