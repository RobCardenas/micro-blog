$(function() {
    // Constructor function
    function UserPost(author, postTitle, postContent) {
        this.author = author;
        this.postTitle = postTitle;
        this.postContent = postContent; 
    }

    // Testing data
    UserPost.allPosts = [
        new UserPost('Rob','Kukulkan, the Ancient Serpent','During ancient times, the Mayans worshipped the wise Serpent');
        new UserPost('Bere','The World\'s Most Venomous Snakes','This world is filled with tiny creatures but powerful enought to...');
    ];
    

});