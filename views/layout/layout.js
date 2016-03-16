;(function(){

    var stat = require('lib/stat');
    var pfm = require('lib/pfm');

    // 前端打点监听
    stat.delegate();

    // [stat] 前端性能打点
    pfm.init(_START_TIME ? _START_TIME : 0);
    pfm.get(function(pfmData){
        if (pfmData) {
            pfmData.category = 'performance';
            stat.event(pfmData);
        }
    })

})();
