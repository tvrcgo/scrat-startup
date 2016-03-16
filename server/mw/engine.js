'use strict';

/**
 * Template engine.
 * @author weilai
 */

var engine = require('scrat-swig');
var path = require('path');
var config = require('../../config');
var filters = require('../lib/filter');

module.exports = function(app){

    var ext = 'tpl';
    var root = app.get('root');

    app.set('view engine', ext);
    app.set('views', root + '/views');
    app.engine(ext, engine.renderFile);

    // Swig filters
    Object.keys(filters).forEach(function(key){
        engine.setFilter(key, filters[key]);
    })

    engine.setDefaults({
        cache: config.PROD ? 'memory' : false
    });

    return engine.middleware({
        map: root + '/config/map.json',
        cacheMap: config.PROD,
        logger: console
    });
};
