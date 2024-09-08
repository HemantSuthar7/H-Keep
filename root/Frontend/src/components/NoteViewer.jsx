import React from 'react';
import { FaEdit, FaArrowLeft, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import parse from "html-react-parser";
import { deleteNote } from "../methods/noteMethods.js";

const NoteViewer = ({ noteData }) => {
  const { title, textContent, label, imageUrl, color, id } = noteData || {};
  const navigate = useNavigate();

  const contentWithCenteredImages = noteData?.textContent
    ? parse(noteData.textContent, {
        replace: (domNode) => {
          if (domNode.name === 'img') {
            // Apply class for centering and rounding images
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
    <div className="p-4"> {/* Added margin via padding */}
      <div
        className="max-w-4xl mx-auto text-white shadow-2xl shadow-black rounded-lg p-6 relative"
        style={{ backgroundColor: color }}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          .center-image {
            display: block;
            margin-left: auto;
            margin-right: auto;
            max-width: 100%;
            border-radius: 10px; /* Round the images */
          }
        ` }} />

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
          <div className="mb-4 flex justify-center">
            <img
              src={imageUrl}
              alt="Note related"
              className="w-9/12 h-auto object-cover rounded-xl mx-auto shadow-lg shadow-black"
            />
          </div>
        )}

        {/* Title */}
        <div className="mb-4">
          <h2 className="text-4xl font-semibold">{title}</h2>
        </div>

        {/* Line between title and content */}
        <hr className="border-gray-400 mb-2" />

        {/* Content */}
        <div className="text-lg leading-relaxed">
          {contentWithCenteredImages}
        </div>
      </div>
    </div>
  );
};

export default NoteViewer;
