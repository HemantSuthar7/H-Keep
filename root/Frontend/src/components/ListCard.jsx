import React from 'react';

const ListCard = ({ title, todoItems, label, imageUrl }) => {
  const maxItems = imageUrl ? 4 : 7; // Adjust number of items based on image presence
  const displayedItems = todoItems.slice(0, maxItems);

  return (
    <div className="w-[300px] h-[450px] p-4 bg-[#20605D] rounded-lg shadow-lg text-white flex flex-col">
      {imageUrl && (
        <div className="flex-shrink-0 mb-3">
          <img src={imageUrl} alt="List" className="w-full h-32 object-cover rounded-md" />
        </div>
      )}
      <div className="flex-grow">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <hr className="border-gray-400 mb-2" />
        <ul>
          {displayedItems.map((item, index) => (
            <li key={index} className="flex items-center mb-1 overflow-hidden">
              <input
                type="checkbox"
                checked={item.status}
                readOnly
                className="mr-2 bg-white border-gray-400 cursor-not-allowed"
              />
              <span className="text-base overflow-hidden overflow-ellipsis" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 1 }}>
                {item.value}
              </span>
            </li>
          ))}
        </ul>
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

export default ListCard;
