import React, { useEffect, useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

const FAQ = () => {
  const [faqData, setFaqData] = useState([]);
  const [faqImage, setFaqImage] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    axios
      .get('https://hicap-backend-1.onrender.com/api/faq')
      .then((res) => {
        const data = res.data.data[0];
        setFaqImage(data.image || '');
        setFaqData(data.faq || []);
      })
      .catch((err) => console.error('FAQ API Error:', err));
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-roboto my-5">

        {/* FAQ Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Frequently Asked Questions
          </h1>
          <div className="w-32 sm:w-48 h-2 rounded-full bg-[#007860] mx-auto" />
        </div>

        {/* FAQ Image Section */}
        {faqImage && (
          <div className="flex justify-center mb-12">
            <img
              src={faqImage}
              alt="FAQ Banner"
              className="w-full max-w-md h-auto rounded-xl shadow-lg border border-gray-200"
            />
          </div>
        )}



        {/* FAQ List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={faq._id}
              className="border-b border-gray-200 pb-4 transition-all duration-200"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center cursor-pointer group">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 group-hover:text-[#007860] transition-colors duration-200">
                  {String(index + 1).padStart(2, '')}. {faq.question}
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

      <Footer />
    </>
  );
};

export default FAQ;
