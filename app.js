var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

//var routes = require('./routes/index');
//var users = require('./routes/users');

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



// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	console.error(err);
	res.status(err.status || 500);
	res.render('error', {
		message : err.message,
		error : {}
	});
});


// use for proxy to back-end
//https://fbstocks.transportops.com/dummy/stocks.php
//pure-bastion-7939.herokuapp.com
var targetHost = 'google.com';
var targetPort = 80;
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer();  
//var proxy = httpProxy.createServer({
//	  target: 'ws://tiger:3000',
//	  ws: true
//	}).listen(4000); //TODO test

proxy.on('error', function(err, req, res){
	console.error(err);
});
proxy.on('proxyRes', function(proxyRes, req, res){
	debugger;
	console.log(proxyRes);
});

//TODO test
//app.all('/', function(req, res){
//	proxy.web(req, res, {target:'https://google.com', secure: false,
//		ssl:{			
//			key: fs.readFileSync('ryans-key.pem', 'utf8'),
//		    cert: fs.readFileSync('ryans-cert.pem', 'utf8')
//		}});
//});

//app.all('/fb-stocks/**', function(req, res) {
//	console.log('herer');
//	proxy.web(req, res, {
//		target : {
//			host: targetHost,
//			port: targetPort
//		}
//	});
//});

var server = app.listen(3000, function() {
	console.log('Listening on port %d', server.address().port);
});

//server.on('upgrade', function(req, socket, head) {
//	console.log('upgrade received');
//	proxy.ws(req, socket, head, {
//		target : 'ws://transportops.com:9090',
//		xfwd: true
//		}
//	);
//}); 



