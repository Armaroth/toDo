const jwt = require('jsonwebtoken');
require('dotenv').config();

function getTokenForUser(user) {
  if (!user.username) throw new Error('cannot get token for user with no username');
  const secret = process.env.JWT_SECRET_KEY;
  return jwt.sign({ username: user.username, id: user.id }, secret, { expiresIn: getTokenExpiresIn(), });
}
function getTokenExpiresIn() {
  console.log(process.env['TOKEN_EXPIRES_IN'])
  return process.env['TOKEN_EXPIRES_IN'] || '4h';
}


module.exports = getTokenForUser