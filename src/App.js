import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import TaskManagementSystem from './TaskManagementSystem';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  // Mock groups data
  const groups = [
    { id: 1, name: 'Group A' },
    { id: 2, name: 'Group B' },
  ];

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleSignup = (userData) => {
    // Save the new user to the mock API or a real database
    setUser(userData);
  };

  return (
    <div className="App">
      {user ? (
        <TaskManagementSystem user={user} />
      ) : (
        <>
          <h1>Login</h1>
          <Login onLogin={handleLogin} />
          <h1>Sign Up</h1>
          <Signup groups={groups} onSignup={handleSignup} />
        </>
      )}
    </div>
  );
};

export default App;
