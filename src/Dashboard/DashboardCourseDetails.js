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
  FaBookOpen,
  FaMeetup,
  FaTools,
  FaCode
} from 'react-icons/fa';
import { Container, Row, Col, Card, Button, Form, Modal, Badge, Accordion } from 'react-bootstrap';
import FlashContact from '../components/FlashContact';
import CourseEnquiryModal from '../components/EnrollModal';
import DownloadSyllabusModal from '../models/DownloadSyllabusModal'; // Import the new component
import GetInTouch from '../models/GetinTouch';



const DashboardCourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openFAQIndex, setOpenFAQIndex] = useState(null);
  const navigate = useNavigate();
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [showSyllabusModal, setShowSyllabusModal] = useState(false); // State for syllabus modal
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://31.97.206.144:5001/api/coursecontroller');
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

  const [prefillCourse, setPrefillCourse] = useState(""); 

  const handleEnroll = (name) => {
    setPrefillCourse(name);
    setShowEnquiryModal(true);
  };

  const handleDownloadSyllabus = () => {
    setShowSyllabusModal(true);
  };

  if (loading) return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className="text-center py-5">
        <div className="spinner-border textcolor" role="status">
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

  const relatedCourses = allCourses.filter(c => c._id !== id).slice(0, 4);

  return (
    <>
   
      <div className="min-vh-100 d-flex flex-column bg-light ">
        <main className="flex-grow my-2">
            <button className='btn btn-secondary' onClick={()=>navigate(-1)}>
              <i className="fa-solid fa-arrow-left"></i>  Back
            </button>
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
                    className="rounded-4 img-fluid h-100"
                    // style={{
                    //   border: "0.5px solid maroon",
                    //   boxShadow: "0 10px 20px rgba(128, 0, 0, 0.3)",
                    //   transition: "transform 0.3s ease, box-shadow 0.3s ease"
                    // }}
                  />
                </div>
              </Col>
              {/* Text Content */}
              <Col lg={6} className="order-2 order-lg-2">
                <div className="p-3 p-md-4">
                  <button
                    type="button"
                    className="border-0 px-3 py-1 rounded-pill"
                    style={{ backgroundColor: "#c34153", color: "#fff" }}
                  >
                    {course.category} Training
                  </button>

                  <h1 className="display-5 fw-bold mb-3" style={{ color: "#a51d34" }}>
                    {course.name}
                  </h1>
                  <p
                    className="lead mb-4"
                    style={{ color: "#000" }}
                  >
                    {course.description}
                  </p>

                  <div className="d-flex flex-wrap gap-2 mb-4">
                    <button
                      type="button"
                      className="d-flex small align-items-center gap-2 px-3 py-1 border-0 rounded-pill"
                      style={{ backgroundColor: "#c34153", color: "#fff" }}
                    >
                      <FaRegClock className="fs-6" />
                      {course.duration}
                    </button>

                    <button
                      type="button"
                      className="d-flex small align-items-center gap-2 px-3 py-1 border-0 rounded-pill"
                      style={{ backgroundColor: "#c34153", color: "#fff" }}
                    >
                      <FaUserGraduate className="fs-6" />
                      {course.noOfStudents}
                    </button>

                    <button
                      type="button"
                      className="d-flex small align-items-center gap-2 px-3 py-1 border-0 rounded-pill"
                      style={{ backgroundColor: "#c34153", color: "#fff" }}
                    >
                      <FaBook className="fs-6" />
                      {course.noOfLessons}
                    </button>

                    <button
                      type="button"
                      className="d-flex small align-items-center gap-2 px-3 py-1 border-0 rounded-pill"
                      style={{ backgroundColor: "#c34153", color: "#fff" }}
                    >
                      <FaMeetup className="fs-6" />
                      {course.mode}
                    </button>
                  </div>

                  

                  <div className="d-flex flex-column flex-sm-row gap-3">
                    <button className="btn btn-md gradient-button" onClick={()=>handleEnroll(course.name)}>
                      Enroll Now
                    </button>
                    <button
                      className="btn btn-md btn-outline-meroon"
                      onClick={handleDownloadSyllabus}
                    >
                      Download Syllabus
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>



          {/* Features and Who Can Learn */}
          <Container className="py-4">
            <Row className="g-4">
              {/* What You'll Get */}
              <Col lg={6}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body>
                    <Card.Title
                      className="d-flex align-items-center mb-3 pb-1 border-bottom"
                      style={{ fontWeight: '600', fontSize: '1.25rem', color: "#a51d34" }}
                    >
                      <FaCertificate className="me-2" size={20} />
                      What You'll Get
                    </Card.Title>
                    <Row className="g-2">
                      {course.features.map((feature, index) => (
                        <Col xs={12} sm={6} key={index}>
                          <div className="position-relative h-100">
                            {/* Info Card Style */}
                            <Card
                              className="h-100"
                              style={{
                                backgroundColor: '#f8d7da', // light maroon background
                                borderLeft: '4px solid #a51d34', // maroon accent line
                                borderRadius: '8px',
                                boxShadow: '0 2px 8px rgba(173, 33, 50, 0.15)', // soft maroon shadow
                              }}
                            >
                              <Card.Body className="d-flex align-items-center gap-3 p-3">
                                <img
                                  src={feature.image}
                                  alt={feature.title}
                                  className="img-fluid "
                                  style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                                />
                                <h4 className="mb-0 small text-dark flex-grow-1">
                                  {feature.title}
                                </h4>
                              </Card.Body>
                            </Card>

                            {/* Hover overlay */}
                            <div
                              className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center text-center p-2"
                              style={{
                                backgroundColor: "rgba(0,0,0,0.75)",
                                color: "#fff",
                                opacity: 0,
                                transition: "opacity 0.3s ease",
                                borderRadius: "8px",
                              }}
                            >
                              <small>{feature.description}</small>
                            </div>
                          </div>

                          {/* Hover effect with CSS */}
                          <style jsx>{`
                            .position-relative:hover div.position-absolute {
                              opacity: 1;
                            }
                          `}</style>
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>


              {/* Who Can Learn */}
              <Col xs={12} lg={6}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body>
                    <Card.Title
                      className="border-bottom pb-2"
                      style={{ color: "#a51d34", fontSize: "1.25rem", fontWeight: '600' }}
                    >
                      Who Can Learn
                    </Card.Title>
                    <Row className="g-3">
                      {[
                        {
                          image: "/whocanlearn/student.png",
                          title: "Students & Freshers",
                          description: "Perfect for career starters building rock-solid foundations through practical, industry-aligned training."
                        },
                        {
                          image: "/whocanlearn/professional.png",
                          title: "Working Professionals",
                          description: "Give your career a powerful restart with practical, industry-driven upskilling."
                        },
                        {
                          image: "/whocanlearn/freelancer.png",
                          title: "Freelancers",
                          description: "Freelancers can sharpen their competitive edge with high-demand skills and client-winning strategies to grow their independent careers."
                        },
                        {
                          image: "/whocanlearn/bussiness.png",
                          title: "Entrepreneurs",
                          description: "Entrepreneurs accelerate growth by mastering scalable systems, data-driven decisions, and leadership strategies to outpace competitors."
                        }
                      ].map((learner, index) => (
                        <Col xs={12} sm={6} key={index}>
                          <Card className="border-0 shadow-sm h-100">
                            <Card.Body className="d-flex gap-3">
                              <img
                                src={learner.image}
                                alt={learner.title}
                                className="rounded-circle border border-2 border-light bg-light"
                                style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                              />
                              <div>
                                <h5 className="mb-1" style={{ color: "#a51d34" }}>
                                  {learner.title}
                                </h5>
                                <h6 className="small text-muted mb-0">
                                  {learner.description}
                                </h6>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>

          {/* Tools & Platforms Section */}
          {course.toolsImages && course.toolsImages.length > 0 && (
            <Container className="py-4">
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                  <Card.Title className="d-flex align-items-center mb-4" style={{ color: "#a51d34" }}>
                    <FaTools className="me-2" />
                    Tools & Platforms You'll Learn
                  </Card.Title>
                  <div className="d-flex flex-wrap justify-content-center gap-4">
                    {course.toolsImages.map((tool, index) => (
                      <div key={index} className="text-center" style={{ width: "80px" }}>
                        <img
                          src={tool}
                          alt={`${course.name} Tool ${index}`}
                          className="img-fluid mb-2"
                          style={{
                            height: "50px",
                            objectFit: "contain",
                            transition: "filter 0.3s ease"
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Container>
          )}


          {/* FAQs */}
          {course.faq && course.faq.length > 0 && (
            <Container className="py-4">
              <Card className="border-0">
                <Card.Body className="rounded-4 shadow-sm" style={{ backgroundColor: "#fcebed" }}>
                  <Card.Title
                    className="pb-3 fw-bold"
                    style={{ color: "#a51d34", fontSize: "1.75rem" }}
                  >
                    Frequently Asked Questions
                  </Card.Title>

                  <Accordion>
                    {course.faq.map((item, index) => (
                      <Accordion.Item eventKey={index.toString()} key={index}>
                        <Accordion.Header
                          className="fw-semibold"
                          style={{ color: "#a51d34" }}
                        >
                          {item.question}
                        </Accordion.Header>
                        <Accordion.Body
                          className="small"
                          style={{ lineHeight: "1.6", color: "#333" }}
                        >
                          {item.answer || "No answer provided"}
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </Card.Body>
              </Card>
            </Container>
          )}

          {/* Reviews Section (Directly after FAQs) */}
          {course.reviews && course.reviews.length > 0 && (
            <Container className="py-5">
              <h3 className="mb-4 text-center" style={{ color: "#a51d34" }}>
                Alumni Reviews
              </h3>
              <Row className="g-4">
                {course.reviews.map((review) => (
                  <Col xs={12} md={6} key={review._id}>
                    <Card className="h-100 shadow border-0">
                      <Card.Body>
                        <div className="d-flex align-items-start">
                          <img
                            src={review.image}
                            alt={review.name}
                            className="rounded-circle me-3"
                            style={{ width: "60px", height: "60px", objectFit: "cover" }}
                          />
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-center">
                              <h6 className="mb-1 fw-bold">{review.name}</h6>
                              <div className="d-flex">
                                {[1, 2, 3, 4, 5].map((i) =>
                                  i <= Math.floor(review.rating) ? (
                                    <FaStar key={i} className="text-warning me-1" />
                                  ) : i - review.rating <= 0.5 ? (
                                    <FaStarHalfAlt key={i} className="text-warning me-1" />
                                  ) : (
                                    <FaRegStar key={i} className="text-muted me-1" />
                                  )
                                )}
                              </div>
                            </div>
                            <p className="text-muted mt-2 mb-0">{review.content}</p>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          )}


          <GetInTouch />


          {/* Related Courses - Updated Format */}
          {relatedCourses.length > 0 && (
            <Container className="py-4 bg-light">
              <h2 className="mb-4" style={{ color: "#a51d34" }}>
                You May Also Like
              </h2>
              <Row className="g-4">
                {relatedCourses.map((relatedCourse) => (
                  <Col xs={12} sm={6} lg={6} key={relatedCourse._id}>
                    <Card className="h-100 border-0 shadow-sm" style={{
                      background: 'rgba(255, 255, 255, 0.3)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '16px'
                    }}>
                      <Card.Body className="p-4 d-flex flex-column">

                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={relatedCourse.logoImage} // replace with actual image property
                            alt={relatedCourse.name}
                            className="rounded-circle img-fluid"
                            style={{ width: "70px", height: "70px", objectFit: "cover" }}
                          />
                          <div>
                            <Card.Title className="mb-1 fw-bold" style={{ color: "#a51d34" }}>
                              {relatedCourse.name}
                            </Card.Title>
                            {relatedCourse.category && (
                              <small className="text-muted">{relatedCourse.category}</small>
                            )}
                          </div>
                        </div>

                        <Card.Text className="small text-dark mb-4 flex-grow-1">
                          {relatedCourse.description}
                        </Card.Text>

                        <div className="d-flex align-items-center text-sm text-muted mb-4 gap-4 flex-wrap">
                          <div className="d-flex align-items-center">
                            <FaRegClock className="me-2" style={{ color: "#a51d34" }} />
                            <span>{relatedCourse.duration}</span>
                          </div>
                          <div className="d-flex align-items-center">
                            <FaUserGraduate className="me-2" style={{ color: "#a51d34" }} />
                            <span>{relatedCourse.noOfStudents} </span>
                          </div>
                          <div className="d-flex align-items-center">
                            <FaBook className="me-2 textcolor" />
                            <span>{relatedCourse.noOfLessons}/5</span>
                          </div>
                        </div>

                        <div className="d-flex justify-content-between gap-2 flex-wrap">
                          <Button
                            variant="outline"
                            className="flex-grow-1"
                            style={{
                              borderColor: "#a51d34",
                              color: "#a51d34",
                            }}
                            onMouseOver={(e) => {
                              e.target.style.backgroundColor = "#a51d34";
                              e.target.style.color = "#fff";
                            }}
                            onMouseOut={(e) => {
                              e.target.style.backgroundColor = "transparent";
                              e.target.style.color = "#a51d34";
                            }}
                            onClick={() => {
                              navigate(`/course/${relatedCourse._id}`);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                          >
                            View Details
                          </Button>
                          <button
                            className="btn btn-sm flex-grow-1 gradient-button"
                            onClick={()=>handleEnroll(relatedCourse.name)}
                          >
                            Enroll Now
                          </button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          )}

        </main>
      </div>


      <DownloadSyllabusModal
        show={showSyllabusModal}
        courseId={id}
        handleClose={() => setShowSyllabusModal(false)}
      />

      
      
      <CourseEnquiryModal
        show={showEnquiryModal}
        prefillCourse={prefillCourse}
        handleClose={() => setShowEnquiryModal(false)}
      />
    </>
  );
};

export default DashboardCourseDetail;