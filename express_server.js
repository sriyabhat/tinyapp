const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

//SERVER created
const app = express();

const PORT = 5000;

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser())

const urlDatabase = {  
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const users = {
  "user1RandomID" : {
    id : "user1RandomID",
    email : "user1@something.com",
    password : "i dont know"
  },
  "user2RandomID" : {
    id : "user2RandomID",
    email : "user2@something.com",
    password : "danger zone"
  }
};



const generateRandomString = () => {
  return Math.random().toString(36).substring(2,8);
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
  
  (req.cookies["user_id"]) ? user = users[req.cookies["user_id"]] : user = null;

  const templateVars = { urls : urlDatabase, user };
  console.log(templateVars);
  console.log(req.cookies["user_id"]);
  console.log(users);
  res.render('urls_index', templateVars);
});

//Display a page which allows to add new URL 
app.get('/urls/new', (req, res) => {
  (req.cookies["user_id"]) ? user = users[req.cookies["user_id"]] : user = null;
  const templateVars = { user };
  res.render('urls_new',templateVars);
});

//Display the specified URL
app.get('/u/:shortURL', (req, res) => {
  //const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
  //res.render('urls_show', templateVars);
 
  longURL = urlDatabase[req.params.shortURL];
  
  if(longURL) {
    res.statusCode = 300;
    res.redirect(longURL);
  } else {
    res.render('404');
  }
  
});

//Render the EDIT URL page
app.get('/urls/edit/:ID', (req,res) => {
  (req.cookies["user_id"]) ? user = users[req.cookies["user_id"]] : user = null;
  const templateVars = {shortURL : req.params.ID, longURL : urlDatabase[req.params.ID], user};
  res.render('urls_show',templateVars);

});

//Render User Registration Page 
app.get('/register', (req,res) => {
  (req.cookies["user_id"]) ? user = users[req.cookies["user_id"]] : user = null;
  res.render('user_registration_form',{user});
});

//POST request to add a new URL
app.post('/urls', (req,res) => {
  //save the shortURL - random 6 letter string and the Long URl in the database;
  const shortURL = generateRandomString();
  const longURL = req.body.longURL;
  urlDatabase[shortURL] = longURL;
  
  res.redirect(`/u/${shortURL}`);
});


//POST request to delete a URL
app.post('/urls/:shortURL/delete', (req,res) => {
  const shortURL = req.params.shortURL;
  delete urlDatabase[shortURL];
  res.redirect('/urls');  
});

//POST request to edit a new URL
app.post('/urls/:ID', (req,res) => {
  
  const shortURL = req.params.ID;
  const longURL = req.body.longURL;
  urlDatabase[shortURL] = longURL;
  
  res.redirect(`/urls`);
});

//set a cookie on Login
app.post('/login', (req, res) => {
  res.cookie ("userName",req.body.userName);
  res.redirect('/urls');
});

//clear a cookie afte logout
app.post('/logout', (req,res) => {
  res.clearCookie("user_id");
  console.log("in the logout route")
  res.redirect('/urls');
});

//POST request to save the new USER
app.post('/register', (req,res) => {
  const userID = generateRandomString();
  
  users[userID] = {id :userID, email : req.body.email, password : req.body.password};
  res.cookie("user_id",userID); 
  console.log(users);
  res.redirect('/urls');

});

//Server Listens 
app.listen(PORT,() => {
  console.log(`Example app listening on Port ${PORT}`);
});