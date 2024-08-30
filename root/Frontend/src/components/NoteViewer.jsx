import React from 'react';

const NoteViewer = ({ title, textContent, image, onEdit, onBack }) => {
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
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <hr className="mb-4" />
      <div className="prose max-w-none">
        {textContent}
      </div>
      {image && (
        <div className="mt-4">
          <img src={image} alt={title} className="w-full rounded-lg" />
        </div>
      )}
    </div>
  );
};

export default NoteViewer;