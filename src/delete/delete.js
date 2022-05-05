import React, { useEffect, useCallback, useState, useRef } from 'react';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';


const App = () => {
  const sidebarRef = useRef(null);
  // toggle sidebar menu 
  const [ toggle, setToggle ] = useState(false);

  // toggle theme dark/light
  const [ toggleDarkMode, setToggleDarkMode ] = useState(false);

  // search 
  const [ search, setSearch ] = useState('');
  
  // get local storage notes
  const [ getLocalStorage, setGetLocalStorage ] = useState(null);
  const [ textareaResult, setTextareaResult ] = useState([]);
  const [ formValues, setFormValues ] = useState({
    textarea: ''
  });

  // event submit form 
  const handleSubmit = (data) => {
    setFormValues(data);
    windowReload();
  }
  
  // event onchange all input field
  const handleChange = (field) => (value) => {
    setTextareaResult({ ...formValues, [field]: value });
  }

  // handle submit
  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSubmit(textareaResult);
    addLocalStorageItem('data-notes', textareaResult);
  }

  // add to local storage
  const addLocalStorageItem = (key, value) => {
    let push_array = window.localStorage.getItem(key) ? JSON.parse(window.localStorage.getItem(key)) : [];
    push_array.push(value);
    window.localStorage.setItem(key, JSON.stringify(push_array));
  }  

  // remove local storage item
  const removeLocalStorageItem = (key, index) => {
    let pop_array = JSON.parse(window.localStorage.getItem(key));
    pop_array.splice(index, 1);
    window.localStorage.setItem(key, JSON.stringify(pop_array));
  }
  
  // edit local storage item 
  const editLocalStorageItem = (key, name, value) => {
    let localStorageValue = window.localStorage.getItem('data-notes') ? JSON.parse(window.localStorage.getItem('data-notes')) : [];
    localStorageValue[key][name] = value;
    window.localStorage.setItem('data-notes', JSON.stringify(localStorageValue));
  }

  // event storage handler 
  const storageEventHandler = () => {
    let localStorageItem = JSON.parse(window.localStorage.getItem('data-notes') || []) || null;
    setGetLocalStorage({ ...getLocalStorage, localStorageItem});
  }

  // delete note 
  const deleteNote = (event, index) => {
    removeLocalStorageItem('data-notes', index);
    console.log(event)
  }

  // edit note
  const editNote = (event, key) => {
    editLocalStorageItem(0, 'textarea', event.target.value);
  }

  const handleEditSubmit = (event) => {
    event.preventDefault();
    setGetLocalStorage(event);
    windowReload();
  }

  // save edit note 
  const saveEditNote = (event) => {
    handleEditSubmit(getLocalStorage);
    windowReload();
  }

  // refresh page
  const windowReload = () => {
    window.location.reload();
  }

  // toggle sidebar menu 
  const toggleThemes = () => {
    setToggleDarkMode(!toggleDarkMode); 
    window.localStorage.setItem('data-themes', toggleDarkMode);
  }

  // toggle sidebar menu 
  const toggleSidebar = () => setToggle(!toggle);
  
  // escape event 
  const escapeSidebar = useCallback((event) => {
    if (event.key === "Escape") setToggle(false);
  }, []);

  // search 
  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    setSearch(value);
  }
  
  // use effect 
  useEffect(() => {
    let localStorageItem = JSON.parse(window.localStorage.getItem('data-notes') || null) || null;
    setGetLocalStorage(localStorageItem);
    document.addEventListener("keydown", escapeSidebar, false);
    window.addEventListener('storage', storageEventHandler, false);
    return () => {
      document.removeEventListener("keydown", escapeSidebar, false);
      window.removeEventListener('storage', storageEventHandler, false);
    };
  }, [ escapeSidebar ]);

  // filtred search
  const searchFilter = getLocalStorage?.filter((item) => {
    return item.textarea.toLowerCase().includes(search);
  });

  console.log(searchFilter);

  return (
    <div className='app bg-gray-800'>
      <Header toggleSidebar={toggleSidebar} handleSearch={handleSearch} toggleThemes={toggleThemes} />
      <Sidebar toggleSidebar={toggleSidebar} toggle={toggle} ref={sidebarRef} />
      <section className='mt-16 pt-16 pb-16'>
        <div className='pl-4 pr-4'>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            <div className='h-[200px]'>
              <form className='relative h-full grid' method='GET' action=''>
                <textarea className='w-full resize-none h-40 outline-none p-4 text-black bg-yellow-400' placeholder='Add sticky note' name='textarea' onChange={(event) => handleChange(event.target.name)(event.target.value)} />
                <div className='grid grid-cols-2 items-center justify-between h-[40px] bg-yellow-300'>
                  <span className='w-auto h-full leading-[40px] pr-4 pl-4'>1</span>
                  <button className='w-auto h-full pr-4 pl-4' onClick={handleFormSubmit}>Add Note</button>
                </div>
              </form>
            </div>            
            {getLocalStorage?.filter((store) => {
              return store.textarea.toLowerCase().includes(search);
            }).map((item, key) => {
              return (
                <div className='h-[200px]' key={key}>
                  <form className='relative h-full grid'>
                    <textarea className='w-full resize-none h-40 outline-none p-4 text-black bg-green-400' defaultValue={item.textarea} onChange={(event) => editNote(event, key)} required />
                    
                    <div className='grid grid-cols-3 items-center justify-between h-[40px] bg-green-300'>
                      <span className='w-auto h-full leading-[40px] pr-4 pl-4'>{key + 1}</span>
                      <button type='submit' className='w-auto h-full pr-4 pl-4' onClick={(e) => saveEditNote(e, key)}>Save Edit</button>
                      <button type='button' className='w-auto h-full pr-4 pl-4' onClick={(e) => deleteNote(e, key)}>Delete Note</button>
                    </div>  
                  </form>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default App;