import React, { useEffect, useLayoutEffect,  useCallback, useState, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppProvider } from './context';
import { nanoid } from 'nanoid';

import Layout from './layout/Layout';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';

import Home from './pages/home/Home';
import Create from './pages/blogs/Create';
import Blogs from './pages/blogs/Blogs';
import SingleBlog from './pages/blogs/SingleBlog.js';
import EditBlog from './pages/blogs/EditBlog.js';
import AudioPlayer from './pages/audio-player/AudioPlayer';

const App = () => {
  const overflowRef = useRef();
  const [ toggle, setToggle ] = useState(false);    
  const [ notes, setNotes ] = useState([]);

  // sidebar menu
  const toggleSidebar = () => setToggle(!toggle);
  const escapeSidebar = useCallback((event) => {
    if (event.key === "Escape") setToggle(false);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escapeSidebar, false);
    return () => {
      document.removeEventListener("keydown", escapeSidebar, false);
    };
  }, [ escapeSidebar ]);  

  // toggle theme
  const [ toggleDarkMode, setToggleDarkMode ] = useState(() => {
    const darkMode = window.localStorage.getItem('theme');
    return JSON.parse(darkMode) ?? false;
  });

  const toggleThemes = () => setToggleDarkMode(!toggleDarkMode);  
  
  useLayoutEffect(() => {
    window.localStorage.setItem('theme', JSON.stringify(toggleDarkMode));
    if (JSON.parse(window.localStorage.theme) === true || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [ toggleDarkMode ]);

  useEffect(() => {
    setTimeout(() => {
      overflowRef.current.scrollTo(0, 0);
    }, 400);
  }, [ toggle ]);

  // saved notes in local storage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('data-notes'));
    if (savedNotes) setNotes(savedNotes);
  }, []);

  // update notes
  useEffect(() => {
    localStorage.setItem('data-notes', JSON.stringify(notes));
  }, [ notes ]);

  // add new notes
  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()
    }

    const newNotes = [ ...notes, newNote ];
    setNotes(newNotes);
  }

  // delete notes
  const deleteNote = (id) => {
    const updateDeleteNote = notes.filter((note) => note.id !== id);
    setNotes(updateDeleteNote);
  }

  // update notes
  const editNote = (update, text) => {
    const updateEditNote = notes.find((note) => note.id === update.id);
  }

  useEffect(() => {
    if (window.history.action === 'POP') {
      window.addEventListener('unload', (e) => {
        return window.scrollTo(0, 0);
      });
    }
  
    if (window.history.scrollRestoration) {
      if (window.history.scrollRestoration === 'auto') {
        window.history.scrollRestoration = 'manual';
      }
      window.addEventListener('unload', () => {
        return window.scrollTo(0, 0);
      });
    }
    return () => {};
  }, []);  

  return (
    <AppProvider>
      <Layout>
        <Header toggle={toggle} toggleSidebar={toggleSidebar} toggleThemes={toggleThemes} toggleDarkMode={toggleDarkMode} />
        <Sidebar toggleSidebar={toggleSidebar} toggle={toggle} ref={overflowRef} />
        <main className='main pt-16 min-h-screen'>
          <Routes>
            <Route path="/" element={<Home addNote={addNote} deleteNote={deleteNote} editNote={editNote} notes={notes} />} />
            <Route path="/create" element={<Create />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<SingleBlog />} />
            <Route path="/edit-blog/:id" element={<EditBlog />} />
            <Route path="/player" element={<AudioPlayer />} />
          </Routes>      
        </main>
      </Layout>
    </AppProvider>
  )
}
export default App;