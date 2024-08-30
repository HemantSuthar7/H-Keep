import React from 'react';

const ListViewer = ({ todoItems, onEdit, onBack }) => {
  return (
    <div className="w-full max-w-1600 px-4 py-6">
      <div className="flex justify-between mb-4">
        <button
          onClick={onBack}
          className="text-blue-500 hover:text-blue-700"
        >
          Back
        </button>
        <button
          onClick={onEdit}
          className="text-blue-500 hover:text-blue-700"
        >
          Edit
        </button>
        <button
          className="text-blue-500 hover:text-blue-700"
        >
          Color Palette
        </button>
      </div>
      <ul className="space-y-4">
        {todoItems.map((todoItem) => (
          <li
            key={todoItem.id}
            className={`flex items-center justify-between ${
              todoItem.status ? 'line-through' : ''
            }`}
          >
            <input
              type="checkbox"
              checked={todoItem.status}
              onChange={() => {
                // Implement logic to update todoItem.status here
              }}
              className="mr-4"
            />
            <span>{todoItem.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListViewer;