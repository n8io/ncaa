var paymentsController = require('../../controllers/paymentsController');

module.exports = function(app, options) {
  var router = express.Router();

  router.get('/payments', getPayments);

  app.use('/api', router);

  function getPayments(req, res) {
    paymentsController.getPayments(function(err, paidBrackets) {
      return res.json(paidBrackets);
    });
  }
};
