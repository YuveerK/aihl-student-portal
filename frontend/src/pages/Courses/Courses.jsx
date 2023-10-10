import React, { useState } from "react";
import MainDataTable from "../../components/courses/MainDataTable";

const Courses = () => {
  return (
    <div className="w-full h-[calc(100vh-80px)] flex items-center justify-center bg-gray-900 overflow-auto">
      <MainDataTable
        columns={[
          "Course Id",
          "Course Name",
          "Course Duration",
          "Course StartDate",
          "Course EndDate",
          "Course Capacity",
          "Created At",
        ]}
        url={"http://localhost:2000/courses"}
        excludedKeys={["courseDescription", "updatedAt"]}
        buttonTitle={"Add New Course"}
      />
    </div>
  );
};

export default Courses;
