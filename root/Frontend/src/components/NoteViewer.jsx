import React from 'react';
import { FaEdit, FaArrowLeft } from 'react-icons/fa'; // Icons for edit and delete
import { useNavigate } from 'react-router-dom';
import parse from "html-react-parser";

const NoteViewer = ({ noteData }) => {

  const { title, textContent, label, imageUrl, color, id } = noteData || {};
  const navigate = useNavigate();

  const contentWithCenteredImages = noteData?.textContent
    ? parse(noteData.textContent, {
        replace: (domNode) => {
          if (domNode.name === 'img') {
            domNode.attribs.class = (domNode.attribs.class || '') + ' center-image';
          }
        },
      })
    : <div>No content available.</div>;

  const handleBackClick = () => {
    navigate("/UserNotesAndLists");
  };

  const handleEditClick = () => {
    navigate("/EditNote", { state: { noteData } });
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-900 text-white shadow-lg rounded-lg p-6 relative">
      {/* Top bar with Edit and Delete buttons */}
      <div className="flex justify-between items-center mb-4">
        <button className="mr-2" onClick={handleBackClick}>
          <FaArrowLeft className="text-white hover:text-gray-400 text-xl" />
        </button>
        <button className="ml-auto" onClick={handleEditClick}>
          <FaEdit className="text-white hover:text-gray-400 text-xl" />
        </button>
      </div>

      {/* Optional Image */}
      {imageUrl && (
        <div className="flex justify-center mb-4">
          <img
            src={imageUrl}
            alt="Note related"
            className="w-full h-56 object-cover rounded-md"
          />
        </div>
      )}

      {/* Title */}
      <div className="mb-4">
        <h2 className="text-3xl font-semibold">{title}</h2>
      </div>

      {/* Line between title and content */}
      <hr className="border-gray-400 mb-2" />

      {/* Content */}
      <div className="text-lg leading-relaxed">
        {contentWithCenteredImages}
      </div>
    </div>
  );
};

export default NoteViewer;
