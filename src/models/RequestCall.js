import React from "react";
import { Modal, Form, InputGroup, Button } from "react-bootstrap";

const RequestCallModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-meroon text-white">
        <Modal.Title>Request a Call</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="callName">
            <Form.Label>Your Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="callPhone">
            <Form.Label>Phone Number</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <i className="bi bi-telephone-fill"></i>
              </InputGroup.Text>
              <Form.Control type="tel" placeholder="+1 234 567 890" required />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="callTime">
            <Form.Label>Preferred Time</Form.Label>
            <Form.Control type="text" placeholder="e.g. 10 AM - 12 PM" />
          </Form.Group>

          <div className="d-grid">
            <Button className="bg-meroon border-0" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RequestCallModal;