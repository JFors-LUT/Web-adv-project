import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AddSnippet = () => {
  //setting react functionality to modify DOM fields 
  const [text, setText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  //setting up function to redirect user
  const navigate = useNavigate();

  //sending snippet text to server 
  const handleAddSnippet = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/addsnippets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newSnip: text }),
      });

      if (response.ok) {
        console.log('Snippet added successfully');
        //redirect user to snippets after success
        navigate('/snippets');
      } else {
        const errorData = await response.json();
        console.error('Error adding snippet:', errorData);
        setErrorMessage(errorData)
      }
    } catch (error) {
      console.error('Error adding snippet:', error);
      setErrorMessage('Failed to add snippet.')
    }
  };

  return (
    <div class="container">
      <h2>Add Snippet</h2>
      <form onSubmit={handleAddSnippet}>
        <div>
          <label>Text:</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <button type="submit">Add Snippet</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message if exists */}
    </div>
  );
};

export default AddSnippet;