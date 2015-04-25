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

    Thread.postThread(req.body.title, req.body.author, req.body.text);

    res.status(200).end();

  })


  .get(function(req, res) {

    var data = Thread.getThreads();
    console.log(data);
    res.json(data);

  });

forumRouter.route('/threads/:thread_id')
  
  .post(function(req, res) {

    Post.reply(req.params.thread_id, req.body.author, req.body.text);

    res.status(200).end();

  })

  .get(function(req, res) {

    var data = Thread.getFullThread(req.params.thread_id);
    res.send(data);

  });

app.use(forumRouter);

app.listen(3000, function() {
  console.log('Get to posting at localhost:3000.');
});
