var espnController = require('../../controllers/espnController');
var paymentsController = require('../../controllers/paymentsController');

module.exports = function(app, options) {
  var router = express.Router();

  router.get('/espn/bracket', getPoolInfo);

  app.use('/api', router);

  function getPoolInfo(req, res, next) {
    espnController.getPoolInfo(function(err, pool) {
      if(err) {
        return next(err || new Error('Returned bad response.'));
      }

      paymentsController.getPayments(function(err, paidBrackets) {
        if(err) {
          return next(err || new Error('Retuned bad response when fetching payments'));
        }

        pool.group.entries.forEach((e) => {
          e.paid = !!paidBrackets.find((p) => p.id === e.entryID);
        });

        return res.json(pool);
      });
    });
  }
};
