import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    description: '',
  });

  const [submitStatus, setSubmitStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  // Send POST request to the API endpoint
  try {
    const response = await fetch('https://hicapbackend.onrender.com/api/users/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    
    if (response.ok) {
      // Success message in alert
      alert('Your contact form has been submitted successfully!');
      
      // Reset form data
      setFormData({
        fullName: '',
        email: '',
        mobile: '',
        description: '',
      });
    } else {
      // Error message in alert if the response is not ok
      alert(data.message || 'Something went wrong!');
    }
  } catch (error) {
    console.error('Error:', error);
    // Error alert in case of network or server issues
    alert('Error submitting form.');
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <>
      <Header />

      {/* Heading with green line, left aligned and smaller */}
      <div className="max-w-[600px] mb-20 mt-20 ml-10">
        <h1 className="font-roboto font-bold text-3xl mb-2 text-black">
          Contact Us
        </h1>
        <div
          style={{
            width: '216px',
            height: '8px',
            borderRadius: '20px',
            backgroundColor: '#007860',
          }}
        />
      </div>

      {/* Big rectangle */}
      <section
        style={{
          width: '1440px',
          height: '290px',
          backgroundColor: '#007860',
          margin: '0 auto 40px auto',
          paddingLeft: '40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'Roboto',
          borderRadius: '8px',
          maxWidth: '1440px',
          textAlign: 'left',
        }}
      >
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '8px' }}>
          How can we Help you?
        </h2>

        <p style={{ fontSize: '16px', fontWeight: '400', maxWidth: '600px' }}>
          A member of our team would love to help you with your query.
        </p>
      </section>

      {/* Content below */}
      <section
        style={{ width: '1440px', margin: '0 auto', padding: '0 24px' }}
        className="flex justify-center items-start gap-20"
      >
        <div className="w-full max-w-[657px]">
          <h2 className="font-roboto font-bold text-4xl text-black mb-6">
            Get in Touch with us!
          </h2>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: '#007860',
                }}
                className="flex items-center justify-center text-white"
              >
                <FaPhoneAlt />
              </div>
              <span className="text-black font-roboto font-medium text-lg">
                +91 98765 43210
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: '#007860',
                }}
                className="flex items-center justify-center text-white"
              >
                <FaEnvelope />
              </div>
              <span className="text-black font-roboto font-medium text-lg">
                contact@example.com
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            width: '380px',
            borderRadius: '10px',
            backgroundColor: '#007860',
            padding: '20px',
            height: 'auto',
          }}
          className="text-white"
        >
          <h2
            className="font-roboto font-bold capitalize mb-3"
            style={{
              fontSize: '24px',
              lineHeight: '32px',
              backgroundColor: '#FFFFFF',
              color: '#007860',
              padding: '8px 16px',
              borderRadius: '8px',
              width: 'fit-content',
            }}
          >
            Sign Up for Free Resources
          </h2>

          <form className="space-y-3 mt-3" onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Name"
              className="w-full p-2 rounded-md text-black text-sm"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 rounded-md text-black text-sm"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Phone"
              className="w-full p-2 rounded-md text-black text-sm"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              rows={2}
              className="w-full p-2 rounded-md text-black resize-none text-sm"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="bg-white text-[#007860] font-semibold py-2 px-5 rounded-md hover:opacity-90 text-sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>

          {submitStatus && <p className="mt-4 text-center text-white">{submitStatus}</p>}
        </div>
      </section>

      <div style={{ marginTop: '100px' }}>
        <Footer />
      </div>
    </>
  );
};

export default ContactUs;
