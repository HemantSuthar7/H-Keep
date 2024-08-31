import React, { useState } from 'react';

const LabelEditor = ({ labels, onSave, onDelete, onAddNew }) => {
  const [editingLabel, setEditingLabel] = useState(null);
  const [newLabel, setNewLabel] = useState('');
  const [newLabelMode, setNewLabelMode] = useState(false);
  const [backgroundBlurred, setBackgroundBlurred] = useState(true);

  const handleSave = (labelId, newLabelValue) => {
    onSave(labelId, newLabelValue);
    setEditingLabel(null);
  };

  const handleDelete = (labelId) => {
    onDelete(labelId);
    setEditingLabel(null);
  };

  const handleAddNew = () => {
    onAddNew(newLabel);
    setNewLabel('');
    setNewLabelMode(false);
  };

  const handleBlur = () => {
    setBackgroundBlurred(false);
  };

  const handleFocus = () => {
    setBackgroundBlurred(true);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex justify-center items-center ${backgroundBlurred ? 'backdrop-blur-sm' : ''
        } z-50`}
    >
      <div className="bg-gray-800 text-white p-4 rounded-lg w-96 shadow-lg">
        <h2 className="text-lg mb-4">Edit Labels</h2>

        {newLabelMode ? (
          <div className="flex items-center mb-2">
            <input
              type="text"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              className="flex-grow p-2 bg-gray-700 border-none rounded"
              placeholder="Enter label name"
              onBlur={handleBlur}
              onFocus={handleFocus}
            />
            <button
              onClick={handleAddNew}
              className="ml-2 p-2 bg-green-600 rounded hover:bg-green-500"
            >
              Add
            </button>
          </div>
        ) : (
          <button
            onClick={() => setNewLabelMode(true)}
            className="w-full p-2 bg-gray-700 rounded hover:bg-gray-600 mb-4"
          >
            + Create new label
          </button>
        )}

        <div>
          {labels.map((label) =>
            editingLabel === label.id ? (
              <div key={label.id} className="flex items-center mb-2">
                <input
                  type="text"
                  value={label.name}
                  onChange={(e) =>
                    setEditingLabel({ ...label, name: e.target.value })
                  }
                  className="flex-grow p-2 bg-gray-700 border-none rounded"
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                />
                <button
                  onClick={() => handleSave(label.id, editingLabel.name)}
                  className="ml-2 p-2 bg-green-600 rounded hover:bg-green-500"
                >
                  Save
                </button>
                <button
                  onClick={() => handleDelete(label.id)}
                  className="ml-2 p-2 bg-red-600 rounded hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            ) : (
              <div
                key={label.id}
                className="flex items-center justify-between mb-2 p-2 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer"
                onClick={() => setEditingLabel(label)}
              >
                <span>{label.name}</span>
                <button className="ml-2 text-gray-400 hover:text-white">
                  ✎
                </button>
              </div>
            )
          )}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setNewLabelMode(false)}
            className="p-2 bg-gray-600 rounded hover:bg-gray-500"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default LabelEditor;
