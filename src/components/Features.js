import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Features = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const res = await axios.get('https://hicap-backend-4rat.onrender.com/api/home-features');
        if (res.data.data && res.data.data.length > 0) {
          setFeatures(res.data.data[0].features);
        }
      } catch (error) {
        console.error('Error fetching features:', error);
      }
    };
    fetchFeatures();
  }, []);

  const handleCardHover = (index, isHovering) => {
    setHoveredCard(isHovering ? index : null);
  };

  const handleIconHover = (index, isHovering) => {
    setHoveredIcon(isHovering ? index : null);
  };

  return (
    <Container className="py-5 my-4">
      <Row className="justify-content-center text-center mb-4">
        <Col lg={8}>
          <h4 className="text-secondary mb-3">
            Some great features of <span className="text-success fw-bold">Magnitia</span>
          </h4>
          <p className="text-muted mb-0">
            Advanced training programs on leading IT Technologies offered in multiple formats that offer flexibility in learning
            <br className="d-none d-md-block" />
            <span className="fw-semibold">(Classroom / Live online / Recorded - Weekdays / Weekends)</span>
          </p>
        </Col>
      </Row>

      <Row className="g-4">
        {features.map((feature, index) => (
          <Col key={feature._id} xs={12} sm={6} lg={3}>
            <Card
              className={`h-100 border-0 shadow-sm rounded-4 p-4 ${hoveredCard === index ? 'shadow-lg translate-top' : ''}`}
              style={{
                transition: 'all 0.3s ease',
                transform: hoveredCard === index ? 'translateY(-5px)' : 'none',
              }}
              onMouseEnter={() => handleCardHover(index, true)}
              onMouseLeave={() => handleCardHover(index, false)}
            >
              <Card.Body className="text-center">
                <div
                  className={`d-flex align-items-center justify-content-center mx-auto mb-4 rounded-circle ${hoveredIcon === index ? 'bg-success bg-opacity-10 text-success' : 'bg-success bg-opacity-10 text-success'}`}
                  style={{ width: '70px', height: '70px', transition: 'all 0.3s ease' }}
                  onMouseEnter={() => handleIconHover(index, true)}
                  onMouseLeave={() => handleIconHover(index, false)}
                >
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="img-fluid rounded-circle"
                    style={{
                      width: '40px',
                      height: '40px',
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <Card.Title className="fw-bold mb-3">{feature.title}</Card.Title>
                <Card.Text className="text-muted small">
                  {feature.content}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Features;
