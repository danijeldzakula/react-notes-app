import React, { createContext, useState, useContext } from 'react';
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [ searchBar, setSearchBar ] = useState('');

  const handleSearchBar = (event) => {
    let value = event.target.value.toLowerCase();
    setSearchBar(value);
  }

  const freeze = () => {
    let html = document.documentElement;
    let htmlPos = html.style.position;
    let scrollPos = html.scrollTop;

    if (!htmlPos) {
      html.style.position = 'fixed';
      html.style.width = '100%';
      html.style.height = '100%';
      html.style.top = '-' + scrollPos + 'px';
      html.style.overflowY = 'scroll';   
    }
  }

  const unfreeze = () => {  
    let html = document.documentElement;
    let htmlPos = html.style.position;
    if (htmlPos === 'fixed') {
      html.style.position = 'static';
      html.scrollTop = -parseInt(html.style.top);
      html.style.position = '';
      html.style.top = '';
      html.style.width = '';
      html.style.height = '';
      html.style.overflowY = '';
    }
  }

  return (
    <AppContext.Provider value={{ searchBar, setSearchBar, handleSearchBar, freeze, unfreeze }}>
      {children}
    </AppContext.Provider>
  );
};

// call custom hook
const useGlobal = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobal };
