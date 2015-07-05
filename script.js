$(function() {

    
    // Tooltip to tell user they can hide the welcome post 
    $(function () {
    $('[data-toggle="tooltip"]').tooltip();
    });

    // Welcome posts fades away when clicked
    var $welcomePost = $('.hp-post');
    $welcomePost.on("click", function() {
    $(this).fadeOut(1600);
    });

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

    var testerPost = new UserPost("Rob", "Conquering Yosemite's Half Dome","Did you know that anyone who's in shape and willing to suffer a whole day can climb Yosemite's Half Dome? Well, you can. First of all, you'll need a permit which you can get at Recreation.gov and pay a reservation fee if you're able to score a permit. You will not be able to go up the cables without a permit, I repeat, the ranger will deny you access to the cables if you don't have a permit.  ");

    UserPost.prototype.save = function() {
        // saves new posts to array
        UserPost.allPosts.push(this);
    };

    testerPost.save();

    // Function that renders tasks into UserPost array
    UserPost.prototype.render = function() {
        return postTemplate;
    };

    // appends existing posts (from seed data) to `$postList`
    _.each(UserPost.allPosts, function (post, index) {
        var $posts = $(postTemplate(post));
        $posts.attr('data-index', index);
        $postList.append($posts);
    });

    // on click to submit our data
    $newPostSub.on("submit", function(event) {
        event.preventDefault();

        // create new post object from form data
        var newAuthor = $('#author-name').val();
        var newPostTitle = $('#new-post-title').val();
        var newPostContent = $('#new-post-content').val();
        var newPost = new UserPost(newAuthor,newPostTitle,newPostContent);

        if (newAuthor === '' || newPostTitle === '' || newPostContent === '' ) {
            alert("All fields required")

        } else {
            newPost.save();
            // append our new post to the page
            var $posts = $(postTemplate(newPost));
            $posts.attr('data-index', newPost.author, newPost.postTitle, newPost.userPostContent);
            $postList.append($posts);
        }

        // reset the form
        $newPostSub[0].reset();
        $("#author-name").focus();

  });

});