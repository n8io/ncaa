var url = require('url');
var qs = require('querystring');

var serviceHelper = function() {};

serviceHelper.makeServiceRequest = makeServiceRequest;
serviceHelper.getDefaulRequestOptions = getDefaulRequestOptions;

module.exports = serviceHelper;

function makeServiceRequest(options, req, callback) {
  var defaults = {
    timeout: config.get('services:defaultTimeout')
  };
  var fUri;
  var startTime;
  var requestId;

  options = _.assign(defaults, options);
  options.uri = options.uri || options.url;

  fUri = url.parse(options.uri, true);
  fUri.search = qs.stringify(options.qs);

  startTime = Date.now();
  requestId = startTime.toString().substr(startTime.toString().length - 6); // Makes things a bit easier to read and compare while still being unique

  logger.info('[%s] %s %s...',
    requestId,
    options.method.toUpperCase(),
    url.format(fUri)
  );

  request(options, handleRequestResponse);

  function handleRequestResponse(err, resp, body) {
    var unexpectedServiceResponseError;
    var verboseMessage;
    var verboseResponseTime;
    var timeoutError;

    if(err) {
      // Handle timeouts with custom error
      if(err.code === 'ETIMEDOUT') {
        timeoutError = new customErrors.TimeoutError(requestId, options);
        logger.error(timeoutError);

        return callback(unexpectedServiceResponseError);
      }
      else { // Log the error and callback
        logger.error(err);

        return callback(err);
      }
    }

    // Handle properly returned responses with unexpected error status code
    if(resp && resp.statusCode === 500) {
      unexpectedServiceResponseError = new customErrors.UnexpectedServiceResponseError(requestId, resp.statusCode, options, body);
      logger.error(unexpectedServiceResponseError);

      return callback(unexpectedServiceResponseError);
    }

    verboseMessage = '.';
    verboseResponseTime = '';

    if(config.get('services:verboseDebug')) {
      verboseResponseTime += ' in ' + ms(Date.now() - startTime, {long: true});
      verboseMessage += verboseResponseTime + ' '
        + options.method.toUpperCase() + ' '
        + url.format(fUri)
        + ', payload: '
        + JSON.stringify(body);
    }

    logger.debug('[%s] ... returned %s%s',
      requestId,
      resp.statusCode,
      verboseMessage
    );

    return callback(null, body);
  }
}

function getDefaulRequestOptions() {
  return {
    method: 'GET',
    json: true
  };
}
