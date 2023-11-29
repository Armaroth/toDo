const jwt = require('jsonwebtoken');
require('dotenv').config();

function getTokenForUser(user, secret, type) {
  if (!user.username) throw new Error('cannot get token for user with no username');
  return jwt.sign({ username: user.username, id: user.id }, secret, { expiresIn: getTokenExpiresIn(type), });
}
function getTokenExpiresIn(type) {
  if (type === "access") {
    return process.env['TOKEN_EXPIRES_IN'] || '5s';
  } else {
    return '3d';
  }

}


module.exports = getTokenForUser