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
            className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center"
            onClick={handleEditClick}
          >
            ✏️ {/* Icon for edit */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
