import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Import components
import HeaderSection from "./HeaderSection";
import AttendanceSection from "./AttendanceSection";
import EnrolledCourses from "./EnrolledCourses";
import StudentDetails from "./StudentDetails";
import CalendarSection from "./CalendarSection";
import RecommendedCourses from "./RecommendedCourses";
import CourseEnquiryModal from "../components/EnrollModal";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrollmentsLoading, setEnrollmentsLoading] = useState(true);
  const [userDetailsLoading, setUserDetailsLoading] = useState(true);
  const [todaysClassesCount, setTodaysClassesCount] = useState(0);

  const Student = JSON.parse(sessionStorage.getItem('user') || '{}');
  const UserId = Student.id;
 

  const navigate = useNavigate();

  const fetchRecommendedCourses = async () => {
    try {
      const response = await axios.get(`http://31.97.206.144:5001/api/recommend-courses/${UserId}`);
      setRecommendedCourses(response.data.data || []);
    } catch (error) {
      console.error("Error fetching recommended courses:", error);
      // Fallback to general courses if recommendation fails
      try {
        const response = await axios.get("http://31.97.206.144:5001/api/coursecontroller");
        setRecommendedCourses(response.data.data || response.data || []);
      } catch (fallbackError) {
        console.error("Error fetching fallback courses:", fallbackError);
        setRecommendedCourses([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrollments = async () => {
    try {
      const response = await axios.get(`http://31.97.206.144:5001/api/user/${UserId}/enrollments`);
      setEnrolledCourses(response.data.enrolledCourses || []);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      setEnrolledCourses([]);
    } finally {
      setEnrollmentsLoading(false);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://31.97.206.144:5001/api/userregister/${UserId}`);
      setUserData(response.data.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setUserDetailsLoading(false);
    }
  };

  const fetchTodaysClasses = async () => {
    try {
      const response = await axios.get(`http://31.97.206.144:5001/api/live-classes/user/${UserId}`);
      if (response.data.success) {
        const today = new Date().toDateString();
        const todaysClasses = response.data.data.filter(cls => {
          const classDate = new Date(cls.date).toDateString();
          return classDate === today;
        });
        setTodaysClassesCount(todaysClasses.length);
      }
    } catch (error) {
      console.error("Error fetching today's classes:", error);
      // Set default value if API fails
      setTodaysClassesCount(0);
    }
  };

  useEffect(() => {
    if (UserId && UserId) {
      fetchRecommendedCourses();
      fetchEnrollments();
      fetchUserDetails();
      fetchTodaysClasses();
    }
  }, [UserId]);

  const handleViewDetails = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  if (!UserId) {
    return (
      <Container fluid className="min-vh-100 bg-light p-3 p-md-4 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <h3>Please log in to access the dashboard</h3>
          <button className="btn btn-primary mt-3" onClick={() => navigate("/login")}>
            Go to Login
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="min-vh-100 bg-light p-3 p-md-4">
      {/* Header Section */}
      <HeaderSection 
        userData={userData} 
        enrolledCourses={enrolledCourses} 
        navigate={navigate}
        todaysClassesCount={todaysClassesCount}
      />

      <Row className="mb-4">
        {/* Attendance Section */}
        <AttendanceSection enrolledCourses={enrolledCourses} />
        
        {/* Enrolled Courses */}
        <EnrolledCourses 
          enrollmentsLoading={enrollmentsLoading}
          enrolledCourses={enrolledCourses}
          navigate={navigate}
        />

        {/* Student Details */}
        <StudentDetails 
          userDetailsLoading={userDetailsLoading}
          userData={userData}
          student={UserId}
          enrolledCourses={enrolledCourses}
        />

        {/* Calendar Section */}
        <CalendarSection />

        {/* Recommended Courses */}
        {/* <RecommendedCourses 
          loading={loading}
          recommendedCourses={recommendedCourses}
          handleViewDetails={handleViewDetails}
          setSelectedCourse={setSelectedCourse}
          setShowModal={setShowModal}
        /> */}
      </Row>

      {/* Enroll Modal */}
      <CourseEnquiryModal 
        show={showModal} 
        handleClose={() => setShowModal(false)} 
        prefillCourse={selectedCourse} 
      />
    </Container>
  );
};

export default Dashboard;