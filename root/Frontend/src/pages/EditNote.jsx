import React from 'react';
import { Container, NoteEditorForm } from "../components/index.js";
import { useLocation } from 'react-router-dom';


function EditNote() {
    
    const location = useLocation();
    const {noteData} = location.state || {};

    return (
        <div className='py-8'>
            <Container>
                <NoteEditorForm noteData={noteData} />
            </Container>
        </div>
    );
}

export default EditNote;
