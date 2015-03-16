module.exports = function(app, options) {
  require('./heartbeat')(app, options);
  require('./i18nReset')(app, options);
};
