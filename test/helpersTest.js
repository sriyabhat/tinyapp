const { assert } = require('chai');

const { checkUserEmail, urlExists, getUrlsForUser } = require('../helpers.js');

const testUsers = {
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
};

const testUrls = {  
  "b2xVn2": {longURL: "http://www.lighthouselabs.ca", userID : "userRandomID"},
  "9sm5xK": {longURL: "http://www.google.com", userID : "user2RandomID"},
  "xyz4rk": {longURL: "http://www.google.com", userID : "userRandomID"}
};

describe('checkUserEmail', function() {
  it('should return a user with valid email', function() {
    const user = checkUserEmail(testUsers,"user@example.com");
    const expectedOutput = testUsers["userRandomID"];    
    assert.deepEqual(user, expectedOutput);
  });

  it('should return null if the email doesnot exist',function(){
    const user = checkUserEmail(testUsers,"userx@example.com");
    assert.equal(user,null);
  });

  it('should return true if the shortURl exists',function(){
    assert.equal(urlExists(testUrls,'b2xVn2'),true);
  });

  it('should return false if the shortURl does not exist',function(){
    assert.equal(urlExists(testUrls,'b2hhh2'),false);
  });

  it('should return object containg the list of Urls for the User if exists',function(){
    const userUrls = getUrlsForUser(testUrls,"userRandomID");
    const expectedOutput = {"b2xVn2": {longURL: "http://www.lighthouselabs.ca", userID : "userRandomID"},
    "xyz4rk": {longURL: "http://www.google.com", userID : "userRandomID"}};
    assert.deepEqual(userUrls,expectedOutput);
  });

  it('should return an empty object if the User has not saved any Urls',function(){
    const userUrls = getUrlsForUser(testUrls,"userxRandomID");
    const expectedOutput = {};
    assert.deepEqual(userUrls,expectedOutput);
  });
 
});