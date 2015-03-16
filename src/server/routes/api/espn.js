var espnController = require('../../controllers/espnController');

module.exports = function(app, options) {
  var router = express.Router();

  router.get('/espn/bracket', espnController.getBracketInfo);

  app.use('/api', router);
};
