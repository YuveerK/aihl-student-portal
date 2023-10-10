import axios from "axios";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const AddDocumentModal = ({ handleCloseAddDocumentModal, learnerId }) => {
  const [documentName, setDocumentName] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [formError, setFormError] = useState("");

  const handleAddDocument = async (e) => {
    e.preventDefault();
    if (!documentName || !category || !file) {
      setFormError("Please fill in all the required fields.");
    } else {
      setFormError("");

      // Create a FormData object to send the file and other data
      const formData = new FormData();
      formData.append("learnerId", learnerId);
      formData.append("documentName", documentName);
      formData.append("category", category);
      formData.append("file", file);

      try {
        // Send the form data to the backend to handle the file upload
        await axios.post("http://localhost:2000/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // File uploaded successfully, you can handle success actions here
        console.log("File uploaded successfully!");

        // Close the modal after successful upload
        handleCloseAddDocumentModal(false);
      } catch (error) {
        console.error("Error uploading file:", error);
        setFormError("Error uploading file. Please try again later.");
      }
    }
  };

  return (
    <div className="w-full h-screen absolute top-0 left-0 bg-black/50 flex items-center justify-center">
      <form className="w-[800px] h-auto overflow-auto bg-blue-950 p-8 rounded-md">
        <div className="w-full flex items-center justify-end">
          <div onClick={() => handleCloseAddDocumentModal(false)}>
            <AiOutlineClose
              size={25}
              color="white"
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="w-full flex items-center">
          <div className="w-full flex flex-col m-2">
            <label className="text-white">Document Name</label>
            <input
              type="text"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              className="input_styles"
              required
            />
          </div>
          <div className="w-full flex flex-col m-2">
            <label className="text-white">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input_styles"
              required
            >
              <option value="">Select Category</option>
              <option value="ID">ID</option>
              <option value="Passport">Passport</option>
              <option value="CETA Forms">CETA Forms</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="w-full flex items-center">
          <div className="w-full flex flex-col m-2">
            <label className="text-white">File Upload</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="text-white"
              required
            />
          </div>
        </div>

        {/* Display form error, if any */}
        {formError && (
          <div className="w-full flex items-center justify-center text-red-500 mb-4">
            {formError}
          </div>
        )}

        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="bg-white rounded-md px-6 py-2 mt-4 text-blue-950 font-semibold hover:bg-gray-200 transition-colors"
            onClick={handleAddDocument}
          >
            Upload Document
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDocumentModal;
