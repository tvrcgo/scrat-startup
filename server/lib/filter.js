'use strict';

/**
 * 文章正文处理
 * @param  {string} content   正文内容
 * @param  {array} resources
 * @return {string}           处理后的正文内容
 */
exports.content = function(story){

    var content = story.content || '';
    // 去掉 style, class
    content = content.replace(/(style|class)="[^"]+"/g, '');
    // 去掉 font, br
    content = content.replace(/<[\/]?(font|br)[^>]*?>/g, '');
    // 去掉空标签
    var empty = /<(\w+)[^>]*>(\s|&nbsp;)*<\/\1>/g;
    while(empty.test(content)) {
        content = content.replace(empty, '');
    }

    return content;
}

/**
 * 时间格式
 * @return {string} 时间
 */
exports.timeformat = function(time){
    var now = +new Date,
        mmm = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        originalTime = new Date(time),
        year = originalTime.getFullYear(),
        month = mmm[originalTime.getMonth()],
        day = originalTime.getDate(),
        hour = originalTime.getHours(),
        minute = originalTime.getMinutes();

    if (month<10) month = '0' + month;
    if (hour<10) hour = '0' + hour;
    if (minute<10) minute = '0' + minute;
    return day + ' ' + month + '. ' + year + ', ' + [hour, minute].join(':');
}

/**
 * 过滤文本左右空白和换行符
 */
exports.trim = function(text){
    return text.replace(/^\s*|\s*$|[\r\n]*/g, '');
}
