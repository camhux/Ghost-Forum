var mongoose = require('mongoose');

var threadSchema = new mongoose.Schema({
  title: String,
  author: String,
  timestamp: {type: Date, default: Date.now},
  body: {type: String, default: ''},
  replies: {type: Array, default: []}
});

var ThreadModel = module.exports = mongoose.model('ThreadModel', threadSchema);


