import Image from "next/image";

const WhyJoinUs = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1512207724313-a4e675ec79ab?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Beauty Background"
          fill
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/70" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className={`text-4xl text-[#8B2F2F] mb-6 font-playfair`}>
          Why Join Us?
        </h1>
        <p className={`text-base text-black/90 max-w-4xl mb-8`}>
          Join McGill University to be part of a supportive and encouraging
          environment that is inclusive to all and works to empower women by
          breaking social stigmas. Through McGill University you will meet
          individuals who share a common interest in make-up and skincare. Share
          recommendations of favourite products and more!
          <br />
          <br />
          Learn more about self-care and self-expression through make-up and
          work towards boosting your self-esteem with others. Have fun and
          expand your creativity through countless events, while supporting
          workmen&apos;s shelters in Montreal. Lastly, find comfort in
          empowering others around you and uplifting fellow women!
        </p>
      </div>
    </section>
  );
};

export default WhyJoinUs;
