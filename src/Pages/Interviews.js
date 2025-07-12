import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { FaUpload } from 'react-icons/fa'; // Import FaUpload icon
import Header from './Header';
import Footer from './Footer';

const interviews = [
  {
    id: 1,
    company: 'Amazon',
    role: 'Senior UI/UX Designer',
    date: '20-06-2025',
    workMode: 'Full Time',
    lpa: '20 LPA',
    logo: 'https://purepng.com/public/uploads/large/amazon-logo-s3f.png',
  },
  {
    id: 2,
    company: 'Google',
    role: 'Frontend Developer',
    date: '22-06-2025',
    workMode: 'Part Time',
    lpa: '15 LPA',
    logo: 'https://purepng.com/public/uploads/large/amazon-logo-s3f.png',
  },
  {
    id: 3,
    company: 'Microsoft',
    role: 'Product Designer',
    date: '25-06-2025',
    workMode: 'Remote',
    lpa: '18 LPA',
    logo: 'https://purepng.com/public/uploads/large/amazon-logo-s3f.png',
  },
  {
    id: 4,
    company: 'Netflix',
    role: 'UX Researcher',
    date: '28-06-2025',
    workMode: 'Contract',
    lpa: '17 LPA',
    logo: 'https://purepng.com/public/uploads/large/amazon-logo-s3f.png',
  },
  {
    id: 5,
    company: 'Apple',
    role: 'Product Manager',
    date: '30-06-2025',
    workMode: 'Full Time',
    lpa: '22 LPA',
    logo: 'https://purepng.com/public/uploads/large/amazon-logo-s3f.png',
  },
];

const InterviewCard = ({ interview, onApplyClick }) => {
  return (
    <div className="w-[230px] h-[330px] rounded-[30px] border border-[#00000033] bg-white shadow-md relative p-3 flex flex-col justify-between">
      {/* Date Capsule */}
      <div className="absolute top-3 left-3 px-3 py-[2px] text-xs bg-[#F1F1F1] rounded-full border border-[#CCC] font-roboto font-medium">
        {interview.date}
      </div>

      {/* Company Logo */}
      <div className="absolute top-3 right-3 w-[50px] h-[50px] bg-white rounded-full shadow flex items-center justify-center">
        <img src={interview.logo} alt="Logo" className="w-[30px] h-[30px] object-contain" />
      </div>

      {/* Inner Rectangle */}
      <div className="bg-[#E5F1EF] rounded-[30px] p-4 mt-10 h-[220px] flex flex-col justify-between">
        <div>
          <p className="text-xs font-medium font-roboto text-black mb-1">{interview.company}</p>
          <p className="text-[14px] font-semibold font-roboto text-black leading-tight mb-2">{interview.role}</p>
          <div className="bg-white text-[11px] font-medium rounded-full px-3 py-[3px] w-fit mb-2 shadow">
            {interview.workMode}
          </div>
          <p className="text-[12px] font-roboto text-black">{interview.lpa}</p>
        </div>

        {/* Apply Button */}
        <button
          onClick={() => onApplyClick(interview)}
          className="w-full h-[40px] rounded-full bg-[#007860] text-white font-semibold text-sm flex items-center justify-center gap-2 mt-2"
        >
          Apply <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

const Interviews = () => {
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
  });

  const closeModal = () => {
    setSelectedInterview(null);
    setFormData({ name: '', email: '', phone: '', resume: null }); // Reset form data
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      resume: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`You have applied for the role: ${selectedInterview.role} at ${selectedInterview.company}`);
    closeModal();
  };

  return (
    <>
      <Header />
      <div className="px-6 md:px-[80px] py-16 font-roboto bg-gray-50 min-h-screen mt-10">
        <div className="max-w-[600px] mb-12" style={{ marginRight: 'auto' }}>
          <h1 className="font-roboto font-bold text-3xl mb-2 text-black">
            Interviews
          </h1>
          <div
            style={{
              width: '216px',
              height: '8px',
              borderRadius: '20px',
              backgroundColor: '#007860',
              marginBottom: '12px',
            }}
          />
        </div>

        <div className="flex flex-wrap gap-6 justify-start">
          {interviews.map((item) => (
            <InterviewCard key={item.id} interview={item} onApplyClick={setSelectedInterview} />
          ))}
        </div>
      </div>

      {/* Modal for Application Form */}
      {selectedInterview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 font-bold text-xl"
            >
              &times;
            </button>
            <div className="flex items-center gap-4 mb-4">
              <img
                src={selectedInterview.logo}
                alt={`${selectedInterview.company} Logo`}
                className="w-16 h-16 object-contain"
              />
              <div>
                <h2 className="text-xl font-bold">{selectedInterview.company}</h2>
                <p className="text-gray-700">{selectedInterview.role}</p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md border border-gray-300"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md border border-gray-300"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md border border-gray-300"
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="block font-semibold">Upload Resume</label>
                <label
                  htmlFor="resume"
                  className="cursor-pointer flex items-center gap-2 text-[#007860] font-medium"
                >
                  <FaUpload size={20} /> Upload
                </label>
                <input
                  id="resume"
                  type="file"
                  name="resume"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt"
                />
                {formData.resume && (
                  <p className="text-xs text-gray-500 mt-2">
                    {formData.resume.name} (File selected)
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full h-[40px] rounded-full bg-[#007860] text-white font-semibold text-sm flex items-center justify-center gap-2 mt-4"
              >
                Submit Application <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Interviews;
