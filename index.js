var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db/mongolabClient');
var Thread = db.Thread;

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var forumRouter = express.Router();

forumRouter.route('/threads')

  .post(function(req, res) {

    var thread = new Thread({
      title: req.body.title,
      author: req.body.author,
      body: req.body.text
    });

    thread.save(function(err) {

      if (err) {
        console.log(err)
      } else {
        res.json({thread_id: thread._id});
      }

    });

  })

  .get(function(req, res) {

    Thread.find(null, 'title author timestamp').exec(function(err, threads) {
      if (!err) res.json(threads); 
    });

  });

forumRouter.route('/threads/:thread_id')
  
  .post(function(req, res) {

    Thread.findByIdAndUpdate(req.params.thread_id, 

      {$push: {replies: new Post(req.body.author, req.body.text)}},

      function(err, thread) {

        if (!err) {
          res.json(thread);
        } else {
          console.log(err);
        }

      });

  })

  .get(function(req, res) {

    Thread.findOne({_id: req.params.thread_id}, function(err, thread) {

      if (!err) {
        res.json(thread);
      } else {
        console.log(err);
      }

    })

  });

app.use(forumRouter);

app.listen(3000, function() {
  console.log('Get to posting at localhost:3000.');
});

// New post constructor
function Post(author, body) {
  this.author = author;
  this.body = body;
  this.timestamp = Date.now();
}