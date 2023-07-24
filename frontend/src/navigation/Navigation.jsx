import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Home from "../pages/Home/Home";
import ViewStudent from "../pages/Home/ViewStudent";

const Navigation = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/view-student" exact element={<ViewStudent />} />
        </Routes>
      </div>
    </div>
  );
};

export default Navigation;
