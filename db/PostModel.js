var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  author: {type: String, default: ''},
  timestamp: {type: Date, default: Date.now},
  body: {type: String, default: ''}
});

var PostModel = module.exports = mongoose.model('PostModel', postSchema);