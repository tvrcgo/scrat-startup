var express = require('express');
var app = module.exports = express();
var path = require('path');

// dependencies
var compression = require('compression'); // gzip

// middlewares
var router = require('./router'); // routers
var engine = require('./mw/engine'); // swig engine
var render = require('./mw/render'); // render tpl
var combo = require('./mw/combo'); // combo
var error = require('./mw/error'); // error handler

// app config
app.set('port', process.env.PORT || 8800);
app.set('root', path.join(__dirname, '..'));
app.use(compression());
app.use('/co', combo(app));
app.use('/public', express.static(app.get('root') + '/public'));
app.use(router());
app.use(engine(app));
app.use(['/:page/*'], render());
app.use(error());

// listen
if (!module.parent) {
	app.listen(app.get('port'), function(){
		console.log('[alone] server start at port %d', app.get('port'));
	})
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
})
