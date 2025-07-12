// FAQSection.js
import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const faqs = [
  {
    question: 'How can I book a ticket?',
    answer: 'Simply select your category (bus, train, or movie), fill in the required details, and click "Book Now".',
  },
  {
    question: 'Can I sell my unused ticket?',
    answer: 'Yes! Just go to the respective category and click on "Sell Your Ticket".',
  },
  {
    question: 'Is payment secure on your platform?',
    answer: 'Absolutely. We use trusted payment gateways to ensure your transactions are safe and encrypted.',
  },
  {
    question: 'How can I contact support?',
    answer: 'You can reach us through our contact form or customer support email listed in the footer.',
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">Frequently Asked Questions</h2>
      <div className="max-w-4xl mx-auto px-6 space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;
          return (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-md cursor-pointer transition-shadow duration-300 hover:shadow-blue-200 hover:shadow-lg"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-blue-800">{faq.question}</h3>
                <span className="text-blue-700">
                  {isOpen ? <FaMinus /> : <FaPlus />}
                </span>
              </div>
              <div
                className={`mt-2 text-gray-600 overflow-hidden transition-all duration-300 ${
                  isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;
