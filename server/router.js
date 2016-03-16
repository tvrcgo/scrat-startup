'use strict';

/**
 * Router
 * @author weilai
 */

var path = require('path');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var walog = require('./lib/walog');

/**
 * Mount router
 * @param  {string} key [router]
 */
function mount(key) {
	var rules = require('./router/'+key);
	rules.forEach(function(item){
		var method = item[0].toLowerCase();
		router[method](item[1], item[2]);
	})
}

// middlewares
router.use(cookieParser());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(walog.mixin({
	name: 'ifstory',
	dir: path.join(__dirname, '../private/log')
}))

// routers
mount('collect');
mount('story');

module.exports = function(opts){
    return router;
}
