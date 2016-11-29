// Never seen window.location before?
// This object describes the URL of the page we're on!
var socket = io(window.location.origin);

socket.on('connect', function () {
    console.log('I have made a persistent two-way connection to the server!');
});

whiteboard.on('draw', function(...payload) {
	socket.emit('drawing', ...payload)
})

socket.on('globalDrawing', function(...payload) {
	console.log(...payload)
	whiteboard.draw(...payload)
})

socket.on('loadSavedDrawing', function(...savedDrawing) {
	// whiteboard.draw(...savedDrawing)

	savedDrawing.forEach((payload) => {
		whiteboard.draw(...payload)
	})

	console.log(savedDrawing)
})