const Comment = require('../models/Comment');

// Function to handle code snippet creation
async function createComment(req, res) {
  const commentContent = req.body;

  //checking for comment not empty string
  if (commentContent.content === ""){
    return res.status(400).json("Please enter a comment before submit.");
  }

  //new comment using response 
  try {
    const newComment = new Comment({
      snippetID: commentContent.snippetId,
      content: commentContent.content,
      author: req.session.username, // Associate comment with the currently logged-in user
    });

    //saving the data and sending 201 to indicate success
    await newComment.save();
    return res.status(201).json('Comment created successfully');
  } catch (error) {
    return res.status(500).json(error);
  }
}

// Function to get all code snippets
async function getAllComments(req, res) {

  //mongoose method to find objects and get their data 
  try {
    const comments = await Comment.find().populate('snippetID', 'content');
    return comments;
  } catch (error) {
    return error;
  }
}

async function getSnippetComments(req, res) {
  //find comments by req (snippetID)
  const result = await Comment.find(req);
  return result;
}

module.exports = { createComment, getAllComments, getSnippetComments};