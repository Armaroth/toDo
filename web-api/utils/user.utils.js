const jwt = require('jsonwebtoken');
require('dotenv').config();

function getTokenForUser(user) {
  // if (!user.username) throw new Error('cannot get token for user with no username');
  const secret = process.env.JWT_SECRET_KEY
  console.log(secret)
  return jwt.sign({ username: user.email, id: user.id }, 'secret', { expiresIn: getTokenExpiresIn(), });
}

function getTokenExpiresIn() {
  return process.env['TOKEN_EXPIRES_IN'] || '4h';
}


module.exports = getTokenForUser