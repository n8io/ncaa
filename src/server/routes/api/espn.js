const express = require(`express`);
const espnController = require(`../../controllers/espnController`);
const paymentsController = require(`../../controllers/paymentsController`);

module.exports = function(app /* , options*/) {
  const router = express.Router();

  router.get(`/espn/bracket`, getPoolInfo);

  app.use(`/api`, router);

  function getPoolInfo(req, res, next) {
    espnController.getPoolInfo(function(err, pool) {
      if (err) {
        return next(err || new Error(`Returned bad response.`));
      }

      paymentsController.getPayments(function(err, paidBrackets) {
        if (err) {
          return next(err || new Error(`Retuned bad response when fetching payments`));
        }

        pool.group.entries.forEach((e) => {
          const pb = paidBrackets.find((p) => p.id === e.entryID);

          if (pb) {
            e.paid = {
              firstName: pb.firstName,
              lastName: pb.lastName,
              email: pb.email
            };
          }
        });

        return res.json(pool);
      });
    });
  }
};
