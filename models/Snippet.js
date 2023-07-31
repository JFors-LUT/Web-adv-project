const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//snippet schema for database
const snippetSchema = new Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  comments: Array,
});

const Snippet = mongoose.model('Snippet', snippetSchema);

module.exports = Snippet;
