'use strict';

var libStory = require('../lib/story');
var wa = require('../lib/wa');

/**
 * Root
 */
function onStart(req, res, next){
    res.status(200).send('server ok');
}

/**
 * Story
 */
function onStory(req, res, next){
    // 文章 ID
    var id = req.params.id;
    // fetch story
    libStory.fetch(id).then(function(story){
        res.locals.story = story;
        // 页面信息
        res.locals.title = story.title;
        res.locals.keywords = story.keywords;
        res.locals.description = story.summary;
        next();
    }).catch(function(err){
        res.stat.error({
            label: 'no_story',
            item_id: id
        });
        console.error(err);
        next();
    })
}

// 路由规则
module.exports = [
    ['GET', '/', onStart],
    ['GET', '/story/:id', onStory]
];
