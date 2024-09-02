import React, { useEffect, useState } from 'react';
import { Container, NoteEditorForm } from "../components/index.js";
import { getUserNotes } from "../methods/noteMethods.js";

function EditNote() {
    const [noteData, setNoteData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUserNotes();
            setNoteData(data);
        };

        fetchData();
    }, []);

    return (
        <div className='py-8'>
            <Container>
                <NoteEditorForm noteData={noteData} />
            </Container>
        </div>
    );
}

export default EditNote;
