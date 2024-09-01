import React from 'react'
import {Container, NoteEditorForm} from "../components/index.js"

function AddNote() {
  return (
    <div className='py-4'>
        <Container>
            <NoteEditorForm />
        </Container>
    </div>
  )
}

export default AddNote