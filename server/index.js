var express = require('express');
var app = module.exports = express();
var bodyparser = require('body-parser');
var compression = require('compression');
var path = require('path');

// server modules
var router = require('./router');
var engine = require('./engine');
var render = require('./render');

// app config
var root = path.join(__dirname, '..');
app.set('port', process.env.PORT || 8800);
app.set('root', root);
app.use('/public', express.static(root + '/public'));
app.use(compression()); // gzip
app.use(router());
app.use(engine(app));
app.use(['/:page/*'], render());

// start
if (!module.parent) {
	app.listen(app.get('port'), function(){
		console.log('[alone] Express start at port %d', app.get('port'));
	});
}

// exception
process.on('uncaughtException', function (err) {
    console.error('Uncaught exception:', err, err.stack);
    // Exception
    switch (err.errno) {
        case 'EADDRINUSE': // 端口被占用
            process.exit(5001);
            break;
        default:
            //
    }
});
