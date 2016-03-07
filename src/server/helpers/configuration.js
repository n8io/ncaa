'use strict';

const path = require(`path`);

module.exports = function() {
  const configFileBaseName = `config`;
  const configDir = path.join(__dirname, `..`, `config`);

  if (!config) {
    throw Error(`No global configuration variable is set. config is undefined.`);
  }

  // Pull in NODE_ENV from environment if set
  config.env([`NODE_ENV`]);

  // Default to 'development' in case it is not provided
  config.defaults({NODE_ENV: `development`});

  // Read in any command line args for overrides
  config.argv();

  // Load environment config from file system
  const envConfig = `${configFileBaseName}.${config.get(`NODE_ENV`)}.json`;

  config.file({
    file: envConfig,
    dir: configDir,
    search: true
  });

  // Load default configuration from file system
  const defaultConfigPath = path.join(configDir, `${configFileBaseName}.json`);

  config.file(`default`, defaultConfigPath);

  // Push evaluated configs values back for logging later on
  config.set(`envConfig`, envConfig);
  config.set(`defaultConfig`, `${configFileBaseName}.json`);
  config.set(`cdn:qs`, getCdnQueryString());

  if (!config.get(`session:secret`)) {
    config.set(`session:secret`, `not set`);
  }

  // Check for any config validation errors
  const configValidationErrors = [];
  const configRequiredValues = config.get(`__required`) || [];

  for (let i = configRequiredValues.length - 1; i >= 0; i--) {
    if (typeof config.get(configRequiredValues[i]) === `undefined`) {
      const msg = `${configRequiredValues[i]} is a required configuration value. Please add a valid value to your environment config: ${config.get(`envConfig`)}`;

      configValidationErrors.push({
        reason: msg
      });
    }
  }

  // Set so these can be evaluated later, but before app startup
  config.set(`configValidationErrors`, configValidationErrors);

  function getCdnQueryString() {
    const cbk = config.get(`cdn:cacheKey`) || (config.get(`NODE_ENV`).indexOf(`dev`) === 0 ? (new Date()).getTime() : ``);

    if (!cbk) {
      return ``;
    }

    return `?noc=${cbk.toString()}`;
  }
};
