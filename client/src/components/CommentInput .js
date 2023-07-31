import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CommentInput = ({ snippetId }) => {
  //setting react functionality to modify DOM fields 
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  
  const handleAddComment = async () => {
    console.log('Comment:', comment);
    try {
      const response = await fetch('/api/addcomment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          snippetId,
          content: comment,
        }),
      });

      if (response.ok) {
        // Clear comment field for the current snippet
        setComment('');
        console.error('Comment added succesfully');
        setErrorMessage("Comment sent to server.");
      } else {
        const errorData = await response.json();
        console.error('Add comment error:', errorData);
        setErrorMessage(errorData);

      }
    } catch (error) {
      console.error('Add comment error:', error);
      setErrorMessage("Couldn't add comment.");

    }
  };

  //container for sending comments with button press
  return (
    <div class="container">
      <input
        type="text"
        value={comment}
        placeholder="Comment"
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={handleAddComment}>Add Comment</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message if exists */}
    </div>
  );
};

export default CommentInput;