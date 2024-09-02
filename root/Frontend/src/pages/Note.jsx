import React, { useEffect, useState } from 'react';
import { Container, NoteViewer } from "../components/index.js";
import { getUserNotes } from "../methods/noteMethods.js";

function Note() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notesData = await getUserNotes();
        
        if (notesData) {
          // You may want to add sorting here if needed
          setNotes(notesData);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  

  return (
    <div className='py-8'>
      <Container>
        <NoteViewer notes={notes} />
      </Container>
    </div>
  );
}

export default Note;
