import React, { useState } from "react";
import AboutMagnitia from "../Pages/AboutMagnitia";
import Header from "../Pages/Header";
import Footer from "../Pages/Footer";

const batches = [
  {
    title: "Testing Tools (Manual Testing, Selenium with AI, Java, Frameworks & Cucumber)",
    date: "26 June 2025",
    time: "10:30am to 11.30am",
    duration: "75 days",
    faculty: "Chary",
    type: "Live Online & Classroom Training",
  },
  {
    title: "Testing Tools (Manual Testing, Selenium with AI, Java, Frameworks & Cucumber)",
    date: "07 July 2025",
    time: "9.30am to 10.30am",
    duration: "75 days",
    faculty: "Chary",
    type: "Live Online & Classroom Training",
  },
  {
    title: "API Testing (WebServices, MicroServices, Rest Assured, and Postman)",
    date: "10 July 2025",
    time: "8am to 9.30am",
    duration: "50 days",
    faculty: "Anudeep",
    type: "Live Online Training",
  },
  {
    title: "Selenium Powered with AI (Selenium powered with AI, Java, Frameworks & Cucumber)",
    date: "10 July 2025",
    time: "7:30am to 9am",
    duration: "60 days",
    faculty: "GC Reddy",
    type: "Live Online Training",
  },
  {
    title: "Performance Testing with JMeter",
    date: "12 July 2025",
    time: "11am to 1pm",
    duration: "Weekend Batch",
    faculty: "Mani",
    type: "Live Online Training",
  },
  {
    title: "Testing Tools (Manual Testing, Selenium with Java, Frameworks & Cucumber)",
    date: "16 July 2025",
    time: "5pm to 6.30pm",
    duration: "75 days",
    faculty: "Anudeep",
    type: "Live Online Training",
  },
  {
    title: "Testing Tools (Manual Testing, Selenium with Java, Frameworks & Cucumber)",
    date: "24 July 2025",
    time: "7pm to 8.30pm",
    duration: "75 days",
    faculty: "Anudeep",
    type: "Live Online Training",
  },
];

const trainingTypes = [
  { 
    name: "All Batches", 
    filter: () => true,
    color: "bg-gray-600"
  },
  { 
    name: "Regular Training", 
    filter: (batch) => batch.type.includes("Classroom") && !batch.duration.includes("Weekend"),
    color: "bg-blue-600"
  },
  { 
    name: "Online Training", 
    filter: (batch) => batch.type.includes("Online") && !batch.duration.includes("Weekend"),
    color: "bg-purple-600"
  },
  { 
    name: "Weekend Training", 
    filter: (batch) => batch.duration.includes("Weekend"),
    color: "bg-green-600"
  },
  { 
    name: "Full Stack", 
    filter: (batch) => batch.title.includes("Full Stack"),
    color: "bg-orange-600"
  },
];

const UpCommingBatches = () => {
  const [activeFilter, setActiveFilter] = useState("All Batches");
  const [filteredBatches, setFilteredBatches] = useState(batches);

  const handleFilterClick = (type) => {
    setActiveFilter(type.name);
    setFilteredBatches(batches.filter(type.filter));
  };

  return (
    <>
      <Header />
      <div className="mt-5">
        <AboutMagnitia />

        {/* Batch Details Section */}
        <section className="container my-5 mx-auto px-4">
          <h2 className="text-center text-purple-800 text-2xl md:text-3xl font-bold mb-6">
            Click below to view the batch details
          </h2>

          <div className="bg-gradient-to-r from-green-600 to-green-800 text-white text-center py-3 text-lg font-semibold rounded-t-lg shadow-md">
            UPCOMING BATCHES
          </div>

          {/* Training Type Buttons */}
          <div className="flex flex-wrap justify-center gap-3 bg-gray-100 py-4 px-2 rounded-t-lg">
            {trainingTypes.map((type) => (
              <button
                key={type.name}
                onClick={() => handleFilterClick(type)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md ${
                  activeFilter === type.name
                    ? `${type.color} text-white transform scale-105`
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>

          {/* Batch Table */}
          <div className="overflow-x-auto bg-white shadow-lg rounded-b-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-green-600 to-green-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs md:text-sm font-medium text-white uppercase tracking-wider">
                    Batch Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs md:text-sm font-medium text-white uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs md:text-sm font-medium text-white uppercase tracking-wider">
                    Timings
                  </th>
                  <th className="px-6 py-3 text-left text-xs md:text-sm font-medium text-white uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs md:text-sm font-medium text-white uppercase tracking-wider">
                    Faculty
                  </th>
                  <th className="px-6 py-3 text-left text-xs md:text-sm font-medium text-white uppercase tracking-wider">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBatches.length > 0 ? (
                  filteredBatches.map((batch, index) => (
                    <tr 
                      key={index} 
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}
                    >
                      <td className="px-6 py-4 whitespace-normal text-sm md:text-base text-gray-800">
                        {batch.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-800">
                        {batch.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-800">
                        {batch.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-800">
                        {batch.duration}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-800">
                        {batch.faculty}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-800">
                        {batch.type}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      No batches found for the selected filter
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Additional Information */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Need Help Choosing a Batch?</h3>
            <p className="text-gray-700 mb-3">
              Contact our counselors at <span className="font-semibold">+91 1234567890</span> or 
              email us at <span className="font-semibold">info@Magnitia.com</span> for personalized guidance.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              Request a Call Back
            </button>
          </div>
        </section>
      </div>
      <Footer/>
    </>
  );
};

export default UpCommingBatches;