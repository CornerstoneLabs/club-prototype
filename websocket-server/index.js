var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var _sockets = [];

app.get('/', function(req, res){
	res.send(200, 'ok');
});

app.get('/update', function (req, res) {
	io.emit('update');

	res.send('sent ' + new Date());
});

io.on('connection', function(socket){
	console.log('a user connected');

	_sockets.push(socket);
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
