import React from "react";
import DataTable from "../../components/students/DataTable";

const Students = () => {
  return (
    <div className="w-full h-[calc(100vh-80px)] flex items-center justify-center bg-gray-900 overflow-auto">
      <DataTable />
    </div>
  );
};

export default Students;
