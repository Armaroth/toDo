const jwt = require('jsonwebtoken');
require('dotenv').config();

function getTokenForUser(user, secret) {
  if (!user.username) throw new Error('cannot get token for user with no username');
  return jwt.sign({ username: user.username, id: user.id }, secret, { expiresIn: getTokenExpiresIn(secret), });
}
function getTokenExpiresIn(secret) {
  if (secret == "SECRET") {
    return process.env['TOKEN_EXPIRES_IN'] || '15m';
  } else {
    return '3d';
  }

}


module.exports = getTokenForUser