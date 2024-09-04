import React, { useEffect, useState } from 'react';
import { Container, NoteCard, ListCard } from "../components/index.js";
import { getCurrentUserData } from "../methods/userMethods.js";

function UserNotesAndLists() {
  const [sortedItems, setSortedItems] = useState([]);
  const [labelMap, setLabelMap] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getCurrentUserData();

        if (userData && userData.data) {
          // Create a mapping of label IDs to label names
          const labelMapping = userData.data.labels.reduce((acc, label) => {
            acc[label._id] = label.labelName;
            return acc;
          }, {});

          setLabelMap(labelMapping);

          // Combine and sort notes and todoLists by date, latest first
          const combinedItems = [
            ...userData.data.notes.map(note => ({
              ...note,
              type: 'note',
              labelCategory: labelMapping[note.labelCategory] || note.labelCategory
            })),
            ...userData.data.todoLists.map(list => ({
              ...list,
              type: 'list',
              labelCategory: labelMapping[list.labelCategory] || list.labelCategory
            })),
          ].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

          setSortedItems(combinedItems);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Container>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedItems.map(item => (
            item.type === 'note' ? (
              <NoteCard
                key={item._id}
                id={item._id}
                title={item.title}
                textContent={item.textContent}
                label={item.labelCategory || ''}
                imageUrl={item.imageUrl}
                color={item.color}
              />
            ) : (
              <ListCard
                key={item._id}
                _id={item._id}
                title={item.title}
                todoItems={item.todoItems}
                label={item.labelCategory || ''}
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

export default UserNotesAndLists;
