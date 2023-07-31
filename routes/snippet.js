const express = require('express');
const router = express.Router();
const { createSnippet, getAllSnippets } = require('../controllers/snippetC');
const { checkForLogin } = require('../middleware/auth');

// Route for creating a new code snippet
router.post('/addsnippets', checkForLogin, createSnippet);

// Route for fetching all code snippets
router.post('/snippets', async function (req, res, next) {
  //using snippetC controller to get snippet data 
    try {
      const snippets = await getAllSnippets();
      res.status(200).json(snippets);
    } catch (error) {
        console.log(error)
      res.status(500).json(error);
    }
});

module.exports = router;