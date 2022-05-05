import React from 'react';
import NotesList from '../../components/notes/NoteList';
import { useGlobal } from '../../context';

const Home = ({ addNote, deleteNote, editNote, notes }) => {
  const { searchBar } = useGlobal();

  return (
    <section className='section section-home'>
      <div className='pl-4 pr-4'>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          <NotesList notes={notes.filter((note) => note.text.toLowerCase().includes(searchBar))} handleAddNote={addNote} handleDeleteNote={deleteNote} handleEditNote={editNote} />
        </div>
      </div>
    </section>
  )
}

export default Home;