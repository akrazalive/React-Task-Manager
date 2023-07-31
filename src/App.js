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
         <div className="app-container">
          <div className="login-container">
            <h1 className="center white-text">Login</h1>
            <Login onLogin={handleLogin} />
          </div>
          <div className="signup-container">
            <h1 className="center white-text">Sign Up</h1>
            <Signup groups={groups} onSignup={handleSignup} />
          </div>
        </div>
        </>
      )}
    </div>
  );
};

export default App;
