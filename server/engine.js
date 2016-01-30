
var engine = require('scrat-swig');
var path = require('path');
var config = require('../config');

module.exports = function(app){

    var ext = 'tpl';
    var root = path.join(__dirname, '..');

    app.set('view engine', ext);
    app.set('views', root + '/views');
    app.engine(ext, engine.renderFile);

    engine.setDefaults({
        cache: config.PROD ? 'memory' : false
    });

    return engine.middleware({
        map: root + '/config/map.json',
        cacheMap: config.PROD,
        logger: console
    });
};
