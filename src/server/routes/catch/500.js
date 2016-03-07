module.exports = function(app /* , options */) {
  // development 500 error handler
  // will print stacktrace
  if (!isProduction) { // eslint-disable-line
    app.use(function(err, req, res) {
      err.status = err.status || 500;
      res.status(err.status);
      res.render(`error`, {
        status: err.status,
        message: err.message,
        error: err
      });
    });
  }

  // production 500 error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res) {
    err.status = err.status || 500;
    res.status(err.status);
    res.render(`error`, {
      status: err.status,
      message: err.message,
      error: {}
    });
  });
};
