import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import AddDocumentModal from "./AddDocumentModal";
import EditDocumentModal from "./EditDocumentModal";
const Documents = ({ learnerId }) => {
  const [documents, setDocuments] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isAddDocumentModalClicked, setIsAddDocumentModalClicked] =
    useState(false);
  const [isUpdateDocumentModalClicked, setIsUpdateDocumentModalClicked] =
    useState(false);
  const limit = 10;
  const [selectedDocument, setSelectedDocument] = useState({});

  useEffect(() => {
    getDocuments();
  }, [offset]); // Trigger the effect whenever the offset value changes

  const getDocuments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2000/files/${learnerId}`,
        {
          params: { limit: limit, offset: offset },
        }
      );
      console.log(response.data.data);
      setDocuments(response.data.data);
      setTotalCount(response.data.total_count);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const getNextData = () => {
    const nextOffset = offset - limit;
    setOffset(nextOffset >= 0 ? nextOffset : 0);
  };

  const getPreviousData = () => {
    const previousOffset = offset - limit;
    setOffset(previousOffset >= 0 ? previousOffset : 0);
  };

  const handleCloseAddDocumentModal = async (payload) => {
    setIsAddDocumentModalClicked(payload);
    await getDocuments();
  };
  const handleCloseUpdateDocumentModal = async (payload) => {
    setIsUpdateDocumentModalClicked(payload);
    await getDocuments();
  };

  const updateDocument = (document) => {
    setSelectedDocument({ document: document });
    setIsUpdateDocumentModalClicked(true);
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
            className="p-2 text-white bg-blue-500 rounded-md ml-8 w-[180px]"
            onClick={() => setIsAddDocumentModalClicked(true)}
          >
            Add New Document
          </button>
        </div>
      </div>
      <div className=" h-[800px] overflow-x-auto">
        <div className="w-full h-[80px]  flex items-center border-b-2 border-gray-300">
          <div className="w-[20%] border-black h-full p-4 flex items-center font-bold text-white ">
            <h1>Document Name</h1>
          </div>

          <div className="w-[20%] border-black h-full p-4 flex items-center font-bold text-white ">
            <h1>Category</h1>
          </div>

          <div className="w-[20%] border-black h-full p-4 flex items-center font-bold text-white ">
            <h1>Created At</h1>
          </div>
          <div className="w-[20%] border-black h-full p-4 flex items-center font-bold text-white ">
            <h1>Action</h1>
          </div>
          <div className="w-[20%] border-black h-full p-4 flex items-center font-bold text-white ">
            <h1></h1>
          </div>
        </div>
        {documents.map((document, index) => (
          <div
            className="w-full h-fit border-b border-gray-300 flex items-center hover:bg-gray-800"
            key={index}
          >
            <div className="w-[20%] border-black h-full p-4 flex items-center text-white">
              <h1>{document.documentName}</h1>
            </div>
            <div className="w-[20%] border-black h-full p-4 flex items-center text-white">
              <h1>{document.category}</h1>
            </div>

            <div className="w-[20%] border-black h-full p-4 flex items-center text-white">
              <h1>{new Date(document.createdAt).toLocaleDateString()}</h1>
            </div>

            <div className="w-[20%] border-black h-full p-4 flex items-center text-white">
              <div className="flex items-center">
                <div onClick={() => updateDocument(document, learnerId)}>
                  <BiEdit size={25} className="mr-4 text-green-500" />
                </div>
                <RiDeleteBin5Line size={25} className="text-red-500" />
              </div>
            </div>
            <div className="w-[20%] border-black h-full p-4 flex items-center text-white">
              <button className="p-2 text-white bg-green-500 rounded-md ml-8 w-[100px]">
                <a
                  href={`http://localhost:2000/${document.documentPath}`}
                  download
                  target="_blank"
                >
                  Download
                </a>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex items-center justify-end pr-8 ">
        <p className="mr-2 text-white">{`${offset + 1} - ${
          offset + documents.length
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
      {isAddDocumentModalClicked && (
        <AddDocumentModal
          handleCloseAddDocumentModal={handleCloseAddDocumentModal}
          learnerId={learnerId}
        />
      )}

      {isUpdateDocumentModalClicked && (
        <EditDocumentModal
          handleCloseUpdateDocumentModal={handleCloseUpdateDocumentModal}
          learnerId={learnerId}
          document={selectedDocument}
        />
      )}
    </div>
  );
};

export default Documents;
