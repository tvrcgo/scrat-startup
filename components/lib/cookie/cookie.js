
/**
 * 设置 cookie
 * @param {[type]} key  [description]
 * @param {[type]} val  [description]
 * @param {[type]} time [description]
 */
function set(key, val, time) {
    var date = new Date(),
        expiresDays = time || 365,
        url = location.href,
        cookieStr;

    date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000);
    document.cookie = key + '=' + val + '; path=/; expires=' + date.toGMTString();

}

/**
 * 获取 cookie
 * @param  {[type]} key [description]
 * @return {[type]}     [description]
 */
function get(key) {
    var cookie = document.cookie.replace(/[ ]/g, ''),
        arrCookie = cookie.split(';'),
        tips;

    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split('=');
        if (key === arr[0]) {
            tips = arr[1];
            break;
        }
    }
    return tips;
}

exports.set = set;
exports.get = get;
