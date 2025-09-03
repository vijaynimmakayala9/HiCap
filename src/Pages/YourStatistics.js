import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer, CartesianGrid
} from 'recharts';

const COLORS = ['#a51d34', '#c34153'];

const formatDateLabel = (dateObj) => {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = dayNames[dateObj.getDay()];
  const date = dateObj.getDate().toString().padStart(2, '0');
  const month = monthNames[dateObj.getMonth()];
  return `${day} (${date} ${month})`;
};

const YourStatistics = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch courses
        const coursesResponse = await axios.get('http://31.97.206.144:5001/api/coursecontroller');
        if (coursesResponse.data.success) {
          const availableCourses = Array.isArray(coursesResponse.data) ?
            coursesResponse.data :
            (Array.isArray(coursesResponse.data.data) ? coursesResponse.data.data : []);
          setCourses(availableCourses);

          if (availableCourses.length > 0) {
            setSelectedCourse(availableCourses[0]);
          }
        }

        // Fetch enrollments
        const enrollmentsResponse = await axios.get('http://31.97.206.144:5001/api/enrollments');
        if (enrollmentsResponse.data.success) {
          setEnrollments(enrollmentsResponse.data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const prepareChartData = () => {
    if (!selectedCourse || !enrollments.length || !user?.id) return [];

    const userEnrollments = enrollments.filter(
      e => e.course?._id === selectedCourse._id && e.user?._id === user.id
    );

    if (!userEnrollments.length) return [];

    const completedEnrollment = userEnrollments.find(e =>
      e.performance && e.performance.completedAt
    );

    if (!completedEnrollment?.performance) return [];

    const { performance } = completedEnrollment;
    const completionDate = new Date(performance.completedAt);
    const practical = performance.practicalPercentage || 0;
    const theoretical = performance.theoreticalPercentage || 0;

    return [{
      day: formatDateLabel(completionDate),
      practical: parseFloat(practical.toFixed(2)),
      theoretical: parseFloat(theoretical.toFixed(2)),
      completionDate: completionDate.toISOString().split('T')[0]
    }];
  };


  const chartData = prepareChartData();
  const currentPerformance = enrollments.find(
    e => e.course?._id === selectedCourse?._id && e.user?._id === user?.id
  )?.performance;

  if (loading) {
    return (
      <section className="container py-5">
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container py-5">
      {/* Header and Dropdown */}
      <div className="row mb-4 align-items-center">
        <div className="col-md-8">
          <h2 className="fw-bold mb-2">Your Course Performance</h2>
          {/* <div style={{ width: '180px', height: '5px', backgroundColor: '#a51d34', borderRadius: '20px' }} /> */}
        </div>
        <div className="col-md-4 mt-3 mt-md-0">
          <select
            value={selectedCourse?._id || ''}
            onChange={(e) => {
              const course = courses.find(c => c._id === e.target.value);
              setSelectedCourse(course);
            }}
            className="form-select"
          >
            {courses.map((course) => (
              <option key={course._id} value={course._id}>{course.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Performance Summary */}
      {currentPerformance && (
        <div className="row mb-4">
          <div className="col-md-6 mb-3 mb-md-0">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Assignment: {currentPerformance.courseTopic || 'N/A'}</h5>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="mb-1">Practical: {currentPerformance.practicalPercentage}%</p>
                    <p className="mb-1">Theoretical: {currentPerformance.theoreticalPercentage}%</p>
                  </div>
                  <div className="badge bg-meroon fs-6">
                    Grade: {currentPerformance.grade || 'N/A'}
                  </div>
                </div>
                {currentPerformance.feedback && (
                  <div className="mt-2">
                    <p className="mb-1 fw-semibold">Feedback:</p>
                    <p className="mb-0">{currentPerformance.feedback}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Completion Status</h5>
                {currentPerformance.completedAt ? (
                  <>
                    <p className="mb-1">Completed on: {new Date(currentPerformance.completedAt).toLocaleDateString()}</p>
                    <div className="progress mt-3" style={{ height: '10px' }}>
                      <div
                        className="progress-bar bg-meroon"
                        role="progressbar"
                        style={{ width: '100%' }}
                        aria-valuenow={100}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></div>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="mb-1">Course in progress</p>
                    <div className="progress mt-3" style={{ height: '10px' }}>
                      <div
                        className="progress-bar bg-warning"
                        role="progressbar"
                        style={{ width: '60%' }}
                        aria-valuenow={60}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="card shadow border-0">
        <div className="card-body">
          <h5 className="card-title mb-4">
            Performance at Completion - {selectedCourse?.name}
            {currentPerformance?.courseTopic && ` - ${currentPerformance.courseTopic}`}
          </h5>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 100]} unit="%" />
                <Tooltip
                  formatter={(value, name) => [`${value}%`, name]}
                  labelFormatter={(label) => `Completion Date: ${label}`}
                />
                <Legend />
                <Bar dataKey="practical" fill={COLORS[0]} radius={[4, 4, 0, 0]} name="Practical (100%)" />
                <Bar dataKey="theoretical" fill={COLORS[1]} radius={[4, 4, 0, 0]} name="Theoretical (100%)" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-5">
              {selectedCourse ? (
                currentPerformance?.completedAt ? (
                  <p className="text-muted">No completion data available for visualization</p>
                ) : (
                  <p className="text-muted">Course not yet completed</p>
                )
              ) : (
                <p className="text-muted">No course selected</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default YourStatistics;