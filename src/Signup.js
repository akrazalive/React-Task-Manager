import React, { useState } from 'react';

const Signup = ({ groups, onSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [groupId, setGroupId] = useState(groups[0]?.id || null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleGroupIdChange = (e) => {
    setGroupId(parseInt(e.target.value));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const newUser = {
      username,
      password,
      groupId,
    };

    // Post the new user data to the JSON server
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        onSignup(data); // Pass the newly created user data back to the parent component
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
  };

  return (
    <form onSubmit={handleSignup}>
      <input type="text" value={username} onChange={handleUsernameChange} placeholder="Username" />
      <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
      <label>
        Group ID:
        <select value={groupId} onChange={handleGroupIdChange}>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
