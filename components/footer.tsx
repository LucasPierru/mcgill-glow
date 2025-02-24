import Link from "next/link";
import { SiFacebook, SiInstagram } from "@icons-pack/react-simple-icons";

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-6">
          <Link
            href="https://instagram.com"
            target="_blank"
            className="text-gray-400 hover:text-gray-500"
          >
            <SiInstagram />
          </Link>
          <Link
            href="https://facebook.com"
            target="_blank"
            className="text-gray-400 hover:text-gray-500"
          >
            <SiFacebook />
          </Link>
        </div>
        <div className="mt-8 text-center text-gray-400">
          <p>©2025 by McGill GLOW</p>
        </div>
      </div>
    </footer>
  );
}
