import React, { useState, useEffect } from 'react';
import { createLabel, updateLabel, deleteLabel } from "../methods/labelMethods.js";
import { getCurrentUserData } from "../methods/userMethods.js";
import {  FaSave, FaTrashAlt, FaPlus, FaEdit, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
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

  const handleLinkClick = (labelId, labelName, e) => {
    e.stopPropagation(); // Prevent event propagation to the parent div
    navigate("/LabelDataViewer", { state: { labelId, labelName } });
  };

  const refreshLabels = async () => {
    const userData = await getCurrentUserData();
    if (userData && userData.data && userData.data.labels) {
      setLabels(userData.data.labels);
    }
  };

  return (
    <div className="bg-[#232427] text-white p-4 rounded-lg w-[400px] shadow-lg mx-auto my-8"> {/* Updated background color */}
      <div className="relative mb-2"> {/* Use relative positioning to adjust child elements */}
        <FaArrowLeft
          className="absolute left-0 top-0 cursor-pointer text-2xl hover:text-gray-400"
          onClick={handleHomeClick}
        />
        <h2 className="text-xl text-center font-medium">Edit Labels</h2> {/* Center the text */}
      </div>

      <hr className="border-gray-400 mb-3" />

      {newLabelMode ? (
        <div className="flex items-center mb-2">
          <input
            type="text"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            className="flex-grow p-2 bg-[#2d2e30] border-none rounded" 
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
          className="w-full p-2 bg-[#2d2e30] rounded hover:bg-gray-600 mb-4 flex items-center justify-center"
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
                className="flex-grow p-2 bg-[#2d2e30] border-none rounded" 
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
              className="flex items-center justify-between mb-2 p-2 bg-[#2d2e30] rounded hover:bg-zinc-600 cursor-pointer"
              onClick={() => setEditingLabel({ ...label })}
            >
              <span>{label.labelName}</span>
              <div className="flex items-center">
                <FaExternalLinkAlt
                  onClick={(e) => handleLinkClick(label._id, label.labelName, e)}
                  className="mr-2 text-blue-400 hover:text-blue-500 cursor-pointer"
                />
                <FaEdit className="text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>
          )
        )}
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => setNewLabelMode(false)}
          className="p-2 bg-[#2d2e30] rounded hover:bg-zinc-600"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default LabelEditor;
