import React, { createContext, useEffect, useState } from 'react';
const UserContext = createContext(null);

const user = {
    email: 'admin@admin.com',
    password: 'admin',
};

const UserProvider = ({ children }) => {
  const [ loggedIn, setLoggedIn ] = useState(false);

  let currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (currentUser) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [ currentUser, setLoggedIn ]);

  const logoutHandler = () => {
    setLoggedIn(false);
    localStorage.removeItem('user');
  }

  const loginHandler = (e, form) => {
    e.preventDefault();
    if (form.email.trim() === user.email && form.password.trim() === user.password) {
      setLoggedIn(true);
      localStorage.setItem('user', JSON.stringify({ email: form.email, token: 'dsadasdasdjkh12jk3h1jlsda' }));
    } else {
      alert('Wrong password or username');
    }
  }
  
  return (
    <UserContext.Provider value={{ loggedIn, setLoggedIn, currentUser, logoutHandler, loginHandler }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
