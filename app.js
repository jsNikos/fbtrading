var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
//app.use(bodyParser.json());   TODO switsched-off for proxy
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public'),  {compiler: {compress: false}}));
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/users', users);

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message : err.message,
			error : err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message : err.message,
		error : {}
	});
});

// use for proxy to back-end
var targetHost = 'pure-bastion-7939.herokuapp.com';
var targetPort = 80;
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer();  
//var proxy = httpProxy.createServer({
//	  target: 'ws://tiger:3000',
//	  ws: true
//	}).listen(4000); //TODO test

proxy.on('error', function(err, req, res){
	debugger;
});
proxy.on('proxyRes', function(proxyRes, req, res){
	debugger;
});
app.all('/fb-stocks/**', function(req, res) {
	console.log('herer');
	proxy.web(req, res, {
		target : {
			host: targetHost,
			port: targetPort
		}
	});
});

var server = app.listen(3000, function() {
	console.log('Listening on port %d', server.address().port);
});

server.on('upgrade', function(req, socket, head) {
	console.log('upgrade received');
	proxy.ws(req, socket, head, {
		target : 'ws://pure-bastion-7939.herokuapp.com:80',
		xfwd: true
		}
	);
}); 


//TODO test
var server2 = require('http').createServer().listen(4000);

// TODO test websocket
var WebSocketServer = require('websocket').server;
wsServer = new WebSocketServer({
    httpServer: server2,    
    autoAcceptConnections: false
});
wsServer.on('request', function(request) {
	console.log('connection');	
    var connection = request.accept(null, request.origin);
    console.log((new Date()) + ' Connection accepted.');
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            connection.sendUTF(message.utf8Data);
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});

