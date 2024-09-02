// In UserNotesAndLists.jsx
import React, { useEffect, useState } from 'react';
import { Container, NoteCard, ListCard } from "../components/index.js";
import { getCurrentUserData } from "../methods/userMethods.js";

function UserNotesAndLists() {
  const [notes, setNotes] = useState([]);
  const [todoLists, setTodoLists] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getCurrentUserData();
        
        if (userData && userData.data) {
          // Sort notes and todoLists by date, latest first
          const sortedNotes = userData.data.notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          const sortedTodoLists = userData.data.todoLists.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

          setNotes(sortedNotes);
          setTodoLists(sortedTodoLists);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <Container>
        {notes.length > 0 && notes.map(note => (
          <NoteCard
            key={note._id}
            title={note.title}
            content={note.textContent}
            label={note.labelCategory || ''} // Ensure label is a string
            imageUrl={note.imageUrl} // Assuming imageUrl is a URL
          />
        ))}
        {todoLists.length > 0 && todoLists.map(list => (
          <ListCard
            key={list._id}
            title={list.title}
            todoItems={list.todoItems}
            label={list.labelCategory || ''} // Ensure label is a string
            imageUrl={list.imageUrl} // Assuming imageUrl is a URL
          />
        ))}
      </Container>
    </div>
  );
}

export default UserNotesAndLists;
