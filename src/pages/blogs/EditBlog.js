import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditBlog = () => {
  const { id } = useParams();
  const [ editBlog, setEditBlog ] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:8000/blogs/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setEditBlog(data);
        });
    }, 500);

  }, []);    

  const handleEdit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/blogs/${id}`, {
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editBlog)
    })
    .then(() => {
      setTimeout(() => {
        navigate('/blogs');
      }, 500)
    });
  }

  return (
    <section className="section section-edit-blog">
      <div className='container pl-4 pr-4 mx-auto'>
        <h1 className="list-title text-center text-5xl mb-8">Edit Blog</h1>

        <form className='grid gap-3 single-blog max-w-xl mx-auto p-4 mb-2 bg-white dark:bg-gray-700 ease-out duration-300'>
          <label className='mb-1 font-medium'>Title:</label>
          <input type='text' className='pl-4 pr-4 pt-3 pb-3 text-xl bg-gray-100 dark:bg-gray-600 ease-out duration-300' defaultValue={editBlog?.title} required onChange={(event) => setEditBlog({ ...editBlog, title: event.target.value })} />
          
          <label className='mb-1 font-medium'>Description:</label>
          <textarea defaultValue={editBlog?.body} required onChange={(event) => setEditBlog({ ...editBlog, body: event.target.value })} className='resize-none text-xl pl-4 pr-4 pt-3 pb-3 bg-gray-100 dark:bg-gray-600 ease-out duration-300' rows={7} />
          
          <button type='submit' onClick={(event) => handleEdit(event)} className='p-4 bg-green-500 text-white font-medium'>Update</button>
        </form>
      </div>
    </section>
  )
}

export default EditBlog;