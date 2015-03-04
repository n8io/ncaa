var logger = function logger() {};

logger.getLogger = function getLogger() {
  var streams = config.get('logging:streams') || [];

  if(!streams.length && !config.get('logging:stdOut:disabled')) {
    streams.push({
      level: config.get('logging:stdOut:level') || 'info',
      stream: process.stdout
    });
  }

  var options = {
    name: pkgjson.name,
    streams: streams
  };

  return require('bunyan').createLogger(options);
};

module.exports = logger;
