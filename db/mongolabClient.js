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


exports.Thread = {

  postThread: function(title, author, body) {

    var thread = new ThreadModel({

      title: title,
      author: author,
      body: body

    });

    return thread.save();

  },

  getThreads: function() {

   return ThreadModel.find(null, 'title author timestamp');

  },

  getFullThread: function(thread_id) {

    return ThreadModel.findById(thread_id);

  },

  editThreadBody: function(thread_id, text) {

    return ThreadModel.findByIdAndUpdate(thread_id,

      {$set: {body: text}});

  },

  deleteThread: function(thread_id) {

    return ThreadModel.findByIdAndRemove(thread_id);

  }

}


exports.Post = {

  reply: function(thread_id, author, text) {

    var newPost = new PostModel({author: author, body: text});

    return ThreadModel.findByIdAndUpdate(thread_id,

      {$push: {replies: newPost}},

      {new: true});

  }

}