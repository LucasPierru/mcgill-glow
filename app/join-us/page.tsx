import Image from "next/image";
import JoinForm from "./join-form/join-form";
import WhyJoinUs from "./why-join-us/why-join-us";

const JoinUs = () => {
  return (
    <div className="grid grid-cols-2">
      <div className="relative min-h-[var(--page-size)]">
        <Image
          src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="hero"
          fill
          className="w-full h-full object-cover"
        />
      </div>
      <div className="min-w-full mx-auto flex flex-col gap-8 justify-center items-center">
        <h1 className="text-3xl text-center text-[#8B2F2F] font-playfair">
          Join the club
        </h1>
        <span className="font-semibold">Become a member!</span>
        <p className="text-center max-w-lg">
          We would love for you to join us! This club is open to all make-up
          lovers at McGill University. To become a member, simply fill out this
          short form:
        </p>
        <JoinForm />
      </div>
      <div className="col-span-full">
        <WhyJoinUs />
      </div>
    </div>
  );
};

export default JoinUs;
