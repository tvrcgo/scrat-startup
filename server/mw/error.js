'use strict';

/**
 * Error handler
 * @author weilai
 */

module.exports = function(){
    return function(err, req, res, next){
        err && console.error(err.stack);
    	res.status(404).send('没有资源 (404)');
    }
}
