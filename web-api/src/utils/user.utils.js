const { runQuery } = require('../db/db.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function getTokenForUser(user, secret, type) {
  if (!user.username) throw new Error('cannot get token for user with no username');
  return jwt.sign({ username: user.username, id: user.id }, secret, { expiresIn: getTokenExpiresIn(type), });
}
function getTokenExpiresIn(type) {
  if (type === "access") {
    return process.env['TOKEN_EXPIRES_IN'] || '15m';
  } else {
    return '3d';
  }
}
async function saveRefreshToken(token, id) {
  const query = 'UPDATE "user" SET refresh_token = $1 WHERE id = $2 ;'
  await runQuery(query, [token, id]);
}
module.exports = { getTokenForUser, saveRefreshToken }