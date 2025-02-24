import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import ImageCard from "@/components/image-card/image-card";

const playfair = Playfair_Display({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[var(--page-size)] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
            alt="Beauty Background"
            fill
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className={`text-7xl text-white mb-6 ${playfair.className}`}>
            McGill GLOW
          </h1>
          <p className={`text-2xl text-white mb-8 ${playfair.className}`}>
            Empowering students through makeup
          </p>
          <Button
            asChild
            className="bg-[#8B2F2F] hover:bg-[#6F2525] text-white text-lg px-8 py-6"
          >
            <Link href="/join">Join Now</Link>
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-4xl text-gray-900 mb-8 ${playfair.className}`}>
            Here&apos;s a little bit about us
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            McGill GLOW is a club that emphasizes using make-up and skincare
            practices as a method to empower McGill students, increasing their
            self-esteem and confidence. McGill GLOW also aims to support
            women&apos;s shelters in Montreal and promote inclusivity in the
            beauty community.
          </p>
          <Button
            asChild
            className="mt-8 bg-[#8B2F2F] hover:bg-[#6F2525] text-white"
          >
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ImageCard
              src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Makeup Look 1"
            />
            <ImageCard
              src="https://images.unsplash.com/photo-1503236823255-94609f598e71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Makeup Look 2"
            />
            <ImageCard
              src="https://images.unsplash.com/photo-1526045478516-99145907023c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Makeup Look 3"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
