import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import StudentDetails from "../../components/home/StudentDetails";
import Documents from "../../components/home/Documents";

const ViewStudent = () => {
  const [tabSelection, setTabSelection] = useState("Student Details");
  const location = useLocation();
  const student = location.state;
  console.log(student);
  return (
    <div className="w-full h-[calc(100vh-80px)] bg-gray-900 overflow-auto">
      <div className="w-full h-fit flex justify-around p-8 border-b border-gray-500">
        <div
          className={`${
            tabSelection === "Student Details"
              ? "p-2 bg-blue-900 text-white rounded-md cursor-pointer"
              : "p-2 hover:bg-blue-900 text-white rounded-md cursor-pointer"
          }`}
          onClick={() => setTabSelection("Student Details")}
        >
          <h1 className="text-3xl text-white">Student Details</h1>
        </div>
        <div
          className={`${
            tabSelection === "Documents"
              ? "p-2 bg-blue-900 text-white rounded-md cursor-pointer"
              : "p-2 hover:bg-blue-900 text-white rounded-md cursor-pointer"
          }`}
          onClick={() => setTabSelection("Documents")}
        >
          <h1 className="text-3xl text-white">Documents</h1>
        </div>
        <div
          className={`${
            tabSelection === "Courses"
              ? "p-2 bg-blue-900 text-white rounded-md cursor-pointer"
              : "p-2 hover:bg-blue-900 text-white rounded-md cursor-pointer"
          }`}
          onClick={() => setTabSelection("Courses")}
        >
          <h1 className="text-3xl text-white">Courses</h1>
        </div>
      </div>
      {tabSelection === "Student Details" && (
        <div className="p-8">
          <StudentDetails selectedStudent={student} />
        </div>
      )}
      {tabSelection === "Documents" && (
        <div className="p-8">
          <Documents learnerId={student.learnerId} />
        </div>
      )}
      {/* {tabSelection === "Student Details" && (
        <div className="p-8">
          <StudentDetails selectedStudent={student} />
        </div>
      )} */}
    </div>
  );
};

export default ViewStudent;
