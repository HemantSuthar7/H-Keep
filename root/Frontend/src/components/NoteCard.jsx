import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoteCard = ({ title, textContent, label, imageUrl, color, id }) => {

  const navigate = useNavigate();
  const noteData = { title, textContent, label, imageUrl, color, id };

  const handleClick = () => {
    navigate("/Note", { state : {noteData} })
  };

  const handleEditClick = (e) => {
    e.stopPropagation(); // Prevent event propagation to the parent div
    navigate("/EditNote", { state: { noteData } });
  };

  return (
    <div 
      className="w-[300px] h-[450px] p-4 bg-[#732333] rounded-lg shadow-lg text-white flex flex-col" 
      onClick={handleClick}
    >
      {imageUrl && (
        <div className="flex-shrink-0 mb-3">
          <img src={imageUrl} alt="Note" className="w-full h-32 object-cover rounded-md" />
        </div>
      )}
      <div className="flex-grow">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <hr className="border-gray-400 mb-2" />
        <p className="text-base overflow-hidden overflow-ellipsis" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: imageUrl ? 4 : 7 }}>
          {textContent}
        </p>
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
