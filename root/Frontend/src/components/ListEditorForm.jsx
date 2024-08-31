import React, { useState } from 'react';

const ListEditorForm = ({ existingListData }) => {
  const [todoItems, setTodoItems] = useState(existingListData?.items || [{ value: '', status: false }]);
  const [image, setImage] = useState(existingListData?.image || null);
  const [color, setColor] = useState(existingListData?.color || '');
  const [label, setLabel] = useState(existingListData?.label || '');

  const handleInputChange = (index, event) => {
    const newTodoItems = [...todoItems];
    newTodoItems[index].value = event.target.value;
    setTodoItems(newTodoItems);
  };

  const addTodoItem = () => {
    setTodoItems([...todoItems, { value: '', status: false }]);
  };

  const removeTodoItem = (index) => {
    const newTodoItems = todoItems.filter((_, i) => i !== index);
    setTodoItems(newTodoItems);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = () => {
    // Handle form submission
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-2"
        />
        {image && (
          <div className="mb-2">
            <img src={URL.createObjectURL(image)} alt="Selected" className="max-h-40" />
          </div>
        )}
        {todoItems.map((item, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={item.value}
              onChange={(e) => handleInputChange(index, e)}
              maxLength="200"
              className="flex-grow p-2 border rounded-md"
              placeholder="Enter todo item"
            />
            <button onClick={() => addTodoItem()} className="ml-2 p-2 bg-green-500 text-white rounded">
              Add
            </button>
            <button onClick={() => removeTodoItem(index)} className="ml-2 p-2 bg-red-500 text-white rounded">
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <label>Color</label>
        <select
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="block p-2 mt-1 border rounded-md"
        >
          <option value="">Select Color</option>
          {/* Add color options here */}
        </select>
      </div>

      <div className="mb-4">
        <label>Label</label>
        <select
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="block p-2 mt-1 border rounded-md"
        >
          <option value="">Select Label</option>
          {/* Add label options here */}
        </select>
      </div>

      <div>
        {existingListData ? (
          <button onClick={handleSubmit} className="w-full p-2 bg-green-600 text-white rounded">
            Update List
          </button>
        ) : (
          <button onClick={handleSubmit} className="w-full p-2 bg-blue-600 text-white rounded">
            Create List
          </button>
        )}
      </div>
    </div>
  );
};

export default ListEditorForm;
