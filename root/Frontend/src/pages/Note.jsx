import React from 'react'
import {Container, NoteViewer} from "../components/index.js"

function Note() {
  return (
    <div className='py-8'>
        <Container>
            <NoteViewer/>
        </Container>
    </div>
  )
}

export default Note