import React, { useState } from 'react';
import { FaEdit, FaArrowLeft, FaTrash } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';
import { deleteList } from '../methods/todoListMethods';

const ListViewer = ({ listData }) => {
  const { title, imageUrl, todoItems = [], _id } = listData || {};

  // State to handle checkbox changes
  const [items, setItems] = useState(todoItems);
  const navigate = useNavigate();

  const handleCheckboxChange = (index) => {
    const updatedItems = items.map((item, i) => 
      i === index ? { ...item, status: !item.status } : item
    );
    setItems(updatedItems);
  };

  const handleBackClick = () => {
    navigate("/UserNotesAndLists");
  };

  const handleEditClick = () => {
    navigate("/EditList", { state: { listData } });
  };

  const handleDeleteClick = async () => {
    await deleteList(_id);
    navigate("/UserNotesAndLists");
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-900 text-white shadow-lg rounded-lg p-6 relative">
      {/* Top Bar with Back, Delete, and Edit Buttons */}
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

      {/* Image */}
      {imageUrl && (
        <div className="mb-4">
          <img
            src={imageUrl}
            alt="todo-related"
            className="w-full h-56 object-cover rounded-md"
          />
        </div>
      )}

      {/* Title */}
      <div className="mb-4">
        <h2 className="text-3xl font-semibold">{title}</h2>
      </div>

      <hr className="border-gray-400 mb-2" />

      {/* Todo Items */}
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <input
              type="checkbox"
              checked={item.status}
              onChange={() => handleCheckboxChange(index)}
              className="mr-3 h-5 w-5 text-blue-500 bg-gray-800 border-gray-700 focus:ring-blue-600 rounded"
            />
            <span
              className={`text-lg ${item.status ? 'line-through text-gray-500' : ''}`}
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
