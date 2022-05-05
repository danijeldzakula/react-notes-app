import React, { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    return () => {};
  }, [ pathname ]);

  return (
    <div className={`app bg-gray-100 dark:bg-gray-800 ease-out duration-300`}>{children}</div>
  )
}

export default Layout;