var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var db = require('./db/mongolabClient');
var Thread = db.Thread;
var Post = db.Post;

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var forumRouter = express.Router();

forumRouter.route('/threads')

  .post(function(req, res) {

    Thread.postThread(req.body.title, req.body.author, req.body.text)

      .then(function(thread_id){

        res.json({thread_id: thread_id});

      })

      .catch(function(err){
        res.send(err);
      });

  })


  .get(function(req, res) {

    Thread.getThreads()

      .then(function(threads) {

        res.json(threads);

      });

  });

forumRouter.route('/threads/:thread_id')
  
  .post(function(req, res) {

    Post.reply(req.params.thread_id, req.body.author, req.body.text)

      .then(function(thread) {

        res.json(thread);

      });

  })

  .get(function(req, res) {

    Thread.getFullThread(req.params.thread_id)

      .then(function(thread) {

        res.json(thread);

      });

  });

app.use(forumRouter);

app.listen(3000, function() {
  console.log('Get to posting at localhost:3000.');
});
