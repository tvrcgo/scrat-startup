
var NAPI = require('napi');
var config = require('../../config');

module.exports = NAPI(config.napi.appId, config.napi.host);
