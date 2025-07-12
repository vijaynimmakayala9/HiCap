import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const DoubtSession = () => {
  const [formData, setFormData] = useState({
    course: '',
    lesson: '',
    classNo: '',
    doubt: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Ticket Raised!');
  };

  return (
    <div className="font-roboto">
      {/* Header */}
      <Header />

     <div
      className="max-w-[600px] mb-12 px-6 md:px-[60px]"
      style={{ marginRight: 'auto', marginTop: '70px', marginBottom: '48px' }}
    >
      <h1 className="font-roboto font-bold text-3xl mb-2 text-black">Doubt Session</h1>
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

      {/* Top Banner */}
      <div className="w-full h-[290px] bg-[#007860] flex items-center justify-center px-6 md:px-[100px]">
        <h1 className="text-white text-4xl md:text-[64px] font-bold leading-[160%] text-center">
          Got a Question? We’ve Got Your Back!
        </h1>
      </div>

      {/* Doubt Section */}
      <div className="w-full px-6 md:px-[60px] py-16 flex flex-col md:flex-row gap-12 items-center justify-between bg-white">
        {/* Left Text */}
        <div className="max-w-[615px]">
          <h2 className="text-[32px] md:text-[64px] font-bold leading-[160%] text-black">
            Have a Doubt? <br /> Raise it Instantly
          </h2>
        </div>

        {/* Right Form */}
        <div className="w-full max-w-[516px] bg-[#027A62] rounded-[10px] p-6 text-white">
          <p className="uppercase text-[18px] font-semibold mb-2">Get in touch</p>
          <h3 className="text-[28px] md:text-[40px] font-bold leading-[52px] mb-6">
            Submit Your Academic Query
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-white text-black"
              required
            >
              <option value="">Select Course</option>
              <option value="AI & ML">AI & ML</option>
              <option value="Web Dev">Web Development</option>
              <option value="Data Science">Data Science</option>
            </select>

            <input
              type="text"
              name="lesson"
              value={formData.lesson}
              onChange={handleChange}
              placeholder="Lesson No."
              className="w-full px-4 py-2 rounded text-black"
              required
            />

            <input
              type="text"
              name="classNo"
              value={formData.classNo}
              onChange={handleChange}
              placeholder="Class No."
              className="w-full px-4 py-2 rounded text-black"
              required
            />

            <textarea
              name="doubt"
              value={formData.doubt}
              onChange={handleChange}
              placeholder="Describe your doubt"
              rows="3"
              className="w-full px-4 py-2 rounded text-black"
              required
            ></textarea>

            <label className="flex items-center gap-2 cursor-pointer">
              <Upload size={20} />
              <span>Upload Image</span>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>

            <button
              type="submit"
              className="w-full bg-white text-black border border-black py-3 rounded-full text-lg font-semibold mt-2 hover:bg-gray-100 transition"
            >
              Raise Ticket
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DoubtSession;
