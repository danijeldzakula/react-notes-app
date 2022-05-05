import React, { useState, useEffect } from 'react';
import BlogList from '../../components/bloglist/BlogList';
import { useGlobal } from '../../context';

const Blogs = () => {
  const [ blogs, setBlogs ] = useState();
  const [ isLoading, setIsLoading ] = useState(true);
  const { searchBar } = useGlobal();

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/blogs/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:8000/blogs')
        .then((res) => {
          if (!res.ok) {
            setIsLoading(false);
            throw Error('aaaaaa');
          }
          return res.json();
        })
        .then((data) => {
          setBlogs(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log('Error message: ', err);
          setIsLoading(false);
        });
    }, 500);
  }, []);



  return (
    <section className="section section-blogs">
      {isLoading && <div className='pl-4 pr-4 text-center'>Loading...</div>}
      {!blogs && !isLoading && <div>Nema blogova dostupnih</div>}
      {blogs && (
        <>
          <BlogList
            blogs={blogs.filter((blog) => blog.title.toLowerCase().includes(searchBar))}
            title="Sve objave"
            handleDelete={handleDelete}
            isLoading={isLoading}
          />
        </>
      )}
    </section>
  );
}

export default Blogs;