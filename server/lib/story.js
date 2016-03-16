'use strict';

var Promise = require('promise');
var napi = require('./napi');
var config = require('../../config');

/**
 * 从 NAPI 取单个对象
 * @param  {string} id
 * @return {promise}
 */
exports.fetch = function(id){

    id = id || 0;
    var clazz = config.napi.class || 'news';
    var url = '/classes/'+ clazz +'/objects/'+id+'?_fetch=1&_fetch_incrs=1';

    return new Promise(function(resolve, reject){
        napi.base().send({
            method: 'GET',
            url: url
        }).done(function(res){
            if (res && res.data) {
                resolve(res.data);
            }
            else {
                reject(res);
            }
        }, reject)
    })
}
