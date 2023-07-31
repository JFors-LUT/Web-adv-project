const express = require('express');
const router = express.Router();
const { checkForLogin } = require('../middleware/auth');
const { createComment, getAllComments, getSnippetComments} = require('../controllers/commentC.js');

//routes for comments
router.post('/addcomment', checkForLogin, createComment);

//route to fetch all comments for all snippets, not used in current build
router.post('/comments', async function(req, res, next) {
  try {
    const comments = await getAllComments();
    res.status(200).json(comments);
  } catch (error) {
      console.log(error)
    res.status(500).json(error);
  }
});

//fetching comment according to snippetID for 
router.get('/comments/snippet/:snippetID', async function (req, res) {
  const filterComments = req.params;
  const comments = await getSnippetComments(filterComments);

  res.status(200).json(comments);
});

module.exports = router;