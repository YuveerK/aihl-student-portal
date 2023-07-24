import React, { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const [selectedMenu, setSelectedMenu] = useState("Home");
  return (
    <div className=" w-fit md:w-72 p-4 text-white bg-blue-950 overflow-auto">
      <p className="text-base text-gray-300">Main</p>

      <div className=" mt-4">
        <Link
          to={"/"}
          className={`${
            selectedMenu === "Home"
              ? "flex items-center mt-4 bg-blue-500 text-white p-2 rounded-md cursor-pointer"
              : "flex items-center mt-4 hover:bg-blue-500 hover:text-white p-2 rounded-md cursor-pointer"
          }`}
          onClick={() => setSelectedMenu("Home")}
        >
          <AiOutlineHome size={30} color="white" className="mr-2" />
          <p className="hidden md:block text-xl">Home</p>
        </Link>
        <Link
          to={"/profile"}
          className={`${
            selectedMenu === "Profile"
              ? "flex items-center mt-4 bg-blue-500 text-white p-2 rounded-md cursor-pointer"
              : "flex items-center mt-4 hover:bg-blue-500 hover:text-white p-2 rounded-md cursor-pointer"
          }`}
          onClick={() => setSelectedMenu("Profile")}
        >
          <FiUsers size={30} color="white" className="mr-2" />
          <p className="hidden md:block text-xl  ">Profile</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
