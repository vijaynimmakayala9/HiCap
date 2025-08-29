import React, { useState, useEffect } from "react";
import { Row, Col, Card, Spinner } from "react-bootstrap";
import axios from "axios";

const HeaderSection = ({ userData, enrolledCourses, navigate, todaysClassesCount }) => {
  const [loading, setLoading] = useState(true);
  const [classesCount, setClassesCount] = useState(0);

  useEffect(() => {
    // Use the passed prop if available, otherwise fetch directly
    if (todaysClassesCount !== undefined) {
      setClassesCount(todaysClassesCount);
      setLoading(false);
    } else {
      fetchTodaysClasses();
    }
  }, [todaysClassesCount]);

  const fetchTodaysClasses = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user') || '{}');
      if (!user || !user.id) {
        setLoading(false);
        return;
      }

      const response = await axios.get(`https://hicap-backend-4rat.onrender.com/api/live-classes/user/${user.id}`);
      if (response.data.success) {
        const today = new Date().toDateString();
        const todaysClasses = response.data.data.filter(cls => {
          const classDate = new Date(cls.date).toDateString();
          return classDate === today;
        });
        setClassesCount(todaysClasses.length);
      }
    } catch (error) {
      console.error("Error fetching today's classes:", error);
      setClassesCount(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row className="mb-4">
      <Col md={4}>
        <Card className="shadow-sm border-0 rounded-3 p-3" style={{ backgroundColor: "#e3f2fd" }}>
          <h5 className="text-primary fw-semibold mb-1">Welcome</h5>
          <p className="text-secondary mb-0">
            {userData ? `${userData.firstName || ''} ${userData.lastName || ''}`.trim() : "Loading..."}
          </p>
        </Card>
      </Col>

      <Col md={4}>
        <Card className="shadow-sm border-0 rounded-3 p-3" style={{ backgroundColor: "#e8f5e9" }}>
          <h6 className="text-muted mb-1">Enrolled Courses</h6>
          <h3 className="fw-bold text-success mb-0">{enrolledCourses.length}</h3>
        </Card>
      </Col>

      <Col md={4}>
        <Card
          className="shadow-sm border-0 rounded-3 p-3"
          style={{ backgroundColor: "#fff3e0", cursor: "pointer" }}
          onClick={() => navigate("/dashboard/live-classes")}
        >
          <h6 className="text-muted mb-1">Classes Today</h6>
          {loading ? (
            <div className="d-flex align-items-center">
              <Spinner animation="border" size="sm" className="me-2 text-warning" />
              <span className="text-warning">Loading...</span>
            </div>
          ) : (
            <h3 className="fw-bold text-warning mb-0">{classesCount}</h3>
          )}
        </Card>
      </Col>
    </Row>
  );    
};

export default HeaderSection;