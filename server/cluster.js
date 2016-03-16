'use strict';

/**
 * Cluster
 * @author weilai
 */

var cluster = require('cluster'),
    os = require('os'),
    app = require('./index'),
    cpuCount = os.cpus().length;

if (cluster.isMaster) {
    for(var i=0; i<cpuCount; i++) {
        cluster.fork();
    }
    // reboot on crashed.
    cluster.on('exit', function (worker, code) {
        console.error('worker %d died (%d)', worker.id, code);
        switch (code) {
            case 5001:
                //@TODO ADDR IN USE
                break;
            default:
                cluster.fork();
        }
    });
}
else {
    app.listen(app.get('port'), function(){
        console.log('[fork] server start at port %d', app.get('port'));
    })
}
