const logger = function logger() {};
const cwd = require(`cwd`);
const pkgjson = require(cwd(`package.json`));

logger.getLogger = function getLogger() {
  const streams = config.get(`logging:streams`) || [];

  if (!streams.length && !config.get(`logging:stdOut:disabled`)) {
    streams.push({
      level: config.get(`logging:stdOut:level`) || `info`,
      stream: process.stdout
    });
  }

  const options = {
    name: pkgjson.name,
    streams: streams
  };

  return require(`bunyan`).createLogger(options);
};

module.exports = logger;
