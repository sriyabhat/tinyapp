const express = require('express');
const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session')
const {checkUserEmail,getUrlsForUser,urlExists,generateRandomString} = require('./helpers');
const { hashPassword } = require('./crypt');
const { hash } = require('bcrypt');


//SERVER created
const app = express();

const PORT = 8080;

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended : true}));
//app.use(cookieParser())
app.use(cookieSession({
  name: 'session',
  keys: ['$2b$10$8p4coXV9lIA.W8o6TDez1.jmzEpc1c4ulMf0CHFi/XdkVVHcJAVFK', '$2b$10$8p4coXV9lIA.W8o6TDez1.hTzDyZxTQqyiThJcaiuABB2pKQHWGCG']
}))

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





//Process GET request (HomePage)
app.get('/', (req, res) => {
  res.send("Hello");
});

//send json String
app.get('/urls.json', (req,res) => {
  res.json(urlDatabase);
});

//send HTML 
app.get('/hello',(req,res) => {
  res.send("<html><body>Hello <b>World</b></body></html>");
});

//Display all the URLS
app.get('/urls', (req, res) => {    
  
  (req.session["user_id"]) ? user = users[req.session["user_id"]] : user = null;

  const urlsForUser = getUrlsForUser(urlDatabase,req.session["user_id"]);
  
  const templateVars = { urls : urlsForUser, user };  
  res.render('urls_index', templateVars);
});

//Display a page which allows to add new URL 
app.get('/urls/new', (req, res) => {
  (req.session["user_id"]) ? user = users[req.session["user_id"]] : user = null;
  if(user){
    const templateVars = { user };
    res.render('urls_new',templateVars);
  } else {
    res.redirect('/login');
  }
  
});

//Display the specified URL
app.get('/u/:shortURL', (req, res) => {
  //const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
  //res.render('urls_show', templateVars);
 
  const {longURL} = urlDatabase[req.params.shortURL];
  
  if(longURL) {
    res.statusCode = 300;
    res.redirect(longURL);
  } else {
    res.render('404');
  }
  
});

//Render the EDIT URL page
app.get('/urls/edit/:ID', (req,res) => {
  (req.session["user_id"]) ? user = users[req.session["user_id"]] : user = null;
  const templateVars = {shortURL : req.params.ID, longURL : urlDatabase[req.params.ID].longURL, user};
  res.render('urls_show',templateVars);

});

//Render User Registration Page 
app.get('/register', (req,res) => {
  (req.session["user_id"]) ? user = users[req.session["user_id"]] : user = null;
  res.render('user_registration_form',{user});
});

//Render a Login Page
app.get('/login', (req,res) => {
  res.render('login_form', {user : null});
});

//POST request to add a new URL
app.post('/urls', (req,res) => {
  //save the shortURL - random 6 letter string and the Long URl in the database;
  const shortURL = generateRandomString();
  const longURL = req.body.longURL;
  const userID = req.session["user_id"];
  urlDatabase[shortURL] = {longURL, userID};
  
  res.redirect(`/u/${shortURL}`);
});


//POST request to delete a URL
app.post('/urls/:shortURL/delete', (req,res) => {
  let found = false;
  const shortURL = req.params.shortURL;

  const userUrls = getUrlsForUser(urlDatabase,req.session["user_id"]);  
  if(Object.keys(userUrls).length !== 0) {
     found = urlExists(userUrls,shortURL);
  }
 
  if(found) {        
    delete urlDatabase[shortURL];    
    res.redirect('/urls');
  } else {
    res.send('Access Denied');
  }
    
});

//oelot6
//POST request to edit a new URL
app.post('/urls/:ID', (req,res) => {
  
  let found = false;
  const shortURL = req.params.ID;

  const userUrls = getUrlsForUser(urlDatabase,req.session["user_id"]);
  if(Object.keys(userUrls).length !== 0) {
     found = urlExists(userUrls,shortURL);
  }
 
  if(found) {  
    const longURL = req.body.longURL;
    urlDatabase[shortURL].longURL = longURL;  
    res.redirect(`/urls`);
  } else {
    res.send('Access Denied');
  }

});

//set a cookie on Login
app.post('/login', (req, res) => {

  const {email, password} = req.body; 
  
  const user = checkUserEmail(users,email);
 
  if(user) {
    if(user.password === hashPassword(password)) {
      req.session["user_id"] = user["id"];
      return res.redirect('/urls');
    }  
  } 

  res.statusCode = 403;
  res.send("Invalid Credentials");
  
});

//clear a cookie afte logout
app.post('/logout', (req,res) => {
  req.session["user_id"] = "";
  res.redirect('/urls');
});

//POST request to save the new USER
app.post('/register', (req,res) => {
  const { email , password } = req.body;
  
  if(!(email && password)) {
    res.statusCode = 400
    return res.send('Email are password are mandatory!');
  }
  const user = checkUserEmail(users,email);
  if (user) {
    res.statusCode = 400;
    return res.send('Email already exists');
  }  
  const userID = generateRandomString();  
  users[userID] = {id :userID, email, password: hashPassword(password) };
  req.session["user_id"] = userID; 
  console.log(users); 
  res.redirect('/urls');

});

//Server Listens 
app.listen(PORT,() => {
  console.log(`Example app listening on Port ${PORT}`);
});