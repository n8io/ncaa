module.exports = function(app, options) {
  require(`./404`)(app, options);
  require(`./500`)(app, options);
};
