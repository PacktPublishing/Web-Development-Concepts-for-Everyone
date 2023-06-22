const express = require('express');
const pool = require('../../modules/pool');
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
    const queryString = `SELECT * FROM "messages" WHERE $1>=sec_level;`;

    pool
      .query(queryString, [req.user.access_level])
      .then((response) => {
        res.send(response.rows);
      })
      .catch((err) => {
        console.warn(err);
        res.sendStatus(500);
      });
  });

  return router;
};
