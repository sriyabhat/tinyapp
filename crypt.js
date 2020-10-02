const bcrypt = require('bcrypt');

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const hashPassword = (password) => {
  if(!password) {
    return null;
  }
  return bcrypt.hashSync(password, salt);
};
 
module.exports = { hashPassword };

