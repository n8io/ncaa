module.exports = function(app) {
  var supportedLanguages = config.get('i18n:supportedLanguages');

  if(!_.find(supportedLanguages, {id: 'xx-xx'})) {
    supportedLanguages.push({id: 'xx-xx', i18n: 'XXXXX'});
  }

  // Lets normalize our supportedLanguages, bolt on some UI specific values
  config.set('i18n:supportedLanguages', _.map(supportedLanguages, massageLanguages));

  config.set('i18n:defaultLanguage', (config.get('i18n:defaultLanguage') || 'en-us').toLowerCase());

  supportedLanguages = _.map(supportedLanguages, function(lng) {
    return lng.id.toLowerCase();
  });

  var defaultLng = !isProduction ? config.get('i18n:defaultLanguage').toLowerCase() : 'en';

  i18n.init({
    preload: supportedLanguages,
    resSetPath: path.join(__dirname, '../locales/__lng__/__ns__.json'),
    resGetPath: path.join(__dirname, '../locales/__lng__/__ns__.json'),
    detectLngQS: 'lang',
    lowerCaseLng: true,
    lng: defaultLng,
    fallbackLng: isDevelopment ? 'xx' : defaultLng,
    saveMissing: isDevelopment,
    debug: isDevelopment
  });

  i18n.serveClientScript(app)      // grab i18next.js in browser
    .serveDynamicResources(app)    // route which returns all resources in on response
    .serveMissingKeyRoute(app)     // route to send missing keys
    .serveChangeKeyRoute(app)      // route to post value changes
    .serveRemoveKeyRoute(app);     // route to remove key/value

  if(isDevelopment) {
    i18n.serveWebTranslate(app, {
      i18nextWTOptions: {
        languages: supportedLanguages,
        lowerCaseLng: true,
        namespaces: ['translation'],
        resGetPath: 'locales/resources.json?lng=__lng__&ns=__ns__',
        resChangePath: '/locales/change/__lng__/__ns__',
        resRemovePath: '/locales/remove/__lng__/__ns__',
        fallbackLng: defaultLng,
        dynamicLoad: true
      }
    });
  }

  // Monkey patch i18n with custom functions
  i18n = require('../helpers/i18n')(i18n);

  function massageLanguages(lng) {
    lng.id = lng.id.toLowerCase();
    lng.fallbackLng = lng.id.split('-')[0];
    lng.isoCountryCode = lng.id.split('-').length > 1 ? lng.id.split('-')[1] : null;
    lng.uiFlagClass = 'flag-icon-' + lng.isoCountryCode;

    switch(lng.isoCountryCode) {
      case 'ca':
        lng.uiFlagClass = 'flag-icon-fr'; // so we show French flag for french (even though it is French-Canadian)
        break;
      case 'mx':
        lng.uiFlagClass = 'flag-icon-es'; // so we show Spanish flag for french (even though it is Spanish-Mexican)
        break;
      default:
        break;
    }

    return lng;
  }
};
