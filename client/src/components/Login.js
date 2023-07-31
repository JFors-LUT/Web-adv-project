import React, { useState } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import { useNavigate } from 'react-router-dom';



const Login = () => {
  //setting react functionality to modify DOM fields 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  //logging in user with username and password
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login success:', data);
        // redirect to /snippets route
        navigate('/snippets');
      } else {
        const errorData = await response.json();
        console.error('Login error:', errorData);
        setErrorMessage(errorData);

      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Error occurred during login.');
    }
  };

  //container for fields and button
  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-field">
          <input placeholder="Username" id="user" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="input-field">
          <input placeholder="Password" id="pass" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
        <div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message if exists */}
        </div>
      </form>
    </div>
  );
};

export default Login;
