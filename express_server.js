const express = require('express');

//SERVER created
const app = express();

const PORT = 8080;

app.set('view engine','ejs');

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


app.get('/urls', (req, res) => {  
  const templateVars = { urls : urlDatabase };
  res.render('urls_index', templateVars);
});


app.get('/urls/:shortURL', (req, res) => {    
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
  res.render('urls_show', templateVars);
})

//Server Listens 
app.listen(PORT,() => {
  console.log(`Example app listening on Port ${PORT}`);
});