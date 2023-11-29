const { runQuery } = require('./db');
const compare = require('bcrypt').compare;

async function searchForUser(email) {
  const query = `SELECT * FROM "user" WHERE email = $1;`
  const res = await runQuery(query, [email]);
  if (res.error) {
    return res.error;
  }
  if (res.data.rows.length === 0) {
    return null;
  }
  return { data: res.data.rows[0] };
}

async function getUserByEmail(email) {
  const search = await searchForUser(email);
  if (!search) {

    return { error: 'user not found' };
  }
  return { data: search.data };
}

async function verifyUser(email, password) {
  const res = await getUserByEmail(email);
  if (res.data) {
    const user = res.data;
    if (!user) return 'users does not exist';
    return await compare(password, user.password) ? user : 'Incorrect Password';

  }
  return res.error;
}

async function saveUser(user) {
  const isDuplicate = await searchForUser(user.email);
  if (isDuplicate) {
    return { error: "Email already exists", code: 409 }
  }
  const query = ` INSERT INTO "user" ("username","password","email") VALUES ($1,$2,$3) RETURNING id`;
  const res = await runQuery(query, [user.username, user.password, user.email]);
  if (res.error) {
    return { error: res.error.detail, code: 500 }
  }
  return { data: res.data.rows[0].id }
}

module.exports = { getUserByEmail, verifyUser, saveUser };

