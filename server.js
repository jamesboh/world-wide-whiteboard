var path = require('path');

var http = require('http');
var server = http.createServer();

var express = require('express');
var app = express();

var socketio = require('socket.io');

server.on('request', app);

var io = socketio(server);

var savedDrawing = [];

io.on('connection', function (socket) {
    /* This function receives the newly connected socket.
       This function will be called for EACH browser that connects to our server. */
    console.log('A new client has connected!');
    console.log(socket.id);

    if (savedDrawing.length) socket.emit('loadSavedDrawing', ...savedDrawing);

    socket.on('disconnect', function() {
    	console.log(':(');
    })

    socket.on('drawing', function(...payload) {
 		socket.broadcast.emit('globalDrawing', ...payload)
 		// console.log(...payload)
		savedDrawing.push(payload)
		console.log(savedDrawing);
    })
});
// io.on('disconnect', function(socket) {
// 	console.log(':(');
// })

server.listen(1337, function () {
    console.log('The server is listening on port 1337!');
});

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});