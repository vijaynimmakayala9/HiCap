import React, { useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaShareAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Pages/Footer';

const eventsData = [
  {
    title: 'Tech Conference 2025',
    description: "Join us for a full day of tech talks, workshops, and networking with industry leaders.",
    images: ['/b1.jpg', '/b1.png', '/b1.jpg', '/b1.png', '/blog.png'],
    videos: ['https://www.youtube.com/embed/t3dVYMnUQ-U'],
    date: 'May 15, 2025',
    time: '6:00 PM - 9:00 PM',
    location: 'Event Center, City Hall',
  },
  {
    title: 'AI & ML Workshop',
    description: "Hands-on workshop to learn AI & ML basics and practical applications.",
    images: ['/b1.jpg', '/b1.png', '/b1.jpg', '/b1.png', '/blog.png'],
    videos: ['https://www.youtube.com/embed/t3dVYMnUQ-U'],
    date: 'June 10, 2025',
    time: '10:00 AM - 4:00 PM',
    location: 'Tech Hub Auditorium',
  },
  {
    title: '2025 Innovations in Technology Conference',
    description: "Explore the latest advancements in technology at this premier conference.",
    images: ['/b1.jpg', '/b1.png', '/b1.jpg', '/b1.png', '/blog.png'],
    videos: ['https://www.youtube.com/embed/t3dVYMnUQ-U'],
    date: 'January 13-15, 2025',
    time: '9:00 AM - 5:00 PM',
    location: 'Phoenix Convention Center, Phoenix, AZ',
  },
  {
    title: 'Tech Leadership Conference 2025',
    description: "Shaping leadership for Europe's digital future with industry leaders.",
    images: ['/b1.jpg', '/b1.png', '/b1.jpg', '/b1.png', '/blog.png'],
    videos: ['https://www.youtube.com/embed/t3dVYMnUQ-U'],
    date: 'July 17-18, 2025',
    time: '9:00 AM - 4:00 PM',
    location: 'Hasso Plattner Institute, Potsdam, Germany',
  },
  {
    title: 'Ohio Tech Summit 2025',
    description: "Startup Innovation – Cultures that Scale Fast in Ohio's tech scene.",
    images: ['/b1.jpg', '/b1.png', '/b1.jpg', '/b1.png', '/blog.png'],
    videos: ['https://www.youtube.com/embed/t3dVYMnUQ-U'],
    date: 'April 20, 2025',
    time: '8:00 AM - 6:00 PM',
    location: 'Columbus Convention Center, Columbus, OH',
  },
  {
    title: 'VNET Tech Summit 2025',
    description: "Focusing on cybersecurity and protecting your business and personal identity.",
    images: ['/b1.jpg', '/b1.png', '/b1.jpg', '/b1.png', '/blog.png'],
    videos: ['https://www.youtube.com/embed/t3dVYMnUQ-U'],
    date: 'March 5, 2025',
    time: '9:00 AM - 5:00 PM',
    location: 'VNET Conference Hall, San Francisco, CA',
  },
];



const Events = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', event: '' });
  const navigate = useNavigate();

  const handleRegisterClick = (event) => {
    setSelectedEvent(event);
    setFormData({ ...formData, event: event.title });
    setShowModal(true);
  };

  const handleViewDetails = (event) => {
    navigate(`/event/${encodeURIComponent(event.title)}`, { state: { event } });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert(`Successfully registered for ${formData.event}`);
    setShowModal(false);
    setFormData({ name: '', email: '', phone: '', event: '' });
  };

  return (
    <>
      <Header />

      <div style={{ maxWidth: '1280px', margin: '60px auto', padding: '0 24px', fontFamily: 'Roboto', marginTop: '100px' }}>
        <div className="max-w-[600px] mb-12 mt-18">
          <h1 className="font-roboto font-bold text-3xl mb-2 mt-10 text-black">
            Our <span style={{ color: "#a51d34" }}>Instuite</span> Events
          </h1>
          
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'space-between' }}>
          {eventsData.map((event, index) => (
            <div
              key={index}
              style={{
                width: '387px',
                height: '500px',
                backgroundColor: '#FFFFFF',
                boxShadow: '0px 4px 4px 0px #00000040',
                borderRadius: '10px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              <img
                src={event.images[0]}
                alt="Event"
                style={{ width: '363px', height: '210px', objectFit: 'cover', margin: '12px auto 0', borderRadius: '8px' }}
              />
              <div style={{ padding: '16px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }} className='textcolor'>
                  {event.title}
                </h2>
                <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.6', marginBottom: '16px' }}>
                  {event.description.length > 100 ? `${event.description.substring(0, 100)}...` : event.description}
                </p>

                <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <FaCalendarAlt style={{ color: '#a51d34', marginRight: '8px' }} />
                  <span style={{ fontSize: '14px' }}>{event.date}</span>
                </div>
                <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <FaCalendarAlt style={{ color: '#a51d34', marginRight: '8px', opacity: 0 }} /> 
                  <span style={{ fontSize: '14px' }}>{event.time}</span>
                </div>
                <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <FaMapMarkerAlt style={{ color: '#a51d34', marginRight: '8px' }} />
                  <span style={{ fontSize: '14px' }}>{event.location}</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', paddingTop: '0', alignItems: 'center' }}>
                <button
                  style={{
                    backgroundColor: '#a51d34',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                  onClick={() => handleRegisterClick(event)}
                >
                  Register Now
                </button>

                <button
                  style={{
                    backgroundColor: '#fff',
                    color: '#a51d34',
                    border: '1px solid #a51d34',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                  onClick={() => handleViewDetails(event)}
                >
                  View Details
                </button>

                <div style={{ cursor: 'pointer', color: '#a51d34', fontSize: '18px' }} title="Share this event">
                  <FaShareAlt className='textcolor' />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Register Form Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '10px', width: '400px', maxWidth: '90%', position: 'relative' }}>
            <h2 style={{ marginBottom: '16px', color: '#a51d34' }}>Register for {selectedEvent.title}</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '12px' }}>
                <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} required
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} required
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #ccc', cursor: 'pointer', backgroundColor: '#fff' }}>Cancel</button>
                <button type="submit" style={{ backgroundColor: '#a51d34', color: '#fff', padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Events;
