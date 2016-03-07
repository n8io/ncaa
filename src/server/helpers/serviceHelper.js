'use strict';

const url = require(`url`);
const qs = require(`querystring`);
const request = require(`request`);
const _ = require(`lodash`);
const ms = require(`ms`);
const serviceHelper = function() {};

serviceHelper.makeServiceRequest = makeServiceRequest;
serviceHelper.getDefaulRequestOptions = getDefaulRequestOptions;

module.exports = serviceHelper;

function makeServiceRequest(options, req, callback) {
  const defaults = {
    timeout: config.get(`services:defaultTimeout`)
  };
  const startTime = Date.now();
  const fUri = url.parse(options.uri, true);
  const requestId = startTime.toString().substr(startTime.toString().length - 6); // Makes things a bit easier to read and compare while still being unique

  options = _.assign(defaults, options);
  options.uri = options.uri || options.url;

  fUri.search = qs.stringify(options.qs);

  logger.info(`[%s] %s %s...`,
    requestId,
    options.method.toUpperCase(),
    url.format(fUri)
  );

  request(options, handleRequestResponse);

  function handleRequestResponse(err, resp, body) {
    let unexpectedServiceResponseError;
    let verboseMessage;
    let verboseResponseTime;

    if (err) {
      // Handle timeouts with custom error
      if (err.code === `ETIMEDOUT`) {
        logger.error(err);

        return callback(unexpectedServiceResponseError);
      }
      else { // Log the error and callback
        logger.error(err);

        return callback(err);
      }
    }

    // Handle properly returned responses with unexpected error status code
    if (resp && resp.statusCode === 500) {
      const unexpectedServiceResponseError = new Error(requestId, resp.statusCode, options, body);

      logger.error(unexpectedServiceResponseError);

      return callback(unexpectedServiceResponseError);
    }

    verboseMessage = `.`;
    verboseResponseTime = ``;

    if (config.get(`services:verboseDebug`)) {
      verboseResponseTime += ` in ${ms(Date.now() - startTime, {long: true})}`;
      verboseMessage += `${verboseResponseTime} ${options.method.toUpperCase()} ${url.format(fUri)}, payload: ${JSON.stringify(body)}`;
    }

    logger.debug(`[%s] ... returned %s%s`,
      requestId,
      resp.statusCode,
      verboseMessage
    );

    return callback(null, body);
  }
}

function getDefaulRequestOptions() {
  return {
    method: `GET`,
    json: true
  };
}
