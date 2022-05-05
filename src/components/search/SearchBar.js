import React from 'react';
import { useGlobal } from '../../context';

const SearchBar = () => {
  const { handleSearchBar } = useGlobal();

  return(
    <input className='h-[40px] w-full pr-4 pl-4 outline-none bg-gray-100 dark:bg-gray-800 ease-out duration-300 text-gray-800 dark:text-gray-100' type='search' placeholder='Search...' onChange={(e) => handleSearchBar(e)} />
  )
}


export default SearchBar;