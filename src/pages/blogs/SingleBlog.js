import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SingleBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ blog, setBlog ] = useState();
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:8000/blogs/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setBlog(data);
          setLoading(false);
        });
    }, 500);
  }, []);

  const handleDelete = () => {
    fetch(`http://localhost:8000/blogs/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setTimeout(() => {
        navigate('/blogs');
      }, 500);
    });
  };

  return (
    <section className="section section-single-blog">
      <div className='container pl-4 pr-4 mx-auto'>
        {loading && <div className='pl-4 pr-4 text-center'>Loading...</div>}
        {!loading && blog && (
          <article className="single-blog max-w-xl mx-auto p-4 bg-white dark:bg-gray-700 mb-2 ease-out duration-300">
            <h1 className="title-link text-4xl mb-8">{blog.title}</h1>
            <p className='block text-xl mb-3'>{blog.body}</p>
            <div className='grid justify-between items-center grid-flow-col auto-cols-max'>
              <span className="author">Autor: {blog.author}</span>
              <div className='grid grid-cols-2 gap-4'>
                <button className='p-4 bg-yellow-500 text-white font-medium min-w-[150px]' onClick={() => navigate(`/edit-blog/${id}`)}>Edit Blog</button>
                <button className='p-4 bg-red-500 text-white font-medium min-w-[150px]' onClick={handleDelete}>Delete this post</button>
              </div>
            </div>
          </article>
        )}
        {!loading && !blog && <h1>No blog data</h1>}
      </div>
    </section>
  );
};

export default SingleBlog;