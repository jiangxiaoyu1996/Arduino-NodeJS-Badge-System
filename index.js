var Cylon = require('cylon');
var express = require('express');
var http = require('http');
var app = express();
var server = http.Server(app);
var io = require('socket.io')(server);
var port = 3000;

app.use(express.static(__dirname + '/'));
app.get('/', function (req, res) {
    res.sendFile('index.html');
});
server.listen(port, function () {
    console.log("Listening on the port: ", port);
});

//Initialize the robot
Cylon.api('http'); //Link to the local browser
Cylon.robot({
    connections: {
        arduino: {adaptor: 'firmata', port: '/dev/tty.usbmodem14101'}
    },
    devices: {
        led: {driver: 'led', pin: 1}
    }
}).start();