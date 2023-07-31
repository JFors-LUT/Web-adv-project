const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//comment schema for database
const commentSchema = new Schema({
    snippetID: String,
    content: String,
    author: String,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
