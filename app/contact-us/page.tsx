import Image from "next/image";
import ContactForm from "./contact-form/contact-form";
import Link from "next/link";
import { SiFacebook, SiInstagram } from "@icons-pack/react-simple-icons";
import FAQ from "./faq/faq";

const ContactUs = () => {
  return (
    <div className="grid grid-cols-2">
      <div className="relative min-h-[var(--page-size)]">
        <Image
          src="https://images.unsplash.com/photo-1643185450492-6ba77dea00f6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="hero"
          fill
          className="w-full h-full object-cover"
        />
      </div>
      <div className="min-w-full mx-auto flex flex-col gap-8 justify-center items-center">
        <h1 className="text-3xl text-center text-[#8B2F2F] font-playfair">
          Contact Us
        </h1>
        <span className="font-semibold">Become a member!</span>
        <p className="text-center">
          Want to learn more about us? Let&apos;s talk!
        </p>
        <p className="text-center">mcgillglow@gmail.com</p>
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
        <ContactForm />
      </div>
      <div className="col-span-full">
        <FAQ />
      </div>
    </div>
  );
};

export default ContactUs;
