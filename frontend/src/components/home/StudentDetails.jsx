import React, { useState } from "react";
import {
  BsPerson,
  BsCalendar,
  BsEnvelope,
  BsBuilding,
  BsFillPersonCheckFill,
} from "react-icons/bs";
import { AiFillPhone, AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import EditStudent from "./EditStudent";
const StudentDetails = ({ selectedStudent }) => {
  const [student, setStudent] = useState(selectedStudent);
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [isEditStudentClicked, setIsEditStudentClicked] = useState(false);

  const handleUpdatedStudent = async (payload) => {
    setStudent(payload);
  };

  const handleCloseEditStudentModal = async (payload) => {
    setIsEditStudentClicked(payload);
  };
  console.log(student);
  return (
    <div className="bg-blue-950 p-8 rounded-md shadow-md container m-auto h-fit overflow-auto ">
      <div className="w-full flex items-center justify-between mb-8">
        <h1 className="text-2xl text-white font-bold mb-4">Student Profile</h1>
        <button
          className="p-2 text-white bg-green-500 rounded-md ml-8 w-[160px]"
          onClick={() => setIsEditStudentClicked(true)}
        >
          Edit Student
        </button>
      </div>

      <div className="flex flex-col md:flex mb-8 justify-between border-b border-gray-300 pb-4">
        <div className=" flex flex-col md:flex-row items-center">
          <img
            src={require("../../images/avatar.jpg")}
            className="w-28 h-28 rounded-full object-cover"
            alt=""
          />

          <div className="flex items-center">
            <p className="font-bold text-2xl ml-[24px] text-white">
              {student.firstName}
            </p>
            {student.middleName && (
              <p className="font-bold  text-2xl ml-2 text-white">
                {student.middleName}
              </p>
            )}
            <p className="font-bold  text-2xl ml-2 text-white">
              {student.surname}
            </p>
          </div>
        </div>
      </div>

      <p className="text-2xl text-white underline mb-4">Details</p>
      <div className="w-full h-[73%]  ">
        <div className="grid grid-cols-2 gap-4 w-[90%]">
          {student.dob && (
            <div>
              <p className="text-gray-400 text-sm flex items-center">
                <BsCalendar className="mr-2" size={15} />
                Date of Birth:
              </p>
              <p className="font-bold  text-white  ml-[24px]">
                {`${new Date(student.dob).getDate()} ${
                  monthsOfYear[new Date(student.dob).getMonth()]
                } ${new Date(student.dob).getFullYear()}`}
              </p>
            </div>
          )}

          {student.email && (
            <div className="">
              <p className="text-gray-400 text-sm flex items-center">
                <BsEnvelope className="mr-2" size={15} />
                Email:
              </p>
              <p className="font-bold  text-white  ml-[24px]">
                {student.email}
              </p>
            </div>
          )}
          {student.idNumber && (
            <div>
              <p className="text-gray-400 text-sm flex items-center">
                <BsBuilding className="mr-2" size={15} />
                ID Number:
              </p>
              <p className="font-bold ml-[24px] text-white">
                {student.idNumber}
              </p>
            </div>
          )}
          {student.passportNumber && (
            <div>
              <p className="text-gray-400 text-sm flex items-center">
                <BsBuilding className="mr-2" size={15} />
                Passport Number:
              </p>
              <p className="font-bold ml-[24px] text-white">
                {student.passportNumber}
              </p>
            </div>
          )}

          {student.primaryContactDetails && (
            <div>
              <p className="text-gray-400 text-sm flex items-center">
                <AiFillPhone className="mr-2" size={15} />
                Primary Contact Details:
              </p>
              <p className="font-bold ml-[24px] text-white">
                {student.primaryContactDetails}
              </p>
            </div>
          )}
          {student.secondaryContactDetails && (
            <div>
              <p className="text-gray-400 text-sm flex items-center">
                <AiFillPhone className="mr-2" size={15} />
                Secondary Contact Details:
              </p>
              <p className="font-bold ml-[24px] text-white">
                {student.secondaryContactDetails}
              </p>
            </div>
          )}

          {student.race && (
            <div>
              <p className="text-gray-400 text-sm flex items-center">
                <AiOutlineUser className="mr-2" size={15} />
                Race:
              </p>
              <p className="font-bold ml-[24px] text-white">{student.race}</p>
            </div>
          )}
          {student.gender && (
            <div>
              <p className="text-gray-400 text-sm flex items-center">
                <AiOutlineUser className="mr-2" size={15} />
                Gender:
              </p>
              <p className="font-bold ml-[24px] text-white">{student.gender}</p>
            </div>
          )}
          {student.age && (
            <div>
              <p className="text-gray-400 text-sm flex items-center">
                <BsCalendar className="mr-2" size={15} />
                Age:
              </p>
              <p className="font-bold ml-[24px] text-white">{student.age}</p>
            </div>
          )}
          {student.youthYesNo && (
            <div>
              <p className="text-gray-400 text-sm flex items-center">
                <BsFillPersonCheckFill className="mr-2" size={15} />
                Youth (Yes/No):
              </p>
              <p className="font-bold ml-[24px] text-white">
                {student.youthYesNo}
              </p>
            </div>
          )}
          {student.disability && (
            <div>
              <p className="text-gray-400 text-sm flex items-center">
                <BsPerson className="mr-2" size={20} />
                Disability:
              </p>
              <p className="font-bold ml-[24px] text-white">
                {student.disability}
              </p>
            </div>
          )}
          {student.citizenship && (
            <div>
              <p className="text-gray-400 text-sm flex items-center">
                <BsBuilding className="mr-2" size={15} />
                Citizenship:
              </p>
              <p className="font-bold ml-[24px] text-white">
                {student.citizenship}
              </p>
            </div>
          )}
          {student.learnerProvince && (
            <div>
              <p className="text-gray-400 text-sm flex items-center">
                <BsBuilding className="mr-2" size={15} />
                Learner Province:
              </p>
              <p className="font-bold ml-[24px] text-white">
                {student.learnerProvince}
              </p>
            </div>
          )}
          {student.learnerDistrictMunicipality && (
            <div>
              <p className="text-gray-400 text-sm flex items-center">
                <BsBuilding className="mr-2" size={15} />
                Learner District Municipality:
              </p>
              <p className="font-bold ml-[24px] text-white">
                {student.learnerDistrictMunicipality}
              </p>
            </div>
          )}
          {student.learnerResidentialArea && (
            <div>
              <p className="text-gray-400 text-sm flex items-center">
                <AiOutlineHome className="mr-2" size={15} />
                Learner Residential Area:
              </p>
              <p className="font-bold ml-[24px] text-white">
                {student.learnerResidentialArea}
              </p>
            </div>
          )}
          {student.ruralUrban && (
            <div>
              <p className="text-gray-400 text-sm flex items-center">
                <BsBuilding className="mr-2" size={15} />
                Rural/Urban:
              </p>
              <p className="font-bold ml-[24px] text-white">
                {student.ruralUrban}
              </p>
            </div>
          )}
        </div>
      </div>
      {isEditStudentClicked && (
        <EditStudent
          student={student}
          handleCloseEditStudentModal={handleCloseEditStudentModal}
          handleUpdatedStudent={handleUpdatedStudent}
        />
      )}
    </div>
  );
};

export default StudentDetails;
