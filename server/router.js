'use strict';

var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');

router.use(['/story/*'], bodyparser.urlencoded({ extended: false }));

/**
 * story
 */
router.use('/story/:id', function(req, res, next){
	res.locals.title = "this is a story.";
	res.locals.story = {
		id: req.params.id,
		title: 'Story',
		content: 'story content'
	};
	next();
});

module.exports = function(opts){
    return router;
}
