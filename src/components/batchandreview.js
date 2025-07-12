import React, { useState } from 'react';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const batchData = [
  {
    title: 'API Testing',
    duration: '50 Days',
    timings: '8am to 9.30am',
    location: 'Hyderabad',
    startDate: '10 July 2025',
    faculty: 'Anudeep',
  },
  {
    title: 'ReactJS + NodeJS',
    duration: '60 Days',
    timings: '7pm to 9pm',
    location: 'Online',
    startDate: '15 July 2025',
    faculty: 'Sandeep',
  },
  {
    title: 'Python with Django',
    duration: '45 Days',
    timings: '6am to 7.30am',
    location: 'Hyderabad',
    startDate: '20 July 2025',
    faculty: 'Ramya',
  },
];

const alumniData = [
  {
    name: 'Surendra Timmidi',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
    review: 'Magnitia is an excellent institution to build your career. The faculties are more than 18 years experienced. I am blessed to join this institute.',
  },
  {
    name: 'Anjali Sharma',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
    review: 'The classes were extremely practical and engaging. I was placed right after the training. Best decision ever!',
  },
  {
    name: 'Rakesh Kumar',
    img: 'https://randomuser.me/api/portraits/men/52.jpg',
    review: 'Hands-on projects and one-on-one mentoring helped me crack interviews with ease. Highly recommended!',
  },
];

const BatchAndAlumniSection = () => {
  const [batchIndex, setBatchIndex] = useState(0);
  const [alumniIndex, setAlumniIndex] = useState(0);

  const nextBatch = () => setBatchIndex((batchIndex + 1) % batchData.length);
  const prevBatch = () => setBatchIndex((batchIndex - 1 + batchData.length) % batchData.length);

  const nextAlumni = () => setAlumniIndex((alumniIndex + 1) % alumniData.length);
  const prevAlumni = () => setAlumniIndex((alumniIndex - 1 + alumniData.length) % alumniData.length);

  const batch = batchData[batchIndex];
  const alumni = alumniData[alumniIndex];

  return (
    <div className="container py-4 py-lg-5">
      <div className="row g-4">
        {/* Left Side - New Batches */}
        <div className="col-lg-6 order-lg-1 order-2">
          <div className="p-3 p-md-4 rounded-4 h-100" style={{ backgroundColor: '#35A872', color: 'white' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold mb-0">
                New <span style={{ color: '#fff' }}>Batches</span>
              </h4>
              <div className='d-flex'>
                <FaChevronLeft 
                  onClick={prevBatch} 
                  className="me-2" 
                  style={{ cursor: 'pointer', fontSize: '1.25rem' }} 
                />
                <FaChevronRight 
                  onClick={nextBatch} 
                  style={{ cursor: 'pointer', fontSize: '1.25rem' }} 
                />
              </div>
            </div>

            <div className="bg-white text-dark rounded-4 p-3 p-md-4 shadow h-100">
              <p className="fw-semibold mb-3 mb-md-4">
                Team Magnitia connecting trainees with Industry through robust placement activities
              </p>
              <div className="table-responsive">
                <table className="table table-borderless mb-3 mb-md-4">
                  <tbody>
                    <tr><td className="fw-bold">Batch</td><td>{batch.title}</td></tr>
                    <tr><td className="fw-bold">Duration</td><td>{batch.duration}</td></tr>
                    <tr><td className="fw-bold">Timings</td><td>{batch.timings}</td></tr>
                    <tr><td className="fw-bold">Location</td><td>{batch.location}</td></tr>
                    <tr><td className="fw-bold">Start Date</td><td>{batch.startDate}</td></tr>
                    <tr><td className="fw-bold">Faculty</td><td>{batch.faculty}</td></tr>
                  </tbody>
                </table>
              </div>
              <button className="btn btn-success rounded-pill px-4 w-100 w-md-auto">Apply Now</button>
            </div>
          </div>
        </div>

        {/* Right Side - Alumni Speaks */}
        <div className="col-lg-6 order-lg-2 order-1">
          <div className="h-100 d-flex flex-column">
            <h4 className="fw-bold mb-3">
              Alumni <span className="text-primary">Speaks</span>
            </h4>
            <p className="text-muted mb-3 mb-md-4">
              People are the driving force behind every high-performance operation. The ability to attract and retain the right IT professionals...
            </p>

            <div className="bg-light rounded-4 p-3 p-md-4 flex-grow-1">
              <div className='d-flex align-items-start mb-3'>
                <img
                  src={alumni.img}
                  alt="Alumni"
                  className="rounded-circle me-3 shadow-sm"
                  style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                />
                <div>
                  <h6 className="fw-bold text-success mb-1">{alumni.name}</h6>
                  <div className="text-warning mb-2 d-flex">
                    {[...Array(5)].map((_, idx) => (
                      <FaStar key={idx} className="me-1" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-muted mb-4" style={{ fontSize: '0.9rem' }}>"{alumni.review}"</p>
              
              <div className="d-flex justify-content-between align-items-center mt-auto">
                <div className="d-flex">
                  {alumniData.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`mx-1 rounded-circle ${alumniIndex === idx ? 'bg-success' : 'bg-secondary'}`}
                      style={{ width: '10px', height: '10px', cursor: 'pointer' }}
                      onClick={() => setAlumniIndex(idx)}
                    />
                  ))}
                </div>
                <div>
                  <button 
                    className="btn btn-sm btn-success me-2 rounded-circle" 
                    onClick={prevAlumni}
                    style={{ width: '36px', height: '36px' }}
                  >
                    <FaChevronLeft />
                  </button>
                  <button 
                    className="btn btn-sm btn-success rounded-circle" 
                    onClick={nextAlumni}
                    style={{ width: '36px', height: '36px' }}
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchAndAlumniSection;