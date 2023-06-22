const express = require('express');
const router = express.Router();
const userRouter = require('./user/index');
const messagesRouter = require('./messages/index');

module.exports = (param) => {
  router.use('/user', userRouter());
  router.use('/messages', messagesRouter());

  return router;
};
