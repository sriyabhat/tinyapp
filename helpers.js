//check if the email exists, if yes return the matching user object
const checkUserEmail = function(db,email){
   for (let user in db) {
     if (db[user].email === email) {       
       return db[user];
     }    
   }
   return null;  
};

//Return list of URLS for the User(ID)
const getUrlsForUser = (db,ID) => {
  let userUrls = {};  
  for(let url in db) {
    if(db[url].userID === ID) {      
      userUrls[url] = db[url];
    }
  }
  return userUrls;
};

//check if the URL exists
const urlExists = (db,shortUrl) => {
  for(let url in db) {
    if(url === shortUrl){
      return true;
    }
  }
  return false;
}

//used for generating 6 letter random strings 
const generateRandomString = () => {
  return Math.random().toString(36).substring(2,8);
};


module.exports = { checkUserEmail,getUrlsForUser,urlExists,generateRandomString };