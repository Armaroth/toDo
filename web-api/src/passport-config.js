const getTokenForUser = require('./utils/user.utils');
const LocalStrategy = require('passport-local').Strategy;
const { verifyUser } = require('./db/user.store');

function initialize(passport) {
  async function authenticate(email, password, done) {
    const result = await verifyUser(email, password);
    console.log(result)
    if (typeof result === 'string') return done({ code: 401, message: result });
    return done(null, getTokenForUser(result));
  }
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticate))
}

module.exports = initialize; 