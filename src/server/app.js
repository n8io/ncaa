require(`dotenv-safe`).load({silent: true});
const express = require(`express`);
const app = express();

// Establish global variables
require(`./init/globals`);

// Load up config
require(`./helpers/configuration`)();

config.set(`app:name`, `March Madness ${(new Date()).getFullYear()}`);

// Initialize logger
global.logger = require(`./init/logging`).getLogger();

// Check for configuration validation errors, if present don't start the app
if (config.get(`configValidationErrors`) && config.get(`configValidationErrors`).length > 0) {
  logger.error({configValidationError: config.get(`configValidationErrors`)});
  logger.fatal(`Application is not properly configured. See logs for details.`);
  process.exit(1);
}

// CDN helper for Jade templates
app.locals.CDN = require(`./helpers/cdn`);

// Set high level middleware
require(`./init/middleware`)(app);

// Define custom routes
require(`./routes`)(app);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || `0.0.0.0`;

const server = app.listen(PORT, HOST, function() {
  logger.info( // eslint-ignore line
    `%s@%s is running at http://%s:%s`,
    app.get(`name`),
    app.get(`version`),
    app.get(`host`),
    app.get(`port`)
  );
});

module.exports = server;
