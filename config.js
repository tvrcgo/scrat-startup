'use strict';

function mix() {
    var objs = Array.prototype.slice.call(arguments);
    var base = objs[0] || {};
    for(var i=1; i<objs.length; i++) {
        var tar = objs[i] || {};
        for(var k in tar) {
            if (tar.hasOwnProperty(k)) {
                base[k] = tar[k];
            }
        }
    }
    return base;
}

// UAE环境变量
var uaeMode = process.env.UAE_MODE; // DEV, TEST, PROD
// UAE配置
var uaeConfig = require('./conf/config.json');

module.exports = mix({
    PROD: uaeMode === 'PROD'
}, uaeConfig);
