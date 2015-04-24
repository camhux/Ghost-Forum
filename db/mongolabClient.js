var mongoose = require('mongoose');
var URL = require('./mongolabCredential');
var ThreadModel = require('./ThreadModel');
var PostModel = require('./PostModel');

mongoose.connect(URL, function(err) {
  
  if (err) {
    console.log(err);
  } else {
    console.log('Successfully connected to Mongolab');
  }

});

var db = mongoose.connection;

exports.Thread = ThreadModel;
exports.Post = PostModel;