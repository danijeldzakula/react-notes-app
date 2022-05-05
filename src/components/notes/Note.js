import React, { useState } from 'react';

const Note = ({ note, handleDeleteNote, handleEditNote }) => {
    const [ updateText, setUpdateText ] = useState('');
    const handleChange = (event) => {
      setUpdateText(event);
    }
  
    return (
      <div className='h-[200px] relative grid'>
        <textarea className='w-full resize-none h-40 outline-none p-4 text-black bg-green-400' defaultValue={note.text} onChange={(event) => handleChange(event.target.value)} required />
  
        <div className='grid grid-cols-3 items-center justify-between h-[40px] bg-green-300'>
          <button type='submit' className='w-auto h-full pr-4 pl-4 text-black' onClick={() => handleEditNote(note, updateText || note.text)}>Save Edit</button>
          <button type='button' className='w-auto h-full pr-4 pl-4 text-black' onClick={() => handleDeleteNote(note.id)}>Delete Note</button>
        </div>        
      </div>
    )
}

export default Note;