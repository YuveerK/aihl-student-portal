import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import AddStudentModal from "./AddStudentModal";
import { useNavigate, useNavigation } from "react-router-dom";
const DataTable = () => {
  const [students, setStudents] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isAddStudentModalClicked, setIsAddStudentModalClicked] =
    useState(false);
  const limit = 10;
  const navigate = useNavigate();
  useEffect(() => {
    getStudents();
  }, [offset]); // Trigger the effect whenever the offset value changes

  const getStudents = async () => {
    try {
      const response = await axios.get("http://localhost:2000/get-learner", {
        params: { limit: limit, offset: offset },
      });

      setStudents(response.data.data);
      setTotalCount(response.data.total_count);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const getNextData = () => {
    const nextOffset = offset + limit;
    setOffset(nextOffset);
  };

  const getPreviousData = () => {
    const previousOffset = offset - limit;
    setOffset(previousOffset >= 0 ? previousOffset : 0);
  };

  const handleCloseAddStudentModal = async (payload) => {
    setIsAddStudentModalClicked(payload);
    await getStudents();
  };
  return (
    <div className="w-full p-8 h-fit">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center border-b border-b-gray-200 w-fit py-2">
            <div className="flex items-center">
              <AiOutlineSearch size={25} className="mr-4" color="white" />
              <input
                type="text"
                placeholder="Search..."
                className="outline-none bg-gray-900 text-white"
              />
            </div>
          </div>
          <button className="p-2 text-white bg-blue-500 rounded-md ml-8 w-[100px]">
            Search
          </button>
        </div>
        <div>
          <button
            className="p-2 text-white bg-blue-500 rounded-md ml-8 w-[150px]"
            onClick={() => setIsAddStudentModalClicked(true)}
          >
            Add New Student
          </button>
        </div>
      </div>
      <div className=" h-[900px] overflow-x-auto">
        <div className="w-full h-[80px]  flex items-center border-b-2 border-gray-300">
          <div className="w-[16.66%] border-black h-full p-4 flex items-center font-bold text-white ">
            <h1>First Name</h1>
          </div>

          <div className="w-[16.66%] border-black h-full p-4 flex items-center font-bold text-white ">
            <h1>Last Name</h1>
          </div>
          <div className="w-[16.66%] border-black h-full p-4 flex items-center font-bold text-white ">
            <h1>Email</h1>
          </div>
          <div className="w-[16.66%] border-black h-full p-4 flex items-center font-bold text-white ">
            <h1>Primary Contact Number</h1>
          </div>
          <div className="w-[16.66%] border-black h-full p-4 flex items-center font-bold text-white ">
            <h1>Created At</h1>
          </div>
          <div className="w-[16.66%] border-black h-full p-4 flex items-center font-bold text-white ">
            <h1>Action</h1>
          </div>
          <div className="w-[16.66%] border-black h-full p-4 flex items-center font-bold text-white ">
            <h1></h1>
          </div>
        </div>
        {students.map((student, index) => (
          <div className="w-full h-fit border-b border-gray-300 flex items-center hover:bg-gray-800">
            <div className="w-[16.66%] border-black h-full p-4 flex items-center text-white">
              <h1>{student.firstName}</h1>
            </div>
            <div className="w-[16.66%] border-black h-full p-4 flex items-center text-white">
              <h1>{student.surname}</h1>
            </div>
            <div className="w-[16.66%] border-black h-full p-4 flex items-center text-white">
              <h1
                style={{
                  inlineSize: "90%",
                  overflowWrap: "break-word",
                  hyphens: "manual",
                }}
              >
                {student.email}
              </h1>
            </div>

            <div className="w-[16.66%] border-black h-full p-4 flex items-center text-white">
              <h1>{student.primaryContactDetails}</h1>
            </div>
            <div className="w-[16.66%] border-black h-full p-4 flex items-center text-white">
              <h1>{new Date(student.createdAt).toLocaleDateString()}</h1>
            </div>

            <div className="w-[16.66%] border-black h-full p-4 flex items-center text-white">
              <div className="flex items-center">
                <BiEdit size={25} className="mr-4 text-green-500" />
                <RiDeleteBin5Line size={25} className="text-red-500" />
              </div>
            </div>
            <div className="w-[16.66%] border-black h-full p-4 flex items-center text-white">
              <button
                className="p-2 text-white bg-green-500 rounded-md ml-8 w-[100px]"
                onClick={() => navigate("/view-student", { state: student })}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex items-center justify-end pr-8 ">
        <p className="mr-2 text-white">{`${offset + 1} - ${
          offset + students.length
        }`}</p>

        <p className="text-white">of {totalCount}</p>
        <div className="mx-8 flex items-center">
          <div
            className="mr-4 cursor-pointer hover:underline text-white"
            onClick={() => getPreviousData()}
          >
            Previous
          </div>
          <div
            className="cursor-pointer hover:underline text-white"
            onClick={() => getNextData()}
          >
            Next
          </div>
        </div>
      </div>
      {isAddStudentModalClicked && (
        <AddStudentModal
          handleCloseAddStudentModal={handleCloseAddStudentModal}
        />
      )}
    </div>
  );
};

export default DataTable;
