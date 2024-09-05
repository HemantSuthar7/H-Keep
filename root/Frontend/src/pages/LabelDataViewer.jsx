import React, { useEffect, useState } from 'react';
import { Container, NoteCard, ListCard } from "../components/index.js";
import { getLabelData } from "../methods/labelMethods.js";
import { useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


function LabelDataViewer() {

    const location = useLocation();
    const {labelId, labelName} = location.state || {};
    const navigate = useNavigate();

  const [sortedItems, setSortedItems] = useState([]);

  useEffect(() => {
    const fetchLabelData = async () => {
      try {
        const labelData = await getLabelData(labelId);

        if (labelData && labelData.data) {
          // Combine and sort notes and todoLists by date, latest first
          const combinedItems = [
            ...labelData.data.notes.map(note => ({
              ...note,
              type: 'note',
              label: {
                name: labelData.data.labelName,
                id: labelId
              }
            })),
            ...labelData.data.todoLists.map(list => ({
              ...list,
              type: 'list',
              label: {
                name: labelData.data.labelName,
                id: labelId
              }
            })),
          ].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

          setSortedItems(combinedItems);
        }
      } catch (error) {
        console.error("Error fetching label data:", error);
      }
    };

    fetchLabelData();
  }, [labelId]);

  const handleBackClick = () => {
    navigate("/UserNotesAndLists");
  };


  return (
    <Container>
      <div className="p-4 sm:p-6 lg:p-8">
      <div className="relative flex items-center mb-4 text-xl bg-zinc-700 text-white w-full h-10 rounded-xl">
        {/* Left-aligned button */}
        <button className="absolute left-0 ml-2" onClick={handleBackClick}>
            <FaArrowLeft className="text-white hover:text-gray-400 text-2xl" />
        </button>

        {/* Centered text */}
        <div className="mx-auto text-center">
            {labelName}<span> Data</span>
        </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedItems.map(item => (
            item.type === 'note' ? (
              <NoteCard
                key={item._id}
                id={item._id}
                title={item.title}
                textContent={item.textContent}
                label={labelName}
                imageUrl={item.imageUrl}
                color={item.color}
              />
            ) : (
              <ListCard
                key={item._id}
                _id={item._id}
                title={item.title}
                todoItems={item.todoItems}
                labelName={labelName}
                labelId={item.label.id || ''}
                imageUrl={item.imageUrl}
                color={item.color}
              />
            )
          ))}
        </div>
      </div>
    </Container>
  );
}

export default LabelDataViewer;
