//check if the email exists, if yes return the matching user object
const checkUserEmail = function(db,email){
   for (let user in db) {
     if (db[user].email === email) {       
       return db[user];
     }    
   }
   return null;  
};



const getUrlsForUser = (db,ID) => {
  let userUrls = {};
  
  for(let url in db) {
    if(db[url].userID === ID) {      
      userUrls[url] = db[url];
    }
  }
  return userUrls;
}

const urlExists = (db,shortUrl) => {
  for(let url in db) {
    if(url === shortUrl){
      return true;
    }
  }
  return false;
}

module.exports = { checkUserEmail,getUrlsForUser,urlExists };