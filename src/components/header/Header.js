import React, { useLayoutEffect } from 'react';
import SearchBar from '../search/SearchBar';
import { useGlobal } from '../../context';

const Header = ({ toggle, toggleSidebar, toggleThemes, toggleDarkMode }) => {
  const { freeze, unfreeze } = useGlobal();

  useLayoutEffect(() => {
    toggle ? freeze() : unfreeze();
  }, [ toggle ]);

  return (
    <header className='header'>
      <button type='button' onClick={toggleSidebar} className='sidebar-toggle'>Menu</button>
      <SearchBar />
      <label htmlFor="darkMode" className="toggle-switch flex items-center cursor-pointer pr-4 pl-4">
        <div className="relative">
          <input id="darkMode" type="checkbox" className="sr-only" defaultChecked={toggleDarkMode} onChange={toggleThemes} />
          <div className="w-10 h-4 bg-gray-100 rounded-full shadow-inner" />
          <div className="dot absolute w-6 h-6 bg-blue-400 rounded-full shadow -left-1 -top-1 transition" />
        </div>
      </label>
    </header>
  )
}

export default Header;