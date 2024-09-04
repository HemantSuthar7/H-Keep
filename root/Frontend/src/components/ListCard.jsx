import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for type checking
import { useNavigate } from 'react-router-dom';

const ListCard = ({ title, todoItems = [], label, imageUrl, _id, color }) => { // Added color prop
  const maxItems = imageUrl ? 7 : 12; // Adjust number of items based on image presence
  const displayedItems = todoItems.slice(0, maxItems);
  const navigate = useNavigate();
  const listData = { title, todoItems, label, imageUrl, _id, color }; // Added color to listData

  const handleEditClick = (e) => {
    e.stopPropagation(); // Prevent event propagation to the parent div
    navigate("/EditList", { state: { listData } });
  };

  const handleClick = () => {
    navigate("/List", { state: { listData } });
  };

  return (
    <div 
      className="w-[300px] h-[450px] p-4 rounded-lg shadow-lg text-white flex flex-col mx-3 my-3"
      onClick={handleClick}
      style={{ backgroundColor: color }} // Set background color dynamically
    >
      {imageUrl && (
        <div className="flex-shrink-0 mb-3">
          <img src={imageUrl} alt="List" className="w-full h-32 object-cover rounded-md" />
        </div>
      )}
      <div className="flex-grow">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
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
        <span 
          className="bg-gray-700 rounded-full px-3 py-1 text-sm"
          onClick={(e) => e.stopPropagation()} // Prevent click propagation for label
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

// Adding PropTypes to validate props
ListCard.propTypes = {
  title: PropTypes.string.isRequired,
  todoItems: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      status: PropTypes.bool.isRequired,
    })
  ),
  label: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  color: PropTypes.string.isRequired, // Color prop validation
};

export default ListCard;
