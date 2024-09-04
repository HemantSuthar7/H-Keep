import React from 'react';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import {deleteNote} from "../methods/noteMethods.js"


const NoteCard = ({ title, textContent, label, imageUrl, color, id }) => {
  const navigate = useNavigate();
  const noteData = { title, textContent, label, imageUrl, color, id };

  // Function to filter out images from the parsed HTML content
  const removeImages = (domNode) => {
    if (domNode.name === 'img') {
      return null; // Exclude images
    }
  };

  const handleClick = () => {
    navigate("/Note", { state : {noteData} });
  };

  const handleEditClick = (e) => {
    e.stopPropagation(); // Prevent event propagation to the parent div
    navigate("/EditNote", { state: { noteData } });
  };

  const handleDeleteClick = async () => {
    await deleteNote(id);
    navigate("/UserNotesAndLists");
  };

  return (
    <div 
      className="w-[300px] h-[450px] p-4 rounded-lg shadow-lg text-white flex flex-col mx-3 my-3" 
      onClick={handleClick}
      style={{ backgroundColor: color }} // Set background color dynamically
    >
      {imageUrl && (
        <div className="flex-shrink-0 mb-3">
          <img src={imageUrl} alt="Note" className="w-full h-32 object-cover rounded-md" />
        </div>
      )}
      <div className="flex-grow">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <hr className="border-gray-400 mb-2" />
        <div className="text-base overflow-hidden overflow-ellipsis" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: imageUrl ? 7 : 12 }}>
          {parse(textContent, { replace: removeImages })} 
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span 
          className="bg-white rounded-full px-3 py-1 text-sm text-black hover:bg-gray-500 font-medium"
          onClick={(e) => e.stopPropagation()} // Prevent event propagation to the parent div
        >
          {label}
        </span>
        <div className="flex gap-2">
          <button 
            className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center hover:bg-zinc-400"
            onClick={handleEditClick}
          >
             <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#000000"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg> {/* Icon for edit */}
          </button>
          <button 
            className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700"
            onClick={handleDeleteClick}
          >
             <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#000000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg> {/* Icon for edit */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
