import React, { useState, useEffect } from 'react';
import { FaEdit, FaArrowLeft, FaTrash, FaSave } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';
import { deleteList, updateList } from '../methods/todoListMethods';

const ListViewer = ({ listData }) => {
  const {
    _id: todoListId,
    title,
    imageUrl: imageUrl,
    color,
    labelId,
    todoItems = [],
  } = listData || {};

  const [items, setItems] = useState(todoItems);
  const [tooltip, setTooltip] = useState({ text: '', visible: false, position: { top: 0, left: 0 } });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleCheckboxChange = (index) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, status: !item.status } : item
    );
    setItems(updatedItems);

    setTooltip({ text: '❗ Please save before exiting', visible: true, position: { top: 10, left: 10 } });
    setTimeout(() => setTooltip({ ...tooltip, visible: false }), 2000);
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

  const showTooltip = (text, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltip({
      text,
      visible: true,
      position: {
        top: rect.bottom + 5,  // Adjusted to remove scroll offset
        left: rect.left + rect.width / 2 - 420,  // Centered below the icon
      },
    });
  };
  
  

  const hideTooltip = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-900 text-white shadow-lg rounded-lg p-6 relative">
      {/* Top Bar with Back, Delete, Edit, and Save Buttons */}
      <div className="flex justify-between items-center mb-4">
        <button className="mr-2" onClick={handleBackClick} onMouseEnter={(e) => showTooltip('Back', e)} onMouseLeave={hideTooltip}>
          <FaArrowLeft className="text-white hover:text-gray-400 text-2xl" />
        </button>
        <div className="flex gap-4 ml-auto">
          <button onClick={handleSaveClick} onMouseEnter={(e) => showTooltip('Save', e)} onMouseLeave={hideTooltip}>
            <FaSave className="text-white hover:text-green-500 text-2xl" />
          </button>
          <button onClick={handleEditClick} onMouseEnter={(e) => showTooltip('Edit', e)} onMouseLeave={hideTooltip}>
            <FaEdit className="text-white hover:text-blue-500 text-2xl" />
          </button>
          <button onClick={handleDeleteClick} onMouseEnter={(e) => showTooltip('Delete', e)} onMouseLeave={hideTooltip}>
            <FaTrash className="text-white hover:text-red-600 text-2xl" />
          </button>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="absolute bg-white text-black text-base px-4 py-2 rounded-lg z-10 shadow-lg"
          style={{ top: `${tooltip.position.top}px`, left: `${tooltip.position.left}px`, transform: 'translateX(-50%)' }}
        >
          {tooltip.text}
        </div>
      )}


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
