const { runQuery } = require('./db');
const compare = require('bcrypt').compare;


async function getUserByEmail(email) {
  const query = `SELECT * FROM "user" WHERE email = $1; `
  const res = await runQuery(query, [email]);
  if (res.error) return res.error;
  if (res.data.rows.length === 0) {
    return { error: 'user not found' };
  }
  return { data: res.data.rows[0] };

}

async function verifyUser(email, password) {
  const res = await getUserByEmail(email);
  const user = res.data;
  if (!user) return 'users does not exists';
  return await compare(password, user.password) ? user : 'Incorrect Password';
}

module.exports = getUserByEmail, verifyUser;

