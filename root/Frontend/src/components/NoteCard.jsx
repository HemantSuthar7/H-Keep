import React from 'react';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';

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
          className="bg-gray-700 rounded-full px-3 py-1 text-sm"
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
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
