import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for type checking
import { useNavigate } from 'react-router-dom';
import { deleteList } from '../methods/todoListMethods';


const ListCard = ({ title, todoItems = [], labelName, imageUrl, _id, color, labelId }) => { 
  const maxItems = imageUrl ? 6 : 11; 
  const displayedItems = todoItems.slice(0, maxItems);
  const navigate = useNavigate();
  const listData = { title, todoItems, labelName, imageUrl, _id, color, labelId };

  const handleEditClick = (e) => {
    e.stopPropagation(); 
    navigate("/EditList", { state: { listData } });
  };

  const handleDeleteClick = async () => {
    await deleteList(_id);
    navigate("/UserNotesAndLists");
  };

  const handleClick = () => {
    navigate("/List", { state: { listData } });
  };

  const handleLabelClick = (e) => {
    e.stopPropagation();
    navigate("/LabelDataViewer", { state: { labelId, labelName } });
  };

  return (
    <div 
      className="w-[300px] h-[450px] p-4 rounded-lg shadow-xl text-white flex flex-col mx-3 my-3 sm:w-[250px] sm:h-[400px] md:w-[280px] md:h-[420px] transition-all duration-300 shadow-black" 
      onClick={handleClick}
      style={{ backgroundColor: color }}
    >
      {imageUrl && (
        <div className="flex-shrink-0 mb-3">
          <img src={imageUrl} alt="List" className="w-full h-32 object-cover rounded-md 
                        md:h-28 sm:h-24" />
        </div>
      )}
      <div className="flex-grow">
        <h2 className="text-2xl font-semibold mb-2 sm:text-xl md:text-2xl">{title}</h2>
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
              <span 
                className={`text-base overflow-hidden overflow-ellipsis 
                            ${item.status ? 'line-through text-gray-500' : ''} 
                            md:text-sm sm:text-xs`} 
                style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 1 }}
              >
                {item.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between items-center mt-3">
      <span
        className="bg-white rounded-full px-4 py-2 text-sm text-black hover:bg-gray-500 font-medium flex items-center gap-2 cursor-pointer sm:text-xs"
        onClick={handleLabelClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#000000">
          <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h440q19 0 36 8.5t28 23.5l216 288-216 288q-11 15-28 23.5t-36 8.5H160Zm0-80h440l180-240-180-240H160v480Zm220-240Z"/>
        </svg>

        {labelName}
      </span>
        <div className="flex gap-2">
          <button 
            className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center hover:bg-zinc-400
                       md:w-7 md:h-7 sm:w-6 sm:h-6"
            onClick={handleEditClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#000000">
              <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
            </svg>
          </button>
          <button 
            className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700
                       md:w-7 md:h-7 sm:w-6 sm:h-6"
            onClick={handleDeleteClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#000000">
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
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
  labelName: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  color: PropTypes.string.isRequired,
};

export default ListCard;
