import React from 'react';

const NoteCard = ({ title, content, label, imageUrl }) => {
  return (
    <div className="w-[300px] h-[450px] p-4 bg-[#732333] rounded-lg shadow-lg text-white flex flex-col">
      {imageUrl && (
        <div className="flex-shrink-0 mb-3">
          <img src={imageUrl} alt="Note" className="w-full h-32 object-cover rounded-md" />
        </div>
      )}
      <div className="flex-grow">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <hr className="border-gray-400 mb-2" />
        <p className="text-base overflow-hidden overflow-ellipsis" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: imageUrl ? 4 : 7 }}>
          {content}
        </p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="bg-gray-700 rounded-full px-3 py-1 text-sm">{label}</span>
        <div className="flex gap-2">
          <button className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center">
            🎨 {/* Icon for color */}
          </button>
          <button className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center">
            ✏️ {/* Icon for edit */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
