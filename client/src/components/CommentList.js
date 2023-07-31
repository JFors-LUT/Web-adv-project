import React, { useState, useEffect } from 'react';

//function to fetch comments and list them on page
const CommentList = ({ matchID }) => {
  //setting react functionality to modify DOM fields 
    const [comments, setComments] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    //fetching for data matchID gained through Snippets field
    useEffect(() => {
      fetch(`/api/getcomment/${matchID}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setComments(data);
        })
        .catch((error) => console.error('Error fetching comments:', error));
        setErrorMessage("Error fetching comments");
    }, [matchID]);
  //container to display all related comments with map function.
    return (
      <div class="container">
        <h4>Comments:</h4>
        <ul>
          {comments.map((comment) => (
            <li key={comment._id}>
              <strong>{comment.author}</strong>: {comment.content}
            </li>
          ))}
        </ul>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message if exists */}
      </div>
    );
  };
  
  export default CommentList;