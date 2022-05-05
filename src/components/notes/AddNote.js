import React, { useState } from 'react';

const AddNote = ({ handleAddNote }) => {
    const [ noteText, setNoteText ] = useState('');
    const characterLimit = 200;
  
    const handleChange = (event) => {
      if (characterLimit - event.target.value.length >= 0) {
        setNoteText(event.target.value);
      }
    }
  
    const handleSaveClick = () => {
      if (noteText.trim().length > 0) {
        handleAddNote(noteText);
        setNoteText('');
      }
    }
  
    return (
      <div className='h-[200px] relative grid'>
        <textarea className='w-full resize-none h-40 outline-none p-4 text-black bg-yellow-400 placeholder:text-gray-600' placeholder='Type to add a note...' name='textarea' onChange={handleChange} value={noteText} /> 
        <div className='grid grid-cols-2 items-center justify-between h-[40px] bg-yellow-300'>
          <span className='w-auto h-full leading-[40px] pr-4 pl-4 text-black'>{characterLimit - noteText.length}</span>
          <button className='w-auto h-full pr-4 pl-4 text-black' onClick={handleSaveClick}>Add Note</button>
        </div>
      </div>
    )
}

export default AddNote;