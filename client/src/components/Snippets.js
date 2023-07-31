import React, { useState, useEffect } from 'react';
import CommentInput from './CommentInput ';
import SnippetDetails from './SnippetDetails';


  const Snippets = () => {
    //setting react functionality to modify DOM fields 
    const [snippets, setSnippets] = useState([]);
    const [selectedSnippet, setSelectedSnippet] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
  
    // Function to fetch comments for snippets
    // program changed to display comments on separate page, code could be enabled or repurposed, for example show latest comment 
    const fetchCommentsForSnippets = async () => {
      try {
        const response = await fetch('/api/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const commentsData = await response.json();
        const snippetsWithComments = attachCommentsToSnippets(snippets, commentsData);
        console.log(snippetsWithComments)
        setSnippets(snippetsWithComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
        //const snippetsWithComments = attachCommentsToSnippets(snippets, commentPH1);
        //setSnippets(snippetsWithComments);
      }
    };
  
    // Function to attach comments to snippets, not used in current build
    const attachCommentsToSnippets = (snippets, comments) => {
      return snippets.map((snippet) => {
        const snippetComments = comments.filter((comment) => comment.snippetID === snippet._id);
        return {
          ...snippet,
          comments: snippetComments,
        };
      });
    };
  
    // Fetch snippets with useEffect
    useEffect(() => {

      //defining the function for fetching data
      const fetchData = async () => {
        try {
          const snippetsResponse = await fetch('/api/snippets', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          //commented out the functionlaity to display comments on the snippets main page
         /* const commentsResponse = await fetch('/api/comments', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          }); 

  */      //checking only snippets response instead of both snippet and comment due to changes
          if (!snippetsResponse.ok){ //|| !commentsResponse.ok) {,
            setErrorMessage('Error occurred fetching snippets.');
            throw new Error('Network response was not ok');
          }
          
          //waiting for response to ensure data is available for page 
          const snippetsData = await snippetsResponse.json();

          //const commentsData = await commentsResponse.json();
          //const snippetsWithComments = attachCommentsToSnippets(snippetsData, commentsData);

          setSnippets(snippetsData);
        } catch (error) {
          console.error('Error fetching data:', error);
          setErrorMessage('Sending request failed.');
        }
      };
      
      fetchData();
    }, []);

    //function to fetch comments with parameter
const handleSnippetClick = async (snippetId) => {
  try {
    const response = await fetch(`/api/comments/snippet/${snippetId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const snippetData = await response.json();

    // Find the selected snippet
    const selectedSnippet = snippets.find((snippet) => snippet._id === snippetId);
    setSelectedSnippet({ ...selectedSnippet, comments: snippetData });
  } catch (error) {
    console.error('Error fetching snippet details:', error);
  }
};

//clicking snipped takes to comments page
if (selectedSnippet) {
  return (
    <div>
      <button onClick={() => setSelectedSnippet(null)}>Back to Snippets</button>
      <SnippetDetails snippet={selectedSnippet} />
      <CommentInput snippetId={selectedSnippet._id} />
    </div>
  );
}

//container to display snippets on page with map function, setting elements for easy commenting
return (
  <div class="container">
    <h2>Snippets</h2>
    <ul>
      {snippets.map((snippet) => (
        <li key={snippet._id}>
          <h3>
            <a href="#" onClick={() => handleSnippetClick(snippet._id)}>
              {snippet.title}
            </a>
          </h3>
          <p>{snippet.content}</p>
          <ul>
            {snippet.comments.map((comment) => (
              <li key={comment._id}>
                <strong>{comment.author}</strong>: {comment.content}
              </li>
            ))}
          </ul>
          <CommentInput snippetId={snippet._id} />
        </li>
      ))}
    </ul>
    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message if exists */}
  </div>
);
};

export default Snippets;