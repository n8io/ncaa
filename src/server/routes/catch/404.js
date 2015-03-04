module.exports = function(app, options) {
  app.use(function(req, res, next) {
    var statusCode = 404;
    var message = 'Resource not found.';

    if(req.accepts('html')) {
      var err = new Error(message);
      err.status = statusCode;
      err.details = req.originalUrl;

      return next(err);
    }
    else if(req.accepts('json')) {
      return res.status(statusCode).json({status: statusCode, message: message});
    }

    return res.status(statusCode).send(message);
  });
};
