//check if the email exists, if yes return the matching user object
const checkUserEmail = function(db,email){
   for (let user in db) {
     if (db[user].email === email) {
       return {user : db[user]};
     }    
   }
   return null;

  
};

module.exports = { checkUserEmail };