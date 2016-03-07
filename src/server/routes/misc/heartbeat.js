const express = require(`express`);
const heartbeatController = require(`../../controllers/heartbeatController`);

module.exports = function(app /* , options */) {
  const router = express.Router();

  router
    .get(`/heartbeat`, heartbeatController.heartbeat)
    ;

  app.use(`/`, router);
};
