module.exports = function(app, options) {
  var router = express.Router();

  router
    .get('/i18n/reset', function(req, res) {
      i18n.sync.reload();

      return res.status(200).json({message: 'i18n reset!'});
    })
    ;

  app.use('/', router);
};
