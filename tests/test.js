'use strict';

var getIcon = require('../src/js/icon.js'),
  should = require('chai').should();

describe('Get Icon', function () {

  it('should return a pdf icon when the resource name ends in ".pdf"', function () {
    getIcon("example.pdf").should.equal("description");
  });

  it('should return a youtube icon when the resource contains "youtube"', function () {
    getIcon("https://www.youtube.com/watch?v=WVvdw-f4Ygo&index=4&list=PLqGj3iMvMa4KOekRWjjajinzlRK879Ksn").should.equal("video_library");
  });

  it('should return a book icon when the resource starts in "http"', function () {
    getIcon("http://api.jquery.com/jquery.ajax/").should.equal("library_books");
  });

  it('should return a class icon when the resource does not match anything', function () {
    getIcon("test_resource").should.equal("class");
  });

});
