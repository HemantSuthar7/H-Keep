import React from 'react';
import { FaEdit, FaArrowLeft } from 'react-icons/fa'; // Icons for edit and back

const ListViewer = ({ title, imageSrc, todoItems }) => {
  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-4 relative">
      {/* Top Bar with Back, Color Icon, and Edit Button */}
      <div className="flex justify-start items-center mb-2">
        <button className="mr-2">
          <FaArrowLeft className="text-gray-700 hover:text-gray-900" />
        </button>
        <div className="h-4 w-4 bg-blue-500 rounded-full mr-2"></div> {/* Color Icon */}
        <button className="ml-auto">
          <FaEdit className="text-gray-700 hover:text-gray-900" />
        </button>
      </div>

      {/* Title */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        {imageSrc && (
          <img
            src={imageSrc}
            alt="todo-related"
            className="h-10 w-10 object-cover rounded"
          />
        )}
      </div>

      {/* Line between title and todo items */}
      <hr className="border-gray-300 mb-4" />

      {/* Todo Items */}
      <ul className="space-y-3">
        {todoItems.map((item, index) => (
          <li key={index} className="flex items-center">
            <input
              type="checkbox"
              checked={item.status}
              className="mr-3 h-4 w-4"
              readOnly
            />
            <span
              className={`text-lg ${item.status ? 'line-through text-gray-500' : ''
                }`}
            >
              {item.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListViewer;
