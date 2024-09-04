import React, { useState } from 'react';
import { FaEdit, FaArrowLeft, FaTrash, FaSave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { deleteList, updateList } from '../methods/todoListMethods';

const ListViewer = ({ listData }) => {
  const {
    _id: todoListId,
    title,
    imageUrl,
    color,
    labelId,
    todoItems = [],
  } = listData || {};

  const [items, setItems] = useState(todoItems);
  const [showMessage, setShowMessage] = useState(false); // State to control the visibility of the message
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleCheckboxChange = (index) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, status: !item.status } : item
    );
    setItems(updatedItems);
    setShowMessage(true); // Show the message when a checkbox is toggled
  };

  const handleSaveClick = async () => {
    try {
      const formData = new FormData();
      formData.append('todoListId', todoListId);
      formData.append('title', title);
      formData.append('color', color || '');
      formData.append('label', labelId || '');

      items.forEach(item => {
        formData.append('todoItems', JSON.stringify(item));
      });

      if (image) {
        formData.append('image', image);
      } else if (imageUrl) {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        formData.append('image', blob, 'existing-image.jpg');
      }

      await updateList(formData);
      setShowMessage(false); // Hide the message after saving
      navigate("/UserNotesAndLists");
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('An error occurred while saving changes.');
    }
  };

  const handleBackClick = () => {
    navigate("/UserNotesAndLists");
  };

  const handleEditClick = () => {
    navigate("/EditList", { state: { listData } });
  };

  const handleDeleteClick = async () => {
    await deleteList(todoListId);
    navigate("/UserNotesAndLists");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div 
    className="max-w-4xl mx-auto text-white shadow-lg rounded-lg p-6 relative"
    style={{ backgroundColor: color }}
    >
      {/* Top Bar with Back, Delete, Edit, and Save Buttons */}
      <div className="flex justify-between items-center mb-4">
        <button className="mr-2" onClick={handleBackClick}>
          <FaArrowLeft className="text-white hover:text-gray-400 text-2xl" />
        </button>
        <div className="flex gap-4 ml-auto">
          <button onClick={handleSaveClick}>
            <FaSave className="text-white hover:text-green-500 text-2xl" />
          </button>
          <button onClick={handleEditClick}>
            <FaEdit className="text-white hover:text-blue-500 text-2xl" />
          </button>
          <button onClick={handleDeleteClick}>
            <FaTrash className="text-white hover:text-red-600 text-2xl" />
          </button>
        </div>
      </div>

      {/* Warning Message Div */}
      {showMessage && (
        <div className="bg-yellow-500 text-black text-center py-2 mb-4 rounded-lg">
          ❗ Please save before exiting
        </div>
      )}

      {/* Image */}
      {imageUrl && (
        <div className="mb-4 flex justify-center">
          <img
            src={imageUrl}
            alt="Note related"
            className="w-9/12 h-auto object-cover rounded-xl mx-auto"
          />
        </div>
      )}

      {/* Title */}
      <div className="mb-4">
        <h2 className="text-4xl font-semibold">{title}</h2>
      </div>

      <hr className="border-gray-400 mb-2" />

      {/* Todo Items */}
      <ul className="space-y-3 todo-items-container">
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
