import React, { useEffect, useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import Header from '../Header/Header';
import Footer from './Footer';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const FAQ = () => {
  const [faqData, setFaqData] = useState([]);
  const [faqImage, setFaqImage] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    axios
      .get('https://hicap-backend-4rat.onrender.com/api/faq')
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

      <Container className="py-5 mt-5" style={{ maxWidth: '1140px', fontFamily: 'Roboto, sans-serif' }}>
        
        {/* FAQ Title */}
        <Row className="text-center mb-5">
          <Col>
            <div className="d-inline-block position-relative mb-3">
              <h2 className="fw-bold text-dark mb-1">
                Frequently Asked <span style={{ color: "#ad2132" }}>Questions</span>
              </h2>
              {/* <div
                style={{
                  width: "100px",
                  height: "5px",
                  backgroundColor: "#ad2132",
                  borderRadius: "999px",
                  position: "absolute",
                  left: "10%",
                  transform: "translateX(-50%)",
                  bottom: "-6px",
                }}
              ></div> */}
            </div>
          </Col>
        </Row>

        {/* FAQ Image Section */}
        {faqImage && (
          <Row className="justify-content-center mb-5">
            <Col xs={12} md={8} lg={6}>
              <Image 
                src="/service/faqs.jpg"
                alt="FAQ Banner"
                fluid
                rounded
                className=" border border-light"
              />
            </Col>
          </Row>
        )}

        {/* FAQ List */}
        <Row className="justify-content-center">
          <Col xs={12} lg={10}>
            <div className="accordion">
              {faqData.map((faq, index) => (
                <div 
                  key={faq._id} 
                  className="border-bottom border-light pb-3 mb-3"
                >
                  <div 
                    className="d-flex justify-content-between align-items-center cursor-pointer"
                    onClick={() => toggleFAQ(index)}
                    style={{ cursor: 'pointer' }}
                  >
                    <h3 className="h5 fw-semibold text-dark mb-0">
                      {String(index + 1).padStart(2, '0')}. {faq.question}
                    </h3>
                    <span className="textcolor ms-3">
                      {openIndex === index ? (
                        <FaMinus />
                      ) : (
                        <FaPlus />
                      )}
                    </span>
                  </div>
                  {openIndex === index && (
                    <p className="mt-3 text-muted">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default FAQ;