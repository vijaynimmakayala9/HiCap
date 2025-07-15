import React, { useState } from 'react';
import { FaPlus, FaMinus, FaQuestionCircle } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';

const faqData = [
  {
    question: "Does my client need to use Wise too?",
    answer: "No, your client doesn't need to use Wise. You can send them a payment request directly.",
  },
  {
    question: "Which company types are eligible?",
    answer: "Eligible companies include registered businesses complying with local regulations.",
  },
  {
    question: "Is there a limit to how much I can request for each payment?",
    answer: "Yes, limits depend on your account type and regulatory restrictions.",
  },
  {
    question: "Do I need to raise a request every time?",
    answer: "Yes, each payment requires a separate request for security reasons.",
  },
  {
    question: "Will my account details change every time I set up a new request?",
    answer: "No, your account details remain the same unless you update them manually.",
  },
  {
    question: "Is there a limit to how much I can request for each payment? (Repeated)",
    answer: "Refer to question 3 for payment limits.",
  },
  {
    question: "Do I need to raise a request every time? (Repeated)",
    answer: "Refer to question 4 about raising requests.",
  },
  {
    question: "Will my account details change every time I set up a new request? (Repeated)",
    answer: "Refer to question 5 for account detail info.",
  },
  {
    question: "Do I need to raise a request every time? (Repeated again)",
    answer: "Same as question 4.",
  },
  {
    question: "Will my account details change every time I set up a new request? (Repeated again)",
    answer: "Same as question 5.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Header />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 my-5 md:py-16 flex flex-col lg:flex-row gap-8 lg:gap-16 font-roboto">
        {/* Left Side - FAQ List */}
        <div className="w-full lg:w-2/3">
          <div className="mb-8 md:mb-12">
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-2">
              Frequently Asked Questions
            </h1>
            <div className="w-32 sm:w-48 h-2 rounded-full bg-[#007860]" />
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-200 pb-4 transition-all duration-200"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center cursor-pointer group">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 group-hover:text-[#007860] transition-colors duration-200">
                    {String(index + 1).padStart(2, '0')}. {faq.question}
                  </h3>
                  <span className="text-[#007860] ml-4">
                    {openIndex === index ? (
                      <FaMinus className="text-sm sm:text-base" />
                    ) : (
                      <FaPlus className="text-sm sm:text-base" />
                    )}
                  </span>
                </div>
                {openIndex === index && (
                  <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Big Circular Icon */}
        <div className="w-full lg:w-1/3 flex justify-center lg:justify-end items-start pt-8 lg:pt-16">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full bg-[#00786020] flex items-center justify-center">
            <FaQuestionCircle 
              className="text-[#007860] w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28" 
            />
            <div className="absolute inset-0 rounded-full border-8 border-[#00786010] animate-ping-slow opacity-30"></div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default FAQ;