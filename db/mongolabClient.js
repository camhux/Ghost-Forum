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

   return ThreadModel.find(null, 'title author timestamp').exec();

  },

  getFullThread: function(id) {

    return ThreadModel.findById(id);

  }

}


exports.Post = {

  reply: function(thread_id, author, body) {

    return ThreadModel.findByIdAndUpdate(thread_id,

      {$push: {replies: new PostModel({author: author, body: body})}});

  }

}