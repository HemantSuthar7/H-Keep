import React from 'react'
import {Container, NoteEditorForm} from "../components/index.js"

function EditNote() {
  return (
    <div className='py-8'>
        <Container>
            <NoteEditorForm/>
        </Container>
    </div>
  )
}

export default EditNote