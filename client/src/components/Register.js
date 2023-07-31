import React, { useState } from 'react';


const Register = () => {
  //setting react functionality to modify DOM fields 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  //function to handle register requests
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        //display succesful registeration
        setErrorMessage(data)
        console.log('Registration success:', data);
      } else {
        const errorData = await response.json();
        console.error('Registration error:', errorData);
        setErrorMessage(errorData);

      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage('Error occurred during registration.');
    }
  };

  //create register container with respective fields
  return (
    <div class="container">
      <h2 >Register</h2>

      <form onSubmit={handleRegister}>
      <div>
          <input placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <br></br>
        </div>
        <div className="button">
        <button type="submit">Register</button>
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message if exists */}
      </form>
    </div>
  );
};

export default Register;
