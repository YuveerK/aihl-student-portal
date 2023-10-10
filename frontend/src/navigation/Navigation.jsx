import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Home from "../pages/Home/Home";
import ViewStudent from "../pages/Home/ViewStudent";
import Courses from "../pages/Courses/Courses";
import Students from "../pages/Students/Students";
import ViewCourse from "../pages/Courses/ViewCourse";

const Navigation = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/view-student" exact element={<ViewStudent />} />
          <Route path="/courses" exact element={<Courses />} />
          <Route path="/view-course" exact element={<ViewCourse />} />
          <Route path="/students" exact element={<Students />} />
        </Routes>
      </div>
    </div>
  );
};

export default Navigation;
