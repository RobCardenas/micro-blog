$(function() {

    // global variables
    // variable that stores user posts
    var $postList = $("#post-list");

    // variable that stores new submissions
    var $newPostSub = $("#new-post-submission");

    // underscore template
    var postTemplate = _.template($('#post-template').html());

    function UserPost(author,postTitle,userPost) {
        this.author = author;
        this.postTitle = postTitle;
        this.userPost = userPost;
    }

    UserPost.allPosts = [];

    var testerPost = new UserPost("Rob", "Kukulkan, the Ancient Serpent","The Ancient Serpent worshipped by the Mayans was....");

    UserPost.prototype.save = function() {
        // saves new posts to array
        UserPost.allPosts.push(this);
    };

    testerPost.save();

    // Function that renders tasks into ToDo array
    UserPost.prototype.render = function() {
        return postTemplate;
    };

    // appends existing todos (from seed data) to `$taskOL`
    _.each(UserPost.allPosts, function (post, index) {
        var $posts = $(postTemplate(post));
        $posts.attr('data-index', index);
        $postList.append($posts);
    });

    // on click to submit our data
    $newPostSub.on("submit", function(event) {
    event.preventDefault();

    // create new todo object from form data
    var newAuthor = $('#author-name').val();
    var newPostTitle = $('#new-post-title').val();
    var newPostContent = $('#new-post-content').val();
    var newPost = new UserPost(newAuthor,newPostTitle,newPostContent);

    newPost.save();

    // append our new todo to the page
    var $posts = $(postTemplate(newPost));

    $posts.attr('data-index', newPost.author, newPost.postTitle, newPost.userPostContent);
    $postList.append($posts);

    // reset the form
    $newPostSub[0].reset();
    $("#author-name").focus();

  });

});