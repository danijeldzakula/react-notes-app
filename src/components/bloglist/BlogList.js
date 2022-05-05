import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogList = ({ blogs, title, handleDelete }) => {
  const navigate = useNavigate();
  
  return (
    <>
      {blogs && (
        <div className='container pl-4 pr-4 mx-auto'>
          <h1 className="list-title text-center text-5xl mb-16">{title}</h1>
          {blogs.map((blog, index) => {
            return (
              <article key={index} className='single-blog max-w-xl mx-auto p-4 bg-white dark:bg-gray-700 mb-4 ease-out duration-300'>
                <h2 className="title-link text-4xl mb-8 cursor-pointer" onClick={() => navigate(`/blogs/${blog.id}`)}>{blog.title}</h2>
                <p className='block text-xl mb-3'>{blog.body.slice(0, 100)}...</p>
                <div className='grid justify-between items-center grid-flow-col auto-cols-max'>
                  <span className='block text-sm'>Napisao: {blog.author}</span>
                  <button className='p-4 bg-red-500 text-white font-medium' onClick={() => handleDelete(blog.id)}>Delete this post</button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
};

export default BlogList;
