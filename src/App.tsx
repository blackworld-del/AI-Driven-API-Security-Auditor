import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('currentUser'));

  // Listen for login changes
  useEffect(() => {
    const checkUser = () => {
      setCurrentUser(localStorage.getItem('currentUser'));
    };

    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  return <>{currentUser ? <Dashboard /> : <Auth />}</>;
};

export default App;
