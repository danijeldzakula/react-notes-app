import React from 'react';
import AddNote from './AddNote';
import Note from './Note';

const NotesList = ({ notes, handleAddNote, handleDeleteNote, handleEditNote }) => {
    return ( 
      <>
        <AddNote handleAddNote={handleAddNote} />
        {notes.map((note) => <Note note={note} key={note.id} handleDeleteNote={handleDeleteNote} handleEditNote={handleEditNote} />)}
      </>
    )
}

export default NotesList;