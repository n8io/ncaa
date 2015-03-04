var path = require('path');
var moment = require('moment');

module.exports = function(grunt) {
  var data = {
    cfg: require('./src/precompile/asset-config')
  }

  data.timestampMs = (new Date()).getTime();
  data.timestamp = moment().format('ddd ll HH:mmZZ') + ' [ ' + data.timestampMs + ' ]';

  require('load-grunt-config')(grunt, {
    data: data
  });
};
