var cheerio = require('cheerio');
var request = require('request');
var expect = require('chai').expect;
var users = require("../server.js");

describe('Google.com', function() {
  it('should have a title of "Google"', function(done) {
    request('https://google.com/', function(err, res, body) {
      var $ = cheerio.load(body);
      var title = $('title').text();
      expect(title).to.equal('Google');
      // expect(title).to.equal('Moogle');
      done();
    })
  })
});

// Test number 1 using cheerio
// one success test and one fail
describe('Testing the title element', function() {
  it('title should read "Hiker Paradise | Share your expertise"', function(done) {
    request('http://localhost:3000/', function(err, res, body) {
      var $ = cheerio.load(body);
      var title = $('title').text();
      expect(title).to.equal('Hiker Paradise | Share your expertise');
      // expect(title).to.equal('Hiker Hell | Share bad tips');
      done();
    })
  })
});

// test number 2 using cheerio
// one success test and one fail
describe('Testing h1 elements with a class', function() {
  it('h1 should read "Welcome to Hiker Paradise"', function(done) {
    request('http://localhost:3000/', function(err, res, body) {
      var $ = cheerio.load(body);
      var h1 = $('.welcome-h1').text();
      expect(h1).to.equal('Welcome to Hiker Paradise');
      // expect(title).to.equal('Welcome to Hiker Hell');
      done();
    })
  })
});

describe('Testing post-list id', function() {
  it('It should not be empty', function(done) {
    request('http://localhost:3000/', function(err, res, body) {
      var $ = cheerio.load(body);
      var postList = $('#post-list').length;
      expect(postList).to.equal(1);
      done();
    })
  })
});

