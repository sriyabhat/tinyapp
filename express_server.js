const express = require('express');

//SERVER created
const app = express();

const PORT = 8080;


const urlDatabase = {  
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

//Process GET request (HomePage)
app.get('/', (req, res) => {
  res.send("Hello");
});



//Server Listens 
app.listen(PORT,() => {
  console.log(`Example app listening on Port ${PORT}`);
});