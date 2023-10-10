import React from "react";
import { useLocation } from "react-router-dom";

const ViewCourse = () => {
  const location = useLocation();
  const course = location.state;
  return (
    <div className="w-full h-[calc(100vh-80px)] flex items-center justify-center bg-gray-900">
      <div className="container m-auto">
        <div
          className="text-white"
          dangerouslySetInnerHTML={{ __html: course.courseDescription }}
        />
      </div>
    </div>
  );
};

export default ViewCourse;
