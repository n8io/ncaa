module.exports = function(app, options) {
  var router = express.Router();

  router.all('*', function(req, res, next) {
    setLanguage(req, res);

    next();
  });

  app.use('/', router);

  function setLanguage(req, res) {
    var lng = (req.query.lang || req.cookies.i18next || config.get('i18n:defaultLanguage') || 'en-us').toLowerCase();
    var defaultLanguage = config.get('i18n:defaultLanguage');
    var supportedLanguages = config.get('i18n:supportedLanguages');

    lng = _.find(supportedLanguages, function(l) {
      return !l.id.indexOf(lng.toLowerCase());
    });

    if(!lng) {
      lng = isDevelopment ? 'xx-xx' : defaultLanguage;
    }
    else {
      lng = lng.id;
    }

    var tempI18n = _.cloneDeep(i18n);

    tempI18n.setLng(lng);

    res.locals.t = tempI18n.t;
    res.locals.i18n = tempI18n;
  }

  function normalizeQsAndHeaders(req) {
    for(var qsv in req.query) {
      req.query[qsv.toLowerCase()] = req.query[qsv];
      req.headers[qsv.toLowerCase()] = req.query[qsv];
    }

    for(var hv in req.headers) {
      req.headers[hv.toLowerCase()] = req.headers[hv];
      req.query[hv.toLowerCase()] = req.headers[hv];
    }
  }
};
