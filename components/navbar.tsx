"use client";

import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

export function Navbar() {
  return (
    <nav className="w-full bg-white/80 backdrop-blur-sm z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className={`text-2xl text-gray-800 ${playfair.className}`}
            >
              McGill GLOW
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link
              href="/about-us"
              className="text-gray-600 hover:text-gray-900"
            >
              About Us
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-gray-900">
              Blog
            </Link>
            <Link href="/events" className="text-gray-600 hover:text-gray-900">
              Events
            </Link>
            <Link
              href="/contact-us"
              className="text-gray-600 hover:text-gray-900"
            >
              Contact Us
            </Link>
            <Link href="/join-us" className="text-gray-600 hover:text-gray-900">
              Join Us
            </Link>

            <div className="flex items-center space-x-4">
              <Link
                href="https://instagram.com"
                target="_blank"
                className="text-gray-600 hover:text-gray-900"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                className="text-gray-600 hover:text-gray-900"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Button
                variant="default"
                className="bg-[#8B2F2F] hover:bg-[#6F2525] text-white"
              >
                Donate Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
