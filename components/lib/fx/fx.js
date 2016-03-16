'use strict';

// 获取 url 查询参数信息
exports.query = function(key){
    var result = location.search.match(new RegExp('[?&]' + key + '=([^&]+)', 'i'));
    return (result && result[1]) || '';
};

// 对象变为 url querystring
exports.stringify = function(obj){
    return Object.keys(obj).map(function(k) {
        return k + '=' + encodeURIComponent(obj[k])
    }).join('&');
};
