import React from "react";
import DataTable from "../../components/home/DataTable";

const Home = () => {
  return (
    <div className="w-full h-[calc(100vh-80px)] flex items-center justify-center bg-gray-900 overflow-auto">
      <DataTable />
    </div>
  );
};

export default Home;
