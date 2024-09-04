import React from 'react';
import { FaEdit, FaArrowLeft, FaTrash } from 'react-icons/fa'; // Import FaTrash for delete icon
import { useNavigate } from 'react-router-dom';
import parse from "html-react-parser";
import {deleteNote} from "../methods/noteMethods.js"

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

  const handleDeleteClick = async () => {
    await deleteNote(id);
    navigate("/UserNotesAndLists");
  };

  return (
    <div className="max-w-xl mx-auto bg-gray-900 text-white shadow-lg rounded-lg p-6 relative">
      {/* Top bar with Back, Delete, and Edit buttons */}
      <div className="flex justify-between items-center mb-4">
        <button className="mr-2" onClick={handleBackClick}>
          <FaArrowLeft className="text-white hover:text-gray-400 text-2xl" />
        </button>
        <div className="flex gap-4 ml-auto">
          <button onClick={handleDeleteClick}>
            <FaTrash className="text-white hover:text-red-600 text-2xl" />
          </button>
          <button onClick={handleEditClick}>
            <FaEdit className="text-white hover:text-green-500 text-2xl" />
          </button>
        </div>
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
