const express = require(`express`);
const espnController = require(`../../controllers/espnController`);
const paymentsController = require(`../../controllers/paymentsController`);

const minutes = num => num * 60 * 1000;

const cache = {
  expiration: new Date([1900, 1, 1]).getTime(),
  entries: []
};

function isCached() {
  const { expiration } = cache;

  const isFresh = expiration > new Date().getTime();

  // console.log({ isFresh });

  return isFresh;
}

module.exports = function(app /* , options*/) {
  const router = express.Router();

  router.get(`/espn/bracket`, getPoolInfo);

  app.use(`/api`, router);

  function getPoolInfo(req, res, next) {
    if (isCached()) {
      return res.json(cache.data);
    }

    espnController.getPoolInfo(function(err, pool) {
      if (err) {
        return next(err || new Error(`Returned bad response.`));
      }

      paymentsController.getPayments(function(err, paidBrackets) {
        if (err) {
          return next(
            err || new Error(`Retuned bad response when fetching payments`)
          );
        }

        pool.group.entries.forEach(e => {
          const pb = paidBrackets.find(p => p.id === e.id);

          if (pb) {
            e.paid = {
              firstName: pb.firstName,
              lastName: pb.lastName,
              email: pb.email
            };
          }
        });

        pool.startTime = parseInt(process.env.START_TIME_MS, 10);

        cache.expiration = new Date().getTime() + minutes(1);
        cache.data = { ...pool };

        return res.json(pool);
      });
    });
  }
};
