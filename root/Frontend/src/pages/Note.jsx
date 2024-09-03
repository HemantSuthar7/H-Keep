import React, { useState } from 'react';
import { Container, NoteViewer } from "../components/index.js";
import { useLocation } from 'react-router-dom';

function Note() {
  const location = useLocation();
  const {noteData} = location.state || {};
 
  return (
    <div className='py-8'>
      <Container>
        <NoteViewer noteData={noteData} />
      </Container>
    </div>
  );
}

export default Note;
