// Let's create a new socket and assign it to a local variable.
$(document).ready(function() {
  var socket = new io();
  var toggleOne = true;
  var toggleTwo = true;

  // Establish a connection back to the server from the browser.
  socket.connect('http://localhost:3000', {
    autoConnect: true
  });

  // Attach an event to the click event of document's button.
  $('#sendit').click(function() {
    var message = 'The time is now ' + new Date();
    // console.log('Sending the message "' + message + '"');
    socket.send(message);
  });

  // Create a handler for when a message arrives from the server.
  socket.on('message', function(msg) {
    // When a message arrives, toggle the body color.
    console.log(messageOne);
    if (msg === 'buttonOne') {

      if (toggleTwo === true) {
        $('h1').css('color', 'red');
        toggleTwo = !toggleTwo;
      } else {
        $('h1').css('color', 'blue');
        toggleTwo = !toggleTwo;
      }

    } else if (msg === 'buttonTwo') {

      if (toggleOne === true) {
        $('body').css('background-color', 'black');
        toggleOne = !toggleOne;
      } else {
        $('body').css('background-color', 'white');
        toggleOne = !toggleOne;
      }
    }
  });

  // Create a handler for when a message arrives from the server.
  socket.on('message', function(messageTwo) {
    // When a message arrives, toggle the body color.
    console.log(messageTwo);
  });
});