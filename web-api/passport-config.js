const LocalStrategy = require('passport-local').Strategy;
const verifyUser = require('./db/user.store');
function initialize(passport) {

  async function authenticate(email, password, done) {
    const result = await verifyUser(email, password);
    if (typeof result === 'string') return done({ code: 401, error: result });
    return done(null, result);

  }
  passport.use(new LocalStrategy(authenticate))
}


module.exports = initialize;