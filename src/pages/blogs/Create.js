import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate();
  const [ title, setTitle ] = useState('');
  const [ body, setBody ] = useState('');
  const [ author, setAuthor ] = useState('mario');
  const [ isPosting, setIsPosting ] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };

    console.log('blog: ', blog);
    setIsPosting(true);
    fetch('http://localhost:8000/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blog),
    })
      .then(() => setIsPosting(false))
      .then(() => {
        setTimeout(() => {
          navigate('/blogs');
        }, 1000);
      });

      console.log(author)      
  };


  

  return (
    <section className="section section-create">
      <div className='container pr-4 pl-4 mx-auto'>
        <h1 className="list-title text-center text-5xl mb-8">Add New Blog</h1>

        <form onSubmit={handleSubmit} className='single-blog grid max-w-xl mx-auto p-4 mb-2 gap-3 bg-white dark:bg-gray-700 ease-out duration-300'>
          <label className='mb-1 font-medium'>Title:</label>
          <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className='pl-4 pr-4 pt-3 pb-3 text-xl bg-gray-100 dark:bg-gray-600 ease-out duration-300' />

          <label className='mb-1 font-medium'>Description:</label>
          <textarea rows={7} required value={body} onChange={(e) => setBody(e.target.value)} className='resize-none text-xl pl-4 pr-4 pt-3 pb-3 bg-gray-100 dark:bg-gray-600 ease-out duration-300' />
          
          <label className='mb-1 font-medium'>Author:</label>

          <select value={author} onChange={(e) => setAuthor(e.target.value)} className='resize-none text-xl pl-4 pr-4 pt-3 pb-3 bg-gray-100 dark:bg-gray-600 ease-out duration-300'>
            <option value="mario">Mario</option>
            <option value="yoshi">Yoshi</option>
          </select>

          {!isPosting && <button type="submit" className='p-4 bg-green-500 text-white font-medium'>Dodaj blog</button>}
          {isPosting && <button type="submit" className='p-4 bg-green-500 text-white font-medium'>Blog se dodaje...</button>}
        </form>
      </div>
    </section>
  );
};

export default Create;