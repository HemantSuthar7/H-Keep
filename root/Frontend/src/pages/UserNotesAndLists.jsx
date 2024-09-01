import React from 'react'
import {Container, NoteCard, ListCard} from "../components/index.js"

function UserNotesAndLists() {
    // here we have to implement the logic of sorting the list and notes date wise, means the latest notes and lists should be on top
  return (
    <div>
        <Container>
            <NoteCard/>
            <ListCard/>
        </Container>
    </div>
  )
}

export default UserNotesAndLists