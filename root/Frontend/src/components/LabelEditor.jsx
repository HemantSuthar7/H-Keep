import React, { useState, useEffect } from 'react';
import { createLabel, updateLabel, deleteLabel } from "../methods/labelMethods.js";
import { getCurrentUserData } from "../methods/userMethods.js";
import { FaHome, FaSave, FaTrashAlt, FaPlus, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LabelEditor = () => {
  const [labels, setLabels] = useState([]);
  const [editingLabel, setEditingLabel] = useState(null);
  const [newLabel, setNewLabel] = useState('');
  const [newLabelMode, setNewLabelMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLabels = async () => {
      const userData = await getCurrentUserData();
      if (userData && userData.data && userData.data.labels) {
        setLabels(userData.data.labels);
      }
    };
    fetchLabels();
  }, []);

  const handleHomeClick = () => {
    navigate("/UserNotesAndLists");
  };

  const handleSave = async (labelId, newLabelValue) => {
    await updateLabel({ labelId, labelName: newLabelValue });
    setEditingLabel(null);
    refreshLabels();
  };

  const handleDelete = async (labelId) => {
    await deleteLabel(labelId);
    setEditingLabel(null);
    refreshLabels();
  };

  const handleAddNew = async () => {
    await createLabel({ labelName: newLabel });
    setNewLabel('');
    setNewLabelMode(false);
    refreshLabels();
  };

  const refreshLabels = async () => {
    const userData = await getCurrentUserData();
    if (userData && userData.data && userData.data.labels) {
      setLabels(userData.data.labels);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg w-96 shadow-lg mx-8 my-8">
      <div className="flex items-center mb-4">
        <FaHome className="cursor-pointer text-xl hover:text-gray-400" onClick={handleHomeClick} />
        <h2 className="text-lg ml-2">Edit Labels</h2>
      </div>

      {newLabelMode ? (
        <div className="flex items-center mb-2">
          <input
            type="text"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            className="flex-grow p-2 bg-gray-700 border-none rounded"
            placeholder="Enter label name"
          />
          <FaSave
            onClick={handleAddNew}
            className="ml-2 text-green-600 cursor-pointer hover:text-green-500"
          />
        </div>
      ) : (
        <button
          onClick={() => setNewLabelMode(true)}
          className="w-full p-2 bg-gray-700 rounded hover:bg-gray-600 mb-4 flex items-center justify-center"
        >
          <FaPlus className="mr-2" /> Create new label
        </button>
      )}

      <div>
        {labels.map((label) =>
          editingLabel && editingLabel._id === label._id ? (
            <div key={label._id} className="flex items-center mb-2">
              <input
                type="text"
                value={editingLabel.labelName}
                onChange={(e) =>
                  setEditingLabel({ ...editingLabel, labelName: e.target.value })
                }
                className="flex-grow p-2 bg-gray-700 border-none rounded"
              />
              <FaSave
                onClick={() => handleSave(label._id, editingLabel.labelName)}
                className="ml-2 text-green-600 cursor-pointer hover:text-green-500"
              />
              <FaTrashAlt
                onClick={() => handleDelete(label._id)}
                className="ml-2 text-red-600 cursor-pointer hover:text-red-500"
              />
            </div>
          ) : (
            <div
              key={label._id}
              className="flex items-center justify-between mb-2 p-2 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer"
              onClick={() => setEditingLabel({ ...label })}
            >
              <span>{label.labelName}</span>
              <FaEdit className="ml-2 text-gray-400 hover:text-white" />
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
  );
};

export default LabelEditor;
