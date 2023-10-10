import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate, useNavigation } from "react-router-dom";

const MainDataTable = ({ url, columns, excludedKeys, buttonTitle }) => {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const width = `${100 / columns.length}%`;
  const [isAddStudentModalClicked, setIsAddStudentModalClicked] =
    useState(false);
  const limit = 10;
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [offset]); // Trigger the effect whenever the offset value changes

  const getData = async () => {
    try {
      const response = await axios.get(url, {
        params: { limit: limit, offset: offset },
      });

      setData(response.data.data);
      setTotalCount(response.data.total_count);
    } catch (error) {
      console.error("Error fetching data:", error);
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
    await getData();
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
          <button className="p-2 text-white bg-blue-500 rounded-md ml-8 w-[150px]">
            Add New Student
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gray-800 text-white">
              {columns.map((column, index) => (
                <th style={{ width: width }} key={index}>
                  {column}
                </th>
              ))}
              <th style={{ width: width }}>Action</th>
              <th style={{ width: width }}></th>
            </tr>
          </thead>
          <tbody>
            {data.map(
              (
                rowData,
                index // Change the name "data" to "rowData" to avoid confusion with the outer "data" array.
              ) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-800 text-white"
                >
                  {Object.keys(rowData)
                    .filter((key) => !excludedKeys.includes(key))
                    .map(
                      (
                        key,
                        dataIndex // Change the name "data" to "rowData" to avoid shadowing.
                      ) => (
                        <td className="w-[16.66%] p-4" key={dataIndex}>
                          {rowData[key]}
                        </td> // Use "rowData[key]" to get the value for each cell.
                      )
                    )}
                  <td className="w-[16.66%] p-4">
                    <div className="flex items-center">
                      <BiEdit size={25} className="mr-4 text-green-500" />
                      <RiDeleteBin5Line size={25} className="text-red-500" />
                    </div>
                  </td>
                  <td className="w-[16.66%] p-4">
                    <button className="p-2 text-white bg-green-500 rounded-md ml-8 w-[100px]">
                      View
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <div className="w-full flex items-center justify-end pr-8">
        <p className="mr-2 text-white">{`${offset + 1} - ${
          offset + data.length
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
    </div>
  );
};

export default MainDataTable;
