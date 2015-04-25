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

    var output;

    var thread = new ThreadModel({

      title: title,
      author: author,
      body: body

    });

    thread.save(function(err) {

      if (err) {
        console.log(err);
      } else {
        output = thread._id;
      }

    });

    return output;

  },

  getThreads: function() {

    var output;

    output = ThreadModel.find(null, 'title author timestamp', function(err, threads) {

      if (err) {
        console.log(err);
        return err;
      } else {
        return threads;
      }

    });

    console.log(output);

    return output;

  },

  getFullThread: function(id) {

    var output;

    ThreadModel.findById(id, function(err, thread) {

      if (err) {
        console.log(err);
      } else {
        output = thread;
      }

    });

    return output;

  }

}

exports.Post = {

  reply: function(thread_id, author, body) {

    var output;

    ThreadModel.findByIdAndUpdate(thread_id, 

      {$push: {replies: new PostModel({author: author, body: body})}},

      function(err, thread) {

        if (err) {
          console.log(err);
        } else {
          output = thread;
        }

    });

    return output;

  }

}