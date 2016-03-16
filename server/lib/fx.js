
/**
 * 合并对象
 * @return {object}
 */
exports.mix = function(){
    var args = Array.prototype.slice.call(arguments);
    var base = args[0];
    for (var i=1; i<args.length; i++) {
        Object.keys(args[i]).forEach(function(key){
            base[key] = args[i][key];
        })
    }
    return base;
}

/**
 * 健壮的 JSON.parse
 * @param  {string} body
 * @return {object}
 */
exports.parse = function(body){
    if (!body) {
        return {};
    }
    if (body && typeof body === 'object') {
        return body;
    }
    var json = {};
    try {
        json = JSON.parse(body);
    } catch (e) {
    }
    if (!json || typeof json === 'string') {
        return {};
    }
    return json;
}
