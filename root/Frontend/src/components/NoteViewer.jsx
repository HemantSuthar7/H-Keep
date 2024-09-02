import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Icons for edit and delete

const NoteViewer = ({ title, content, imageSrc }) => {


  const contentWithCenteredImages = post?.content
    ? parse(post.content, {
        replace: (domNode) => {
          if (domNode.name === 'img') {
            domNode.attribs.class = (domNode.attribs.class || '') + ' center-image';
          }
        },
      })
    : <p>No content available.</p>;

  return (
    <div className="bg-[#881E29] text-white p-8 rounded-lg shadow-lg w-[1600px] mx-auto">
      {/* Top bar with Edit and Delete buttons */}
      <div className="flex justify-end space-x-4 mb-4">
        <button className="text-white hover:text-gray-300">
          <FaEdit className="text-xl" />
        </button>
        <button className="text-white hover:text-gray-300">
          <FaTrashAlt className="text-xl" />
        </button>
      </div>

      {/* Optional Image */}
      {imageSrc && (
        <div className="flex justify-center mb-4">
          <img
            src={imageSrc}
            alt="Note related"
            className="max-w-full rounded-lg"
          />
        </div>
      )}

      {/* Title */}
      <h2 className="text-3xl font-semibold mb-4">{title}</h2>

      {/* Line between title and content */}
      <hr className="border-t-2 border-white mb-4" />

      {/* Content */}
      <p className="text-lg leading-relaxed">{contentWithCenteredImages}</p>
    </div>
  );
};

export default NoteViewer;
