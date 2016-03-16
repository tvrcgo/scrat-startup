'use strict';

var config = require('../../config');

/**
 * 前端打点接口
 */
function onCollect(req, res, next){
    var logType = req.query.type||'pageview';
    if (/(pageview|event|click|error)/.test(logType)) {
        !config.PROD && console.log('[collect]', logType, req.query);
        res.stat[logType](req.query);
    }
    res.status(200).end();
}

module.exports = [
    ['GET', '/collect', onCollect]
];
