const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  url: { type: String, required: true },
  caption: String,
});

module.exports = mongoose.model('Post', postSchema);
