const express = require('express');
const bodyParser = require('body-parser');

//SERVER created
const app = express();

const PORT = 5000;

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended : true}));

const urlDatabase = {  
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
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
  const templateVars = { urls : urlDatabase };
  res.render('urls_index', templateVars);
});

//Display a page which allows to add new URL 
app.get('/urls/new', (req, res) => {
  res.render('urls_new');
});

//Display the specified URL
app.get('/urls/:shortURL', (req, res) => {    
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
  res.render('urls_show', templateVars);
});

//POST request to add a new URL
app.post('/urls', (req,res) => {
  console.log(req.body);
  res.send('ok');
});

//Server Listens 
app.listen(PORT,() => {
  console.log(`Example app listening on Port ${PORT}`);
});