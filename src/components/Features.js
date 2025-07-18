import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaLaptopCode, FaChalkboardTeacher, FaGraduationCap, FaHeadset } from 'react-icons/fa';

const Features = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const features = [
    {
      icon: <FaLaptopCode className="fs-3" />,
      title: 'Advanced Topics',
      description: 'Training curriculum that is in-sync with Industry expectations',
    },
    {
      icon: <FaChalkboardTeacher className="fs-3" />,
      title: 'High Effective Trainers',
      description: 'Tech experts with years of frontline IT exp & passionate for mentoring',
    },
    {
      icon: <FaGraduationCap className="fs-3" />,
      title: 'Extensive Practice',
      description: 'Key aspect of our training methodology; examples, assignments, project tasks',
    },
    {
      icon: <FaHeadset className="fs-3" />,
      title: 'Anytime Support',
      description: 'Friendly tech support to troubleshoot issues during your practice sessions',
    },
  ];

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
          <Col key={index} xs={12} sm={6} lg={3}>
            <Card 
              className={`h-100 border-0 shadow-sm rounded-4 p-4 ${hoveredCard === index ? 'shadow-lg translate-top' : ''}`}
              style={{ 
                transition: 'all 0.3s ease',
                transform: hoveredCard === index ? 'translateY(-5px)' : 'none'
              }}
              onMouseEnter={() => handleCardHover(index, true)}
              onMouseLeave={() => handleCardHover(index, false)}
            >
              <Card.Body className="text-center">
                <div 
                  className={`d-flex align-items-center justify-content-center mx-auto mb-4 rounded-circle ${hoveredIcon === index ? 'bg-success text-white' : 'bg-success bg-opacity-10 text-success'}`}
                  style={{ width: '70px', height: '70px', transition: 'all 0.3s ease' }}
                  onMouseEnter={() => handleIconHover(index, true)}
                  onMouseLeave={() => handleIconHover(index, false)}
                >
                  {React.cloneElement(feature.icon, {
                    className: `fs-3 ${hoveredIcon === index ? 'text-white' : 'text-success'}`
                  })}
                </div>
                <Card.Title className="fw-bold mb-3">{feature.title}</Card.Title>
                <Card.Text className="text-muted small">{feature.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Features;