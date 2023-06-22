const cookieSession = require('cookie-session');

const serverSessionSecret = () => {
  if (
    !process.env.SESSION_SERVER_SECRET ||
    process.env.SESSION_SERVER_SECRET < 8
  )
    console.warn('Bad secret!');
  return process.env.SESSION_SERVER_SECRET;
};

module.exports = cookieSession({
  secret: serverSessionSecret() || 'secret',
  key: 'user',
  resave: 'false',
  saveUninitialized: false,
  maxAge: 60 * 60 * 24000 * 7,
  secure: false,
});
