var heartbeatController = require('../../controllers/heartbeatController');
module.exports = function(app, options) {
  var router = express.Router();

  router
    .get('/heartbeat', heartbeatController.heartbeat)
    ;

  app.use('/', router);
};
