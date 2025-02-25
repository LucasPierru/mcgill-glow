import Link from "next/link";
import { Menu } from "lucide-react";
import { SiFacebook, SiInstagram } from "@icons-pack/react-simple-icons";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

const MobileMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div>
      <button
        type="button"
        className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600 lg:hidden"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen((previousState) => !previousState)}
      >
        <Menu className="h-6 w-6" />
      </button>
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md">
          <div className="flex flex-col items-center space-y-4 py-4 bg-white">
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
              <Button
                variant="default"
                className="bg-[#8B2F2F] hover:bg-[#6F2525] text-white"
              >
                Donate Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
