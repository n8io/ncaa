const stripeAccoutKey = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(stripeAccoutKey);
const _ = require('lodash');
var paymentsController = function() {};

module.exports = paymentsController;

paymentsController.getPayments = getPayments;

function getPayments(callback) {
  stripe.charges.list({limit: 3}, function(err, charges) {
    const brackets = [];

    charges
      .data
      .filter((c) => c.metadata.ncaa && c.metadata.brackets && c.paid && c.metadata.brackets.indexOf('~~~') > -1)
      .forEach((c) => {
        const parts = c.metadata.brackets.split(':::');

        parts.forEach((b) => {
          const arr = b.split('~~~');
          const id = parseInt(arr[0], 10);
          const name = arr[1];

          if(!brackets.find((e) => e.id === id)) {
            brackets.push({
              id: id,
              name: name,
              firstName: c.metadata.firstName,
              lastName: c.metadata.lastName
            });
          }
        });
      })
      ;

    return callback(null, brackets);
  })
}
