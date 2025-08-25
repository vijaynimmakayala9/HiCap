import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");

const API_BASE = "https://hicap-backend-4rat.onrender.com/api/coursecontroller";

function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    name: "",
    description: "",
    mode: "online",
    category: "",
    subcategory: "",
    duration: "",
    faq: [{ question: "", answer: "" }],
    courseObject: [{ title: "", content: "" }],
    features: [{ title: "", image: "" }],
    noOfLessons: 0,
    noOfStudents: 0,
    rating: 0,
    reviewCount: 0,
    isPopular: false,
    isHighRated: false,
    price: 0,
    status: "available",
    image: "",
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [viewCourse, setViewCourse] = useState(null);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(API_BASE);
      setCourses(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (err) {
      Swal.fire("Error", "Failed to fetch courses", "error");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleImageUpload = async (e, index = null, field = "main") => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY", formData);
      const url = res.data.data.url;

      if (field === "main") {
        setNewCourse({ ...newCourse, image: url });
      } else if (field === "feature") {
        const updated = [...newCourse.features];
        updated[index].image = url;
        setNewCourse({ ...newCourse, features: updated });
      }
    } catch (err) {
      Swal.fire("Error", "Image upload failed", "error");
    }
  };

  const handleNestedChange = (e, field, index, key) => {
    const updated = [...newCourse[field]];
    updated[index][key] = e.target.value;
    setNewCourse({ ...newCourse, [field]: updated });
  };

  const addNestedField = (field, template) => {
    setNewCourse({ ...newCourse, [field]: [...newCourse[field], template] });
  };

  const removeNestedField = (field, index) => {
    const updated = [...newCourse[field]];
    updated.splice(index, 1);
    setNewCourse({ ...newCourse, [field]: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (let key in newCourse) {
      if (["faq", "courseObject"].includes(key)) {
        formData.append(key, JSON.stringify(newCourse[key]));
      } else if (key === "features") {
        newCourse.features.forEach((f, i) => {
          formData.append(`features[${i}][title]`, f.title);
          if (f.image && f.image.startsWith("http")) {
            formData.append(`features[${i}][image]`, f.image);
          }
        });
        formData.append("featureCount", newCourse.features.length);
      } else {
        formData.append(key, newCourse[key]);
      }
    }

    try {
      await axios.post(API_BASE, formData);
      Swal.fire("Success", "Course created successfully", "success");
      setNewCourse({
        name: "",
        description: "",
        mode: "online",
        category: "",
        subcategory: "",
        duration: "",
        faq: [{ question: "", answer: "" }],
        courseObject: [{ title: "", content: "" }],
        features: [{ title: "", image: "" }],
        noOfLessons: 0,
        noOfStudents: 0,
        rating: 0,
        reviewCount: 0,
        isPopular: false,
        isHighRated: false,
        price: 0,
        status: "available",
        image: "",
      });
      fetchCourses();
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Course creation failed", "error");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this course?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${API_BASE}/${id}`);
      Swal.fire("Deleted!", "Course has been deleted.", "success");
      fetchCourses();
    } catch {
      Swal.fire("Error", "Delete failed", "error");
    }
  };

  const handleView = (course) => {
    setViewCourse(course);
    setModalIsOpen(true);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Admin Courses</h2>

      <form onSubmit={handleSubmit} className="mb-5">
        <div className="row">
          {Object.entries({
            name: "Name",
            description: "Description",
            mode: "Mode",
            category: "Category",
            subcategory: "Subcategory",
            duration: "Duration",
            noOfLessons: "Lessons",
            noOfStudents: "Students",
            rating: "Rating",
            reviewCount: "Reviews",
            price: "Price",
            status: "Status",
          }).map(([key, label]) => (
            <div className="col-md-6 mb-3" key={key}>
              <label className="form-label">{label}</label>
              <input
                className="form-control"
                name={key}
                value={newCourse[key]}
                onChange={handleInputChange}
              />
            </div>
          ))}

          <div className="col-md-6 mb-3">
            <label className="form-label">Course Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => handleImageUpload(e)}
            />
          </div>
        </div>

        {["faq", "courseObject", "features"].map((field) => (
          <div key={field} className="mb-3">
            <label className="fw-bold text-capitalize">{field}</label>
            {newCourse[field].map((item, i) => (
              <div key={i} className="d-flex gap-2 mb-2">
                {Object.keys(item).map((k) =>
                  k !== "image" ? (
                    <input
                      key={k}
                      placeholder={k}
                      className="form-control"
                      value={item[k]}
                      onChange={(e) => handleNestedChange(e, field, i, k)}
                    />
                  ) : null
                )}
                {field === "features" && (
                  <input type="file" onChange={(e) => handleImageUpload(e, i, "feature")} />
                )}
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeNestedField(field, i)}
                >
                  ❌
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={() =>
                addNestedField(
                  field,
                  Object.fromEntries(Object.keys(newCourse[field][0] || {}).map((k) => [k, ""]))
                )
              }
            >
              + Add {field.slice(0, -1)}
            </button>
          </div>
        ))}

        <div className="form-check mb-2">
          <input
            type="checkbox"
            className="form-check-input"
            checked={newCourse.isPopular}
            onChange={(e) =>
              setNewCourse({ ...newCourse, isPopular: e.target.checked })
            }
          />
          <label className="form-check-label">Popular</label>
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            checked={newCourse.isHighRated}
            onChange={(e) =>
              setNewCourse({ ...newCourse, isHighRated: e.target.checked })
            }
          />
          <label className="form-check-label">High Rated</label>
        </div>

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>

      <h4>Existing Courses</h4>
      <ul className="list-group">
        {courses.map((course) => (
          <li className="list-group-item d-flex justify-content-between" key={course._id}>
            <span>{course.name}</span>
            <div>
              <button className="btn btn-sm btn-info me-2" onClick={() => handleView(course)}>
                View
              </button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(course._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h3>Course Details</h3>
        {viewCourse && <pre>{JSON.stringify(viewCourse, null, 2)}</pre>}
        <button onClick={() => setModalIsOpen(false)} className="btn btn-secondary">
          Close
        </button>
      </Modal>
    </div>
  );
}

export default AdminCourses;
