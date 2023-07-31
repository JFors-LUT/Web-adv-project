const Snippet = require('../models/snippet');

// Function to handle code snippet creation
async function createSnippet(req, res) {
  const newSnip = req.body;

  //check snippet not empyt
  if(newSnip.newSnip === ""){
    return res.status(400).json("Please enter a snippet before submitting.")
  }

  try {
    const newSnippet = new Snippet({
      title: req.session.username,
      content: newSnip.newSnip,
      author: req.session.userId, // Associate the snippet with the currently logged-in user
      comments: [],
    });

    //save snippet and inform user
    await newSnippet.save();
    return res.status(201).json('Snippet created successfully');
  } catch (error) {
    return res.status(500).json(error);
  }
}
// calling mongoose method to get all snippets
async function getAllSnippets(req, res) {
  try {
    const snippets = await Snippet.find().populate('title', 'content');
    return snippets;
  } catch (error) {
    return error;
  }
}

module.exports = { createSnippet, getAllSnippets };
