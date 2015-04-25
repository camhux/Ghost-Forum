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

    return new Promise(function(resolve, reject) {

      thread.save(function(err) {

        if (err) {

          reject(err);

        } else {

          resolve(thread._id);

        }

      });

    });

  },

  getThreads: function() {

    return new Promise(function(resolve, reject) {

      ThreadModel.find(null, 'title author timestamp', function(err, threads) {

        if (err) {

          console.log(err);
          reject(err);

        } else {

          resolve(threads);

        }

      });

    });

  },

  getFullThread: function(id) {

    return new Promise(function(resolve, reject) {

      ThreadModel.findById(id, function(err, thread) {

        if (err) {

          reject(err);

        } else {

          resolve(thread);

        }

      });

    });

  }

}


exports.Post = {

  reply: function(thread_id, author, body) {

    var newPost = new PostModel({author: author, body: body});

    return new Promise(function(resolve, reject) {

      ThreadModel.findByIdAndUpdate(thread_id,

        {$push: {replies: newPost}},

        function(err, thread) {

          if (err) {

            reject(err);

          } else {

            resolve(thread);

          }

        });

    });

  }

}