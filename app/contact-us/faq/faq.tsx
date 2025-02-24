import FAQItem from "./faq-item/faq-item";

const FAQ = () => {
  const faqItems = [
    {
      question: "Do I have to attend all the events?",
      answer:
        "Participation is encouraged, however if is not necessary to attend every event. We always love to see you and hear what you have to say, but if you have other commitments we completely understand. Additionally, if you would like to hear the recommendations of other members but prefer not to speak, feel free to attend and only observe! Do not feel any pressure to join the conversation, do whatever makes you feel comfortable!",
    },
    {
      question: "Can you tell me more about the philanthropic aspect?",
      answer:
        "The McGill Glow team has developed good relationships with make-up and skincare companies from previous projects. These companies have been generous enough to offer us in-kind donations for women's shelters across Ottawa. Additionally, fundraisers will be held throughout the year to provide monetary donations. We will be donating to several different women's shelters rather than focusing on one specific shelter.",
    },
    {
      question: "Can I join the exec team?",
      answer:
        "Thank you so much for your interest! At the moment all positions are full, however feel free to shoot us an email to let us know you're interested. If a spot opens up, we will be sure to contact you!",
    },
    {
      question: "Who can join this club?",
      answer:
        "This club is open to all make-up lovers who attend McGill University; from those who have a newfound interest to experts who would like to share their work and creativity.",
    },
  ];

  return (
    <section className="bg-black/5 relative min-h-[var(--page-size)] flex items-center">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className={`text-7xl text-[#8B2F2F] mb-20 font-playfair`}>
          Frequently Asked Questions
        </h1>
        <div className="grid grid-cols-2 gap-8">
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
