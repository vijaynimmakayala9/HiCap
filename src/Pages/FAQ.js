import React, { useState } from 'react';
import { FaPlus, FaMinus, FaQuestionCircle } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';

const faqData = [
  {
    question: "Does my client need to use Wise too?",
    answer: "No, your client doesn’t need to use Wise. You can send them a payment request directly.",
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

      <div
        style={{
          maxWidth: '1200px',
          margin: '60px auto', // Margin to space out from the top
          padding: '0 20px',
          display: 'flex',
          gap: '60px',
          fontFamily: 'Roboto',
        }}
      >
        {/* Left Side - FAQ List */}
        <div style={{ flex: 2 }}>
          <div className="max-w-[600px] mb-10 mt-18"> {/* Added mt-18 for spacing */}
            <h1 className="font-roboto font-bold text-3xl mb-2 text-black mt-10">Frequently Asked Questions</h1>
            <div
              style={{
                width: '216px',
                height: '8px',
                borderRadius: '20px',
                backgroundColor: '#007860',
              }}
            />
          </div>

          {faqData.map((faq, index) => (
            <div
              key={index}
              style={{
                borderBottom: '1px solid #ddd',
                padding: '20px 0',
                cursor: 'pointer',
              }}
              onClick={() => toggleFAQ(index)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '18px', fontWeight: '600', color: '#333' }}>
                  {String(index + 1).padStart(2, '0')}. {faq.question}
                </span>
                <span style={{ color: '#007860' }}>
                  {openIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
              </div>
              {openIndex === index && (
                <p style={{ marginTop: '10px', fontSize: '16px', color: '#555', lineHeight: '1.6' }}>
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Right Side - Big Circular Icon */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '30px' }}>
          <div
            style={{
              width: '220px',
              height: '220px',
              borderRadius: '50%',
              backgroundColor: '#00786020',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FaQuestionCircle size={100} color="#007860" />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default FAQ;
