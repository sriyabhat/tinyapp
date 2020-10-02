const { hashPassword } = require('../crypt');
const urlDatabase = {  
  "b2xVn2": {longURL: "http://www.lighthouselabs.ca", userID : "user1RandomID"},
  "9sm5xK": {longURL: "http://www.google.com", userID : "user2RandomID"}
};

const users = {
  "user1RandomID" : {
    id : "user1RandomID",
    email : "user1@something.com",
    password : hashPassword("i dont know")
  },
  "user2RandomID" : {
    id : "user2RandomID",
    email : "user2@something.com",
    password : hashPassword("danger zone")
  }
};

module.exports = {urlDatabase, users};