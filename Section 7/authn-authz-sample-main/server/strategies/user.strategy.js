const LocalStrategy = require('passport-local').Strategy;
const encryption = require('../modules/encryption');
const pool = require('../modules/pool');

const localStrategyCallback = async (username, password, done) => {
  try {
    const queryString = `SELECT * FROM "user" WHERE username=$1;`;
    const result = await pool.query(queryString, [username]);
    const user = result.rows?.[0];
    if (user && encryption.comparePassword(password, user.password)) {
      delete user.password;
      done(null, user);
    } else {
      done(null, null);
    }
  } catch (err) {
    done(err, null);
  }
};

module.exports = (passport) => {
  passport.use('local', new LocalStrategy(localStrategyCallback));
};
