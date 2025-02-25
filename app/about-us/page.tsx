import Image from "next/image";

const AboutUs = () => {
  return (
    <div>
      <section className="relative min-h-[50vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1500840216050-6ffa99d75160?q=80&w=2097&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Beauty Background"
            fill
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 w-full" />
        </div>

        <div className="relative px-4 sm:px-6 lg:px-8 text-center w-full">
          <h1 className="text-3xl text-white mb-6 mx-auto font-playfair">
            How McGill GLOW Was Born
          </h1>
        </div>
      </section>
      <section className="max-w-3xl mx-auto text-center p-8">
        <h2 className="font-playfair mb-4 text-lg">About Us</h2>
        <p>
          McGill Glow is a club that emphasizes using make-up and skincare
          practices as a method to <b>empower McGill university women</b>,
          increasing their <b>self-esteem and confidence</b>. Make-up often
          carries several stigmas and negative connotations in society, so the
          goal of McGill Glow is to help dissolve those and reclaim make-up as a{" "}
          <b>creative tool of self-expression and self-love</b>. McGill Glow is
          founded by an ethnically diverse team whose goal is to also work on{" "}
          <b>breaking society&apos;s “ideal”</b> of what constitutes{" "}
          <b>“beauty”</b> and to be inclusive to individuals of all ethnicities.
          <br />
          <br /> McGill GLOW also has a <b>philanthropic aspect</b> which aims
          to support women&apos;s shelters in Montreal by fundraising and
          through connections with make-up and skincare companies which would
          provide in-kind donations and support. Most women arrive at a shelter
          with nothing more than the clothes on their backs. Therefore, in order
          for women&apos;s shelters in Montreal to support these women, they
          rely on community support and donations. In a time like now where the{" "}
          <b>COVID-19 pandemic</b> has created unprecedented challenges for
          many, shelters have been overwhelmed with women and children seeking
          safety from gender-based violence.{" "}
          <b>This is a critical time to support shelters</b> in providing women
          with resources to feel empowered. <br />
          <br />
          It is now especially important to be reminded of{" "}
          <b>ways we can help fellow women</b> who are struggling to get by,
          without simple necessities such as hygienic products, or enough money
          to feed themselves and their children.<b>Donate today</b> by clicking
          the &quot;Donate Now&quot; button on our website,{" "}
          <b>your community thanks you for your generosity</b>.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
