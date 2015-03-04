module.exports = function home(app, options) {
  var router = express.Router();

  // Capture all html routes here because we are SPA
  var spaRoutes = [
    '/home',
    '/services',
    '/about',
    '/'
  ];

  router.get(spaRoutes, function(req, res, next) {
    if(!req.accepts('html')) {
      return next();
    }

    var options = options || {};

    return res.render('index', {pkgjson: pkgjson, bwrjson: bwrjson});
  });

  app.use('/', router);
};
