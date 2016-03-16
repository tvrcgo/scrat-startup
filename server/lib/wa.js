'use strict';

var request = require('request');
var fx = require('./fx');
var config = require('../../config');
var tracker = 'http://gj.track.uc.cn';

function send(type, params){
    // query string.
    var query = Object.keys(fx.mix(params, {
        appid: config.wa.appId,
        lt: type
    })).map(function(key){
        return [key, params[key]].join('=')
    }).join('&');
    // make request.
    var collect = function(retry){
        retry = retry || 1;
        return new Promise(function(resolve, reject){
            return request({
                url: (config.wa.tracker || tracker).replace(/\/$/, '') + '/collect?' + query
            }, function(err, res, body){
                if (!err && res.statusCode === 200) {
                    body = fx.parse(body);
                    return resolve(body);
                }
                else if (retry<3) {
                    return collect(retry+1).then(resolve).catch(reject);
                }
                return reject(err);
            });
        });
    }
    return collect();
}

var lts = {
    log: 'log',
    pageview: 'log',
    event: 'event',
    click: 'link',
    error: 'error',
    bee: 'bee'
};

Object.keys(lts).forEach(function(method){
    exports[method] = function(params) {
        return send(lts[method], params);
    }
})
