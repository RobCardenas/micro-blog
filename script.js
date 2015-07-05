$(function() {

    // global variables
    var author = $('#author').val();
    var postTitle = $('#post-title').val();
    var userPostContent = $('#post-content').val();

    // variable that stores user posts
    var $postList = $("#post-list");

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

});