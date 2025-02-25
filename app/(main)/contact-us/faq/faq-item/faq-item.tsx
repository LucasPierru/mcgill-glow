type FAQItemProps = {
  question: string;
  answer: string;
};

const FAQItem = ({ question, answer }: FAQItemProps) => {
  return (
    <div className="flex flex-col justify-between">
      <h2 className="text-xl text-left text-gray-900 font-playfair mb-4">
        {question}
      </h2>
      <p className="text-base text-left text-gray-900">{answer}</p>
    </div>
  );
};

export default FAQItem;
