const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/_root.strategy');
const routes = require('./routes/index');

const PORT = process.env.PORT || 5000;

// app.use(cors());
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('server/public'));
app.use('/api', routes());

app.listen(PORT, () => {
  console.log(`Express Server listening on port: ${PORT}`);
});
