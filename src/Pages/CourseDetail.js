import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FaRegClock,
  FaUserGraduate,
  FaBook,
  FaCheck,
  FaChartLine,
  FaCertificate,
  FaChalkboardTeacher,
  FaChevronDown,
  FaChevronUp,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaBookOpen
} from 'react-icons/fa';
import Footer from './Footer';
import Header from './Header';
import { Container, Row, Col, Card, Button, Badge, Accordion } from 'react-bootstrap';

const Counter = ({ end, duration = 1000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = end / 50;
    const stepTime = Math.abs(Math.floor(duration / 50));
    const timer = setInterval(() => {
      start += increment;
      setCount(Math.ceil(start));
      if (start >= end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [end, duration]);
  return <span>{count}{suffix}</span>;
};

const StarRating = ({ rating, reviewCount }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="text-warning" />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-warning" />);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="text-warning" />);
  }

  return (
    <div className="d-flex align-items-center gap-1">
      {stars}
      <span className="ms-2 small text-muted">({reviewCount} reviews)</span>
    </div>
  );
};

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openFAQIndex, setOpenFAQIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://hicap-backend-4rat.onrender.com/api/course1');
        const coursesData = await response.json();

        if (coursesData.success) {
          setAllCourses(coursesData.data);
          const selectedCourse = coursesData.data.find(c => c._id === id);
          if (selectedCourse) {
            const enhancedCourse = {
              ...selectedCourse,
              image: selectedCourse.image || "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80",
              students: selectedCourse.noOfStudents,
              features: selectedCourse.features?.map((feature, i) => ({
                ...feature,
                title: feature.title || [
                  "Industry-recognized certification",
                  "Hands-on projects",
                  "Lifetime access to course materials",
                  "Expert instructor support",
                  "Career guidance sessions"
                ][i],
                image: feature.image || [
                  "https://cdn-icons-png.flaticon.com/512/3176/3176272.png",
                  "https://cdn-icons-png.flaticon.com/512/2933/2933245.png",
                  "https://cdn-icons-png.flaticon.com/512/3652/3652191.png",
                  "https://cdn-icons-png.flaticon.com/512/1995/1995515.png",
                  "https://cdn-icons-png.flaticon.com/512/3281/3281289.png"
                ][i]
              })) || []
            };
            setCourse(enhancedCourse);
          } else {
            throw new Error('Course not found');
          }
        } else {
          throw new Error('Failed to load courses');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);


  const toggleFAQ = (index) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  if (loading) return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading course details...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className="text-center py-5 text-danger">
        <p>Error: {error}</p>
        <Button
          variant="primary"
          onClick={() => window.location.reload()}
          className="mt-3"
        >
          Try Again
        </Button>
      </div>
    </div>
  );

  if (!course) return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className="text-center py-5">
        <p>Course not found</p>
        <Button
          variant="primary"
          onClick={() => navigate('/')}
          className="mt-3"
        >
          Browse Courses
        </Button>
      </div>
    </div>
  );

  const relatedCourses = allCourses.filter(c => c._id !== id).slice(0, 3);

  return (
    <>
      <Header />
      <div className="min-vh-100 d-flex flex-column bg-light mt-5">
        <main className="flex-grow my-2">
          {/* Hero Banner */}
          <Container className="py-5">
            <Row className="align-items-center g-4">
              {/* Image */}
              <Col lg={6} className="order-1 order-lg-1">
                <div className="position-relative">
                  <Card.Img
                    variant="top"
                    src={course.image}
                    alt={course.name}
                    className="rounded-3 border-3 border-white img-fluid"
                  />
                  <Badge bg="white" text="primary" className="position-absolute bottom-0 start-0 m-3 shadow-sm fw-bold">
                    New Batch Starting Soon!
                  </Badge>
                </div>
              </Col>
              {/* Text Content */}
              <Col lg={6} className="order-2 order-lg-2">
                <div className="p-3 p-md-4">
                  <Badge className="mb-2 text-uppercase" style={{ backgroundColor: "#0077B5", color: "#fff" }}>
                    {course.category} Training
                  </Badge>
                  <h1 className="display-5 fw-bold mb-3" style={{ color: "#064C89" }}>
                    {course.name}
                  </h1>
                  <p className="lead text-muted mb-4">
                    {course.description}
                  </p>

                  <div className="mb-3">
                    <StarRating rating={course.rating} reviewCount={course.reviewCount} />
                  </div>

                  <div className="d-flex flex-wrap gap-2 mb-4">
                    <Badge className="d-flex align-items-center gap-1" style={{ backgroundColor: "#0077B5", color: "#fff" }}>
                      <FaRegClock className="fs-6" /> {course.duration}
                    </Badge>
                    <Badge className="d-flex align-items-center gap-1" style={{ backgroundColor: "#0077B5", color: "#fff" }}>
                      <FaUserGraduate className="fs-6" /> {course.noOfStudents}+ Students
                    </Badge>
                    <Badge className="d-flex align-items-center gap-1" style={{ backgroundColor: "#0077B5", color: "#fff" }}>
                      <FaBook className="fs-6" /> {course.noOfLessons} Lessons
                    </Badge>
                  </div>

                  <div className="mb-4">
                    <p className="mb-1 small text-muted">
                      <span className="fw-semibold">Subcategory:</span> {course.subcategory}
                    </p>
                    <p className="mb-0 small text-muted">
                      <span className="fw-semibold">Mode:</span> {course.mode}
                    </p>
                  </div>

                  <div className="d-flex flex-column flex-sm-row gap-3">
                    <Button size="lg" className="shadow gradient-button">
                      Enroll Now - ${course.price}
                    </Button>
                    <Button variant="outline-primary" size="lg" className="shadow">
                      Download Syllabus
                    </Button>
                  </div>
                </div>
              </Col>


            </Row>
          </Container>

          {/* Stats Cards */}
          <Container className="py-4">
            <Row className="g-3">
              <Col sm={4}>
                <Card className="border-0 shadow-sm text-center py-3 bg-info bg-opacity-10">
                  <FaUserGraduate className="text-primary fs-3 mb-2 mx-auto" />
                  <h3 style={{ color: "#064C89" }}>
                    <Counter end={course.noOfStudents} suffix="+" />
                  </h3>
                  <p className="small text-primary mb-0 fw-bold">Students Enrolled</p>
                </Card>
              </Col>
              <Col sm={4}>
                <Card className="border-0 shadow-sm text-center py-3 bg-info bg-opacity-10">
                  <FaBookOpen className="text-primary fs-3 mb-2 mx-auto" />
                  <h3 style={{ color: "#064C89" }}>
                    <Counter end={course.noOfLessons} />
                  </h3>
                  <p className="small text-primary mb-0 fw-bold">Lessons</p>
                </Card>
              </Col>
              <Col sm={4}>
                <Card className="border-0 shadow-sm text-center py-3 bg-info bg-opacity-10">
                  <FaStar className="text-warning fs-3 mb-2 mx-auto" />
                  <h3 style={{ color: "#064C89" }}>
                    {course.rating}/5
                  </h3>
                  <p className="small text-primary mb-0 fw-bold">Reviews</p>
                </Card>
              </Col>
            </Row>
          </Container>

          {/* Features and Training Options */}
          <Container className="py-4">
            <Row className="g-4">
              {/* What You'll Get */}
              <Col lg={6}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body>
                    <Card.Title
                      className="d-flex align-items-center mb-3 pb-1 border-bottom"
                      style={{ fontWeight: '600', fontSize: '1.25rem', color: "#064C89" }}
                    >
                      <FaCertificate className="me-2" size={20} />
                      What You'll Get
                    </Card.Title>
                    <Row className="g-2">
                      {course.features.map((feature, index) => (
                        <Col xs={12} sm={6} key={index}>
                          <Card className="border-0 shadow-sm h-100">
                            <Card.Body className="d-flex align-items-center gap-3 p-2">
                              <img
                                src={feature.image}
                                alt={feature.title}
                                className="img-fluid rounded-circle"
                                style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                              />
                              <p className="mb-0 small flex-grow-1">{feature.title}</p>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>

              {/* Training Options */}
              <Col lg={6}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body>
                    <Card.Title
                      className="d-flex align-items-center mb-3 pb-1 border-bottom"
                      style={{ fontWeight: '600', fontSize: '1.25rem', color: "#064C89" }}
                    >
                      <FaChalkboardTeacher className="me-2" size={20} />
                      Training Options
                    </Card.Title>

                    <div className="mb-3">
                      <p className="small fw-semibold mb-1">Mode:</p>
                      <Badge bg="info" className="text-capitalize">
                        {course.mode}
                      </Badge>
                    </div>

                    <div className="mb-3">
                      <p className="small fw-semibold mb-1">Status:</p>
                      <Badge bg={course.status === 'available' ? 'success' : 'warning'}>
                        {course.status === 'available' ? 'Available Now' : 'Coming Soon'}
                      </Badge>
                    </div>

                    <div className="mb-3">
                      <p className="small fw-semibold mb-1">Price:</p>
                      <h4 style={{ color: "#064C89" }}>₹{course.price}</h4>
                    </div>

                    <div className="d-flex flex-wrap gap-1">
                      {course.isPopular && (
                        <Badge bg="warning" text="dark">Popular Course</Badge>
                      )}
                      {course.isHighRated && (
                        <Badge bg="primary">Top Rated</Badge>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>


          {/* Learning Objectives */}
          <Container className="py-4">
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <Card.Title className="border-bottom pb-2" style={{color: "#064C89"}}>
                  Learning Objectives
                </Card.Title>
                <Row className="g-3">
                  {course.courseObject?.map((item, index) => (
                    <Col xs={12} sm={6} lg={4} key={index}>
                      <Card className="border-0 h-100 bg-info bg-opacity-10" >
                        <Card.Body>
                          <Card.Title className="fs-6" style={{color: "#064C89"}}>
                            {item.title || `Objective ${index + 1}`}
                          </Card.Title>
                          <Card.Text className="small text-muted">
                            {item.content}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Container>

          {/* FAQs */}
          {course.faq && course.faq.length > 0 && (
            <Container className="py-4">
              <Card className="border-0">
                <Card.Body className="bg-info bg-opacity-10" >
                  <Card.Title style={{color: "#064C89"}}>
                    Frequently Asked Questions
                  </Card.Title>
                  <Accordion defaultActiveKey="0">
                    {course.faq.map((item, index) => (
                      <Accordion.Item eventKey={index.toString()} key={index}>
                        <Accordion.Header style={{color: "#064C89"}}>{item.question}</Accordion.Header>
                        <Accordion.Body style={{color: "#064C89"}}>
                          {item.answer}
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </Card.Body>
              </Card>
            </Container>
          )}

          {/* Who Can Learn */}
          <Container className="py-4">
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <Card.Title className="text-primary border-bottom pb-2">
                  Who Can Learn
                </Card.Title>
                <Row className="g-3">
                  {[
                    {
                      image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                      title: "Students & Freshers",
                      description: "Ideal for those starting their career and seeking strong foundational skills."
                    },
                    {
                      image: "https://cdn-icons-png.flaticon.com/512/1053/1053244.png",
                      title: "Working Professionals",
                      description: "Upgrade your skills or pivot your career into high-demand roles."
                    },
                    {
                      image: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
                      title: "Freelancers",
                      description: "Enhance your service offering and land better-paying projects."
                    },
                    {
                      image: "https://cdn-icons-png.flaticon.com/512/706/706830.png",
                      title: "Entrepreneurs",
                      description: "Gain practical knowledge to grow and manage your own business more effectively."
                    }
                  ].map((learner, index) => (
                    <Col xs={12} sm={6} key={index}>
                      <Card className="border-0 shadow-sm h-100">
                        <Card.Body className="d-flex gap-3">
                          <img
                            src={learner.image}
                            alt={learner.title}
                            className="rounded-circle border border-2 border-info"
                            style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                          />
                          <div>
                            <h5 className="text-primary">{learner.title}</h5>
                            <p className="small text-muted mb-0">{learner.description}</p>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Container>

          {/* Course Information */}
          <Container className="py-4">
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <Card.Title className="text-primary border-bottom pb-2">
                  Course Information
                </Card.Title>
                <Row>
                  <Col md={6}>
                    <h5 className="text-primary">Technical Details</h5>
                    <ul className="list-unstyled">
                      <li className="d-flex justify-content-between py-2 border-bottom">
                        <span className="text-muted">Total Lessons:</span>
                        <span className="fw-semibold">{course.noOfLessons}</span>
                      </li>
                      <li className="d-flex justify-content-between py-2 border-bottom">
                        <span className="text-muted">Enrolled Students:</span>
                        <span className="fw-semibold">{course.noOfStudents.toLocaleString()}</span>
                      </li>
                    </ul>
                  </Col>
                  <Col md={6}>
                    <h5 className="text-primary">Course Statistics</h5>
                    <ul className="list-unstyled">
                      <li className="d-flex justify-content-between py-2 border-bottom">
                        <span className="text-muted">Course Category:</span>
                        <span className="fw-semibold">{course.category}</span>
                      </li>
                      <li className="d-flex justify-content-between py-2 border-bottom">
                        <span className="text-muted">Subcategory:</span>
                        <span className="fw-semibold">{course.subcategory}</span>
                      </li>
                      <li className="d-flex justify-content-between py-2 border-bottom">
                        <span className="text-muted">Average Rating:</span>
                        <span className="fw-semibold">{course.rating}/5.0</span>
                      </li>
                      <li className="d-flex justify-content-between py-2 border-bottom">
                        <span className="text-muted">Total Reviews:</span>
                        <span className="fw-semibold">{course.reviewCount.toLocaleString()}</span>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Container>

          {/* Related Courses */}
          {relatedCourses.length > 0 && (
            <Container className="py-4">
              <h2 className="text-primary mb-4">You May Also Like</h2>
              <Row className="g-4">
                {relatedCourses.map(relatedCourse => (
                  <Col xs={12} sm={6} lg={4} key={relatedCourse._id}>
                    <Card className="h-100 shadow-sm">
                      <Card.Img
                        variant="top"
                        src={relatedCourse.image}
                        alt={relatedCourse.name}
                        style={{ height: '180px', objectFit: 'cover' }}
                      />
                      <Card.Body>
                        <div className="d-flex justify-content-between mb-2">
                          <Card.Title className="fs-6 mb-0">
                            {relatedCourse.name}
                          </Card.Title>
                          <span className="text-primary fw-bold">
                            ${relatedCourse.price}
                          </span>
                        </div>
                        <StarRating rating={relatedCourse.rating} reviewCount={relatedCourse.reviewCount} />
                        <div className="d-flex flex-wrap gap-1 my-2">
                          <small className="text-muted d-flex align-items-center">
                            <FaRegClock className="me-1" /> {relatedCourse.duration}
                          </small>
                          <small className="text-muted d-flex align-items-center">
                            <FaUserGraduate className="me-1" /> {relatedCourse.noOfStudents}+
                          </small>
                          <small className="text-muted d-flex align-items-center">
                            <FaBook className="me-1" /> {relatedCourse.noOfLessons}
                          </small>
                        </div>
                        <Card.Text className="small text-muted mb-3">
                          {relatedCourse.description}
                        </Card.Text>
                        <div className="d-flex flex-wrap gap-1 mb-3">
                          {relatedCourse.isPopular && (
                            <Badge bg="warning" text="dark">Popular</Badge>
                          )}
                          {relatedCourse.isHighRated && (
                            <Badge bg="primary">Top Rated</Badge>
                          )}
                          <Badge bg={relatedCourse.status === 'available' ? 'success' : 'warning'}>
                            {relatedCourse.status === 'available' ? 'Available' : 'Coming Soon'}
                          </Badge>
                        </div>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="w-100"
                          onClick={() => {
                            navigate(`/course/${relatedCourse._id}`);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                        >
                          View Details
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default CourseDetail;