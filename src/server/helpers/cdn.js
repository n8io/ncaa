var url = require('url');

var cdn = function() {};

module.exports = function(uri, options) {
  if(!uri) {
    return uri;
  }

  var defaults = {
    cdn: { // Set 'cdn' value to a falsy value to disable cdn
      host: null
    },
    cache: { // Set 'cache' value to a falsy value to disable cachebusting. E.g., { cache:false, ... }
      key: null
    },
    forceProtocol: null // Set 'forceProtocol' value to a falsy value to not change the protocol on the uri
  };

  options = _.extend(defaults, options);

  var uObj = null;

  try {
    uObj = url.parse(uri, true, true);
  }
  catch(e) {
    logger.error('Failed to parse CDN resource into a proper uri: ' + uri);
  }

  if(!uObj) { // Errored on parse, garbage in - garbage out
    return uri;
  }

  if(uObj.host) { // This is a full url path, don't alter
    return uri;
  }

  // Start adjusting uri based upon options
  if(options.cdn && options.cdn.host) {
    uObj.host = url.parse(options.cdn.host).host;
  }
  else {
    var temp = url.parse(global.config.get('cdn:host'), true, true);
    uObj.host = temp.host;
    uObj.protocol = temp.protocol;
  }

  if(options.cache) {
    if(options.cache.key) {
      uObj.query.noc = options.cache.key;
    }
    else if(global.config.get('cdn:cacheKey')) {
      uObj.query.noc = global.config.get('cdn:cacheKey') || global.appStartTime;
    }
    else {
      uObj.query.noc = global.appStartTime;
    }
  }

  if(!options.forceProtocol) {
    uObj.protocol = null;
  }
  else {
    uObj.protocol = options.forceProtocol;
  }

  return url.format(uObj);
};
