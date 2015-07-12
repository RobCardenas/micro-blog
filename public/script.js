// CLIENT-SIDE JAVASCRIPT

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

  // `postsController` holds all our posts funtionality
  var postsController = {
    
  // compile phrase template
  template: _.template($('#post-template').html()),

  // pass each phrase object through template and append to view
  render: function(postObj) {
    var $postHtml = $(postsController.template(postObj));
    $('#post-list').append($postHtml);
  },

  all: function() {
    $.getJSON('/api/posts', function(data) {
      var allPosts = data;
        
      // iterate through allPosts
      _.each(allPosts, function(post) {
        // pass each post object through template and append to view
        var $postHtml = $(postsController.template(post));
        $('#post-list').append($postHtml);
      });
      // add event-handlers to posts for updating/deleting
      postsController.addEventHandlers();
    });
  },

  create: function(newAuthor, newLocation, newPostTitle, newUserPost) {
    var postData = {author: newAuthor, location: newLocation, postTitle: newPostTitle, userPost: newUserPost};
    // send POST request to server to create new post
    $.post('/api/posts', postData, function(data) {
      // pass post object through template and append to view
      var $postHtml = $(postsController.template(data));
      $('#post-list').append($postHtml);
    });
  },

  update: function(postId, updAuthor, updLocation, updPostTitle, updUserPost) {
    // send PUT request to server to update post
    $.ajax({
      type: 'PUT',
      url: '/api/posts/' + postId,
      data: {
        author: updAuthor,
        location: updLocation,
        postTitle: updPostTitle,
        userPost: updUserPost
      },
      success: function(data) {
        var updatedPost = data;

        // replace existing post in view with updated post
        var $postHtml = $(postsController.template(updatedPost));
        $('#post-' + postId).replaceWith($postHtml);
      }
    });
  },
    
    delete: function(postId) {
      // send DELETE request to server to delete post
      $.ajax({
        type: 'DELETE',
        url: '/api/posts/' + postId,
        success: function(data) {
          // remove deleted post from the view
          $('#post-' + postId).remove();
        }
      });
    },

    // add event-handlers to posts for updating/deleting
    addEventHandlers: function() {
      $('#post-list')
        // for update: submit event on `.update-post` form
        .on('submit', '.update-post', function(event) {
          event.preventDefault();
          var postId = $(this).closest('.post').attr('data-id');
          var updatedWord = $(this).find('.updated-author').val();
          var updatedDefinition = $(this).find('.updated-location').val();
          var updatedTitle = $(this).find('.updated-post-title').val();
          var updatedPost = $(this).find('.updated-user-post').val();
          postsController.update(postId, updatedWord, updatedDefinition,updatedTitle,updatedPost);
        })
        // for delete: click event on `.delete-post` button
        .on('click', '.delete-post', function(event) {
          event.preventDefault();
          var postId = $(this).closest('.post').attr('data-id');
          postsController.delete(postId);
        });
    },

    setupView: function() {
      // append existing posts to view
      postsController.all();
      
      // add event-handler to new-post form
      $('#new-post-submission').on('submit', function(event) {
        event.preventDefault();
        var author = $('#author-name').val();
        var location = $('#author-location').val();
        var newPostTitle = $('#new-post-title').val();
        var newPostContent = $('#new-post-content').val();
        postsController.create(author,location,newPostTitle,newPostContent);
        
        // reset the form
        $(this)[0].reset();
        $('#author-name').focus();
        // Post Counter
        // var $postCount = 0;
        // console.log(postsController.all.blogPosts.length);
        // if ( postsController.all().length === [] ) {
        //     $postCount;
        // } else {
        //     $postCount += postsController.all().length;
        // }

        // var el = document.querySelector("#post-count");
        // el.innerText = "Post Count: " + $postCount;

      });
    }
  };

  postsController.setupView();

});
