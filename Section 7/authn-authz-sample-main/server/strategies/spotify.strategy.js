const SpotifyStrategy = require('passport-spotify').Strategy;
const pool = require('../modules/pool');

const spotifyStrategyCallback = async (
  accessToken,
  refreshToken,
  expires_in,
  profile,
  callback
) => {
  console.log('In Spotify Callback');
  try {
    console.log('Data from spotify: ', profile);

    callback(null, null);
  } catch (err) {
    callback(`Error with Spotify User: ${err}`, null);
  }
};

module.exports = (passport, callbackURL) => {
  passport.use(
    new SpotifyStrategy(
      {
        clientID: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        callbackURL: callbackURL,
      },
      spotifyStrategyCallback
    )
  );
};
