import React, { useState } from "react";
import MainDataTable from "./MainDataTable";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const AddCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [courseStartDate, setCourseStartDate] = useState("");
  const [courseEndDate, setCourseEndDate] = useState("");
  const [courseCapacity, setCourseCapacity] = useState("");

  const handleAddCourse = () => {
    // Create a new course object with the form data
    const newCourse = {
      courseName,
      courseDescription,
      courseDuration,
      courseStartDate,
      courseEndDate,
      courseCapacity,
    };

    // Make a POST request to the /courses endpoint
    axios
      .post("http://localhost:2000/courses", newCourse)
      .then((response) => {
        console.log(response.data); // Response from the server after adding the course
        // Clear the form after adding the course
        setCourseName("");
        setCourseDescription("");
        setCourseDuration("");
        setCourseStartDate("");
        setCourseEndDate("");
        setCourseCapacity("");
      })
      .catch((error) => {
        console.error("Error adding course:", error);
        // Handle error, display error message, etc.
      });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900">
      <div className="container mx-auto bg-blue-800 p-8 rounded shadow-md">
        <div className="mb-4">
          <label
            htmlFor="courseName"
            className="block text-white font-semibold"
          >
            Course Name:
          </label>
          <input
            className="input_styles"
            type="text"
            id="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="courseDescription"
            className="block text-white font-semibold"
          >
            Course Description:
          </label>
          <ReactQuill
            theme="snow"
            value={courseDescription}
            onChange={setCourseDescription}
            className=" w-full h-[500px]  mb-[60px] bg-white"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="courseDuration"
            className="block text-white font-semibold"
          >
            Course Duration:
          </label>
          <input
            className="input_styles"
            type="text"
            id="courseDuration"
            value={courseDuration}
            onChange={(e) => setCourseDuration(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="courseStartDate"
            className="block text-white font-semibold"
          >
            Course Start Date:
          </label>
          <input
            className="input_styles"
            type="date"
            id="courseStartDate"
            value={courseStartDate}
            onChange={(e) => setCourseStartDate(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="courseEndDate"
            className="block text-white font-semibold"
          >
            Course End Date:
          </label>
          <input
            className="input_styles"
            type="date"
            id="courseEndDate"
            value={courseEndDate}
            onChange={(e) => setCourseEndDate(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="courseCapacity"
            className="block text-white font-semibold"
          >
            Course Capacity:
          </label>
          <input
            className="input_styles"
            type="text"
            id="courseCapacity"
            value={courseCapacity}
            onChange={(e) => setCourseCapacity(e.target.value)}
          />
        </div>

        <button
          className="button_styles bg-green-500 text-white py-2 px-4 rounded"
          onClick={handleAddCourse}
        >
          Add Course
        </button>
      </div>
    </div>
  );
};

export default AddCourse;
