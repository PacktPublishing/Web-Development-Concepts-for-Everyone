const passport = require('passport');
const pool = require('../modules/pool');
const useUserStrategy = require('./user.strategy');

useUserStrategy(passport);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  pool
    .query(`SELECT * FROM "user" WHERE id=$1`, [id])
    .then((result) => {
      const user = result.rows?.[0];

      if (user) {
        delete user.password;
        done(null, user);
      } else {
        done(null, null);
      }
    })
    .catch((err) => {
      console.warn(`[Deserialize User] - Error: ${err}`);
      done(error, null);
    });
});

module.exports = passport;
