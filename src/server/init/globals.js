/*
'global' is the node equivalent of browser 'window' - globally scoped variable
*/

// Core node modules
global.fs = require('fs');
global.path = require('path');

// Helper modules
global.express = require('express');
global.config = require('nconf').env(['NODE_ENV']);
global._ = require('lodash');
global._.str = require('underscore.string');
global.i18n = require('i18next');
global.moment = require('moment');
global.async = require('async');
global.request = require('request');
global.ms = require('ms');
global.cheerio = require('cheerio');

// Misc app variables
global.appStartTime = (new Date()).getTime();
global.isProduction = !((process.env.NODE_ENV || 'dev').toLowerCase().indexOf('prod'));
global.isDevelopment = !((process.env.NODE_ENV || 'dev').toLowerCase().indexOf('dev'));
global.pkgjson = require('../../../package.json');
global.bwrjson = require('../../../bower.json');

// Helper for making requests to apis
global.serviceHelper = require('../helpers/serviceHelper');
