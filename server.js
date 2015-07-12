var express = require('express'); 
var bodyParser = require('body-parser');
var app = express();
var _ = require("underscore");

app.use(bodyParser.urlencoded({extended: true}));

// serve js and css files from public folder
app.use(express.static(__dirname + '/public')); 

//ROUTES

// root route (serves index.html)
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// Landing page in case index.html failes to load
app.get('/', function (req, res) {
	res.send('Hola Mundo!');
});

//pre seeded blog post data
var blogPosts = [
  {id: 1, author: 'Rob', location: 'California', postTitle: 'Conquering Yosemite\'s Half Dome', userPost: 'Did you know that anyone who\'s in shape and willing to suffer a whole day can climb Yosemite\'s Half Dome? Well, you can. First of all, you\'ll need a permit which you can get at Recreation.gov and pay a reservation fee if you\'re able to score a permit. You will not be able to go up the cables without a permit, I repeat, the ranger will deny you access to the cables if you don\'t have a permit.'},
  {id: 2, author: 'Fer', location: 'Kansas', postTitle: 'Mountaineering in Kansas', userPost: 'Mountaineering in Kansas has to be one of the easiers parts of the country where you can climb a mountain. Just kidding, there\s no mountains in Wichita. Go to the next state, ColoRADo, now that\'s a place where you\'ll have fun summiting mountains.'}
];

// posts index
app.get('/api/posts', function (req, res) {
// send all users as JSON response
  res.json(blogPosts);
});

// route for single id
app.get('/api/posts/:id', function(req, res) {
  // if no post id is found, alert the user
  if(blogPosts.length < req.params.id) {
    res.statusCode = 404;
    return res.send('Error 404: No post found');
  } 
  // find a specific id
    var singlePost = parseInt(req.params.id);
    var targetId = _.findWhere(blogPosts, {id: singlePost});
  res.json(targetId);
});

// create new post
app.post('/api/posts', function (req, res) {
  // grab params (word and definition) from form data
  var newPost = req.body;
  // set sequential id (last id in `phrases` array + 1)
  if (blogPosts.length > 0) {
    newPost.id = blogPosts[blogPosts.length - 1].id +  1;
  } else {
    newPost.id = 0;
  }
  // add newPhrase to `phrases` array
  blogPosts.push(newPost);
  // send newPostas JSON response
  res.json(newPost);
});

// update post
app.put('/api/posts/:id', function(req, res) {
  // set the value of the id
  var postId = parseInt(req.params.id);
  // find item in `blogPosts` array matching the id
  var targetPost = _.findWhere(blogPosts, {id: postId});
  // update post keys
  targetPost.author = req.body.author;
  targetPost.location = req.body.location;
  targetPost.postTitle = req.body.postTitle;
  targetPost.userPost = req.body.userPost;
  // send back edited object
  res.json(targetPost);
});

// delete phrase
app.delete('/api/posts/:id', function(req, res) {
  
  // set the value of the id
  var postId = parseInt(req.params.id);

  // find item in `phrases` array matching the id
  var targetPost = _.findWhere(blogPosts, {id:postId});
  // get the index of the found item
  var index = blogPosts.indexOf(targetPost);
  // remove the item at that index, only remove 1 item
  blogPosts.splice(index, 1);
  // send back deleted object
  res.json(targetPost);
});

// Listen on port 3000
app.listen(3000, function () {
	console.log('Server running at full speed!');
});