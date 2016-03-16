'use strict';

var cookie = require('lib/cookie');
var fx = require('lib/fx');

var isDelegated = 0;

var Stat = {
    pageview: function(stats) {
    	stats = stats || {};
    	_uca('pageview', stats);
    },
    click: function(stats) {
    	stats = stats || {};
    	_uca('click', stats);
    },
    event: function(stats) {
    	stats = stats || {};
    	_uca('event', stats);
    },
	delegate: function() {

	    if (isDelegated) return
	    isDelegated = 1;

		var that = this;

	    function collect($tar, payload) {
	        var dataset = $tar.dataset || {},
                paramsReg = /region|pos|id|index|label/, // trigger keys
                statParamsReg = /stat[\w_]+/; // stat keys

	        if (!payload.count) payload.count = 0;
	        // max_level: 10
	        if (payload.count > 10) return payload;

            var stats = Object.keys(dataset);

	        if (!payload.start) {
                var statsStr = stats.toString();
                if (paramsReg.test(statsStr)){
                    payload.start = true;
                }
	        }

	        if (payload.start) {
	            stats.forEach(function(k) {
                    // basic
                    if (paramsReg.test(k)){
                        payload.collects[k] = dataset[k];
                    }
                    // extend
                    if (statParamsReg.test(k)) {
                        var kr = k.replace(/^stat(\w)/, function(w){ return w.toLowerCase().substr(4); });
                        payload.collects[kr] = dataset[k];
                    }
	            })
	        }

	        if (payload.start && dataset['region']) {
	            payload.hit = true;
	            return payload;
	        }
	        if (!$tar.parentNode || $tar.tagName == 'BODY') return payload;
	        payload.count++;
	        collect($tar.parentNode, payload);

	        return payload
	    }
	    document.body.addEventListener('click', function(e) {
	        var $tar = e.target;
	        var payload = collect(e.target, {
	            collects: {}
	        });
	        if (payload.hit) {
	        	that.click(payload.collects);
	        }
	    })
	}
};

var _uca = function(type, params) {

    params.type = type;
    params.url = location.href;
    params.t = +new Date;

    var ucaUrl = '/collect';
    var image = document.createElement("img");
    image.src = ucaUrl + '?' + fx.stringify(params);

};

module.exports = Stat
