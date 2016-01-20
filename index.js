var express = require('express');
var app = express();
var server = require('http').createServer(app);
var five = require('johnny-five');
var io = require('socket.io');
var socket = io.listen(server);
var board = new five.Board();
var port = 3000;
// setup the app
app.use('/', express.static(__dirname + '/public'));
app.get('/', function(req, res) {
  res.sendfile('index.html');
});
// setup the board
board.on("ready", function() {

  var buttonOne = new five.Button({
    pin: 2,
    isPullup: true
  });

  var buttonTwo = new five.Button({
    pin: 4,
    isPullup: true
  });

  socket.on('connection', function(client) {

    // log what the client is sending
    client.on('message', function(message) {
      console.log(message);
    });

    // on press send something to the client
    buttonOne.on('down', function(valueOne) {
      var messageOne = "Hello client One";
      client.send(messageOne);
      console.log("buttonOne");
    });

    // on press send something to the client
    buttonTwo.on('down', function(valueTwo) {
      var messageTwo = "Hello client Two";
      client.send(messageTwo);
      console.log("buttonTwo");
    });

  });
});

// now build the connection via socket
// run the server
console.log("listening on port http://localhost:" + port);
server.listen(port);
