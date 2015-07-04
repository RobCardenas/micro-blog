
    // global variables
    var $postContainer = $('#post-container');
    var $author = $('#author');
    var $postTitle = $('#post-title');
    var $userPostContent = $('#post-content'); 

    // variable that stores underscore template
    var $postTemplate = _.template($('#post-template').html());


    // Constructor function
    function UserPost(author, postTitle, postContent) {
        this.author = author;
        this.postTitle = postTitle;
        this.postContent = postContent; 
    }

    // Testing data
    UserPost.allPosts = [
        new UserPost('Rob','Kukulkan, the Ancient Serpent','During ancient times the Mayans worshipped the wise Serpent'),
        new UserPost('Bere','The World\'s Most Venomous Snakes','This world is filled with tiny creatures but powerful enought to...')
    ];

    // Save function
    UserPost.prototype.save = function() {
        UserPost.allPosts.push(this);
        console.log(UserPost.allPosts);
    };
    
 

