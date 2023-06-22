const express = require('express');
const pool = require('../../modules/pool');
const encryption = require('../../modules/encryption');
const userStrategy = require('../../strategies/_root.strategy');
const router = express.Router();

const rejectUnauthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = (params) => {
  router.get('/', rejectUnauthenticated, (req, res) => {
    res.send(req.user);
  });

  router.post('/register', (req, res, next) => {
    const { username } = req.body;
    const password = encryption.encryptPassword(req.body.password);

    const queryString = `INSERT INTO "user" (username, password) VALUES ($1,$2) RETURNING id;`;

    pool
      .query(queryString, [username.toLowerCase(), password])
      .then(() => res.sendStatus(200))
      .catch((err) => {
        console.warn(`[REGISTER USER] Error: ${err}`);
        res.sendStatus(500);
      });
  });

  router.post('/login', userStrategy.authenticate('local'), (req, res) => {
    res.sendStatus(200);
  });

  router.post('/logout', (req, res) => {
    req.logout();
    res.sendStatus(200);
  });

  return router;
};
