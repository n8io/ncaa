module.exports = function(app /* , options */) {
  app.use(function(req, res, next) {
    const statusCode = 403;
    const message = `Access denied.`;

    if (req.accepts(`html`)) {
      const err = new Error(message);

      err.status = statusCode;
      err.details = req.originalUrl;

      return next(err);
    }
    else if (req.accepts(`json`)) {
      return res.status(statusCode).json({status: statusCode, message: message});
    }

    return res.status(statusCode).send(message);
  });
};
