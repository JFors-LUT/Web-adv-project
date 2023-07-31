import React from 'react';

//container for displaying selected snippet with related comments
const SnippetDetails = ({ snippet }) => {
  return (
    <div class="container">
      <h3>{snippet.title}</h3>
      <p>{snippet.content}</p>
      <ul>
        {snippet.comments.map((comment) => (
          <li key={comment._id}>
            <strong>{comment.author}</strong>: {comment.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SnippetDetails;