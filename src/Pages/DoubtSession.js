import React, { useState } from 'react';
import axios from 'axios';
import { Upload } from 'lucide-react';

const DoubtSession = () => {
  const [formData, setFormData] = useState({
    course: '',
    batchNumber: '',
    mentor: '',
    date: '',
    description: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('course', formData.course);
      formDataToSend.append('batchNumber', formData.batchNumber);
      formDataToSend.append('mentor', formData.mentor);
      formDataToSend.append('date', new Date(formData.date).toISOString());
      formDataToSend.append('description', formData.description);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await axios.post(
        'http://31.97.206.144:5001/api/doubtsession',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        setSuccess(true);
        setFormData({
          course: '',
          batchNumber: '',
          mentor: '',
          date: '',
          description: '',
          image: null,
        });
        // Reset file input
        document.querySelector('input[type="file"]').value = '';
      } else {
        setError('Failed to submit doubt. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
      console.error('Error submitting doubt:', err);
    } finally {
      setLoading(false);
    }
  };

  // Sample course options
  const courseOptions = [
    'Full Stack Development',
    'Data Science',
    'Machine Learning',
    'Cloud Computing',
    'Cyber Security',
    'UI/UX Design',
    'Digital Marketing'
  ];
  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Title Section */}
      <div className="container px-4 py-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Doubt Session</h2>
        
      </div>

      {/* Banner Section */}
      <div
        className="text-white text-center py-8 md:py-12 px-4"
        style={{
          background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
            Got a Question? We've Got Your Back!
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
            Our mentors are here to help you overcome any learning challenges
          </p>
        </div>
      </div>

      {/* Main Section */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 relative">
            <span className="block sm:inline">Your doubt has been submitted successfully!</span>
            <button
              type="button"
              className="absolute top-3 right-3 text-green-700 hover:text-green-900"
              onClick={() => setSuccess(false)}
            >
              <span className="text-2xl">&times;</span>
            </button>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 relative">
            <span className="block sm:inline">{error}</span>
            <button
              type="button"
              className="absolute top-3 right-3 text-red-700 hover:text-red-900"
              onClick={() => setError(null)}
            >
              <span className="text-2xl">&times;</span>
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Left: Image */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="max-w-md w-full">
              <img
                src="https://png.pngtree.com/png-clipart/20230815/original/pngtree-problem-and-solution-in-business-solving-to-look-ideas-with-the-concept-of-teamwork-can-use-for-web-banner-or-background-flat-illustration-picture-image_7945409.png"
                alt="Doubt solving illustration"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:w-1/2 w-full">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  Submit Your Academic Query
                </h2>
                <p className="text-gray-600">We'll get back to you within 24 hours</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">
                    Course *
                  </label>
                  <select
                    name="course"
                    id="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    required
                  >
                    <option value="">Select your course</option>
                    {courseOptions.map((course, index) => (
                      <option key={index} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="batchNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Batch Number *
                  </label>
                  <input
                    type="text"
                    name="batchNumber"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    value={formData.batchNumber}
                    onChange={handleChange}
                    placeholder="e.g., Jan 2025 Weekday"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="mentor" className="block text-sm font-medium text-gray-700 mb-2">
                    Mentor Name *
                  </label>
                  <input
                    type="text"
                    name="mentor"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    value={formData.mentor}
                    onChange={handleChange}
                    placeholder="Enter your mentor's name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Doubt Description *
                  </label>
                  <textarea
                    name="description"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Please describe your doubt in detail..."
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Screenshot (Optional)
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-red-400 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload size={24} className="text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 text-center">
                        <span className="font-medium text-red-600">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
                    </div>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                  {formData.image && (
                    <div className="mt-2 flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                      <span className="text-sm text-gray-600 truncate">{formData.image.name}</span>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, image: null })}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </div>
                  ) : (
                    'Submit Doubt'
                  )}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-500">
                <p>Our support team will contact you via email within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-gray-100 py-12 px-4">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">1</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Submit Your Doubt</h4>
              <p className="text-gray-600">Fill out the form with details about your academic question</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">2</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Expert Review</h4>
              <p className="text-gray-600">Our mentors analyze your question and prepare a detailed response</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">3</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Get Solution</h4>
              <p className="text-gray-600">Receive comprehensive explanation and guidance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoubtSession;