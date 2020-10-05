const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session')
const {checkUserEmail,getUrlsForUser,urlExists,generateRandomString} = require('./helpers');
const { hash } = require('bcrypt');
const { hashPassword } = require('./crypt');
const {urlDatabase, users} = require('./db/data-objects');
const PORT = 8080;

module.exports = {
  express,
  bodyParser,
  cookieSession,
  checkUserEmail,
  getUrlsForUser, 
  urlExists,
  generateRandomString,
  hash,
  hashPassword,
  urlDatabase,
  users,
  PORT  
}