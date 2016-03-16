'use strict';

/**
 * Render
 * @author weilai
 */

module.exports = function(opts) {

    return function(req, res, next) {
        var view = req.params.page;
        if (view) {
            view = view.split('/');
            var tpl = view[view.length - 1];
            if (!/\./.test(tpl)) {
                view.push(tpl);
            }
            res.render(view.join('/'), res.locals);
        }
        else {
            next();
        }
    };
}
