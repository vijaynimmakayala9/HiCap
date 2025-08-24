import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const FlashContact = () => {
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Our counselor will contact you soon on: ${phone}`);
  };

  return (
    <section className="flash-contact-section py-5">
      <div className="container text-center text-white">
        <h2 className="fw-bold mb-2">📞 Call a Counselor</h2>
        <p className="mb-4">
          Leave your number and our counselor will reach out to guide you shortly.
        </p>
        <Form
          onSubmit={handleSubmit}
          className="d-flex flex-column flex-sm-row justify-content-center gap-3"
        >
          <InputGroup className="shadow-sm">
            <InputGroup.Text className="bg-white text-meroon">
              <i className="bi bi-telephone-fill"></i>
            </InputGroup.Text>
            <Form.Control
              type="tel"
              placeholder="+1 234 567 890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </InputGroup>
          <Button type="submit" className="gradient-button px-4 fw-semibold">
            Request Call
          </Button>
        </Form>
      </div>

      <style jsx>{`
        .flash-contact-section {
          background-color: #ad2132;
          color: white;
        }
        .text-meroon {
          color: #ad2132 !important;
        }
        .gradient-button {
          background: linear-gradient(90deg, #ad2132, #c34153);
          color: white;
          border: none;
        }
        .gradient-button:hover {
          opacity: 0.9;
        }
      `}</style>
    </section>
  );
};

export default FlashContact;
