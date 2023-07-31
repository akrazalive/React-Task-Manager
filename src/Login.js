import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Fetch user data from the JSON server to validate credentials
    fetch('http://localhost:5000/users')
      .then((response) => response.json())
      .then((data) => {
        // Check if the entered username and password match any user in the database
        const user = data.find((user) => user.username === username && user.password === password);

        if (user) {
          onLogin({ username: user.username, groupId: user.groupId, userId: user.id });
        } else {
          alert('Invalid username or password. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="text" value={username} onChange={handleUsernameChange} placeholder="Username" />
      <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
      <button class="btn btn-lg btn-success" type="submit">Login</button>
    </form>
  );
};

export default Login;
