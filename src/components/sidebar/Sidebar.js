import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = React.forwardRef(({ toggleSidebar, toggle }, overflowRef) => {
  return (
    <>
      <aside className={`sidebar content-start ${!toggle ? '-translate-x-full' : ''}`}>
        <div className='sidebar-header'>
          <button type='button' onClick={toggleSidebar} className='sidebar-toggle'>Menu</button>
        </div>
        <div className='overflow w-full' ref={overflowRef}>
          <ul className='pt-4 pb-4'>
            <NavLink to={`/`} className={`navlink`} onClick={toggleSidebar}>Notes</NavLink>
            <NavLink to={`/create`} className={`navlink`} onClick={toggleSidebar}>Blogs Create</NavLink>
            <NavLink to={`/blogs`} className={`navlink`} onClick={toggleSidebar}>Blogs Feeds</NavLink>
            <NavLink to={`/player`} className={`navlink`} onClick={toggleSidebar}>Audio Player</NavLink>
          </ul>
        </div>
      </aside>
      <div className={`overlay ${!toggle ? '' : 'fixed inset-0 bg-gray-900 opacity-50 z-[1000] ease-out duration-300'}`} onClick={toggleSidebar}></div>
    </>
  )
});

export default Sidebar;