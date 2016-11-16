/**
 * Created by khairullah.gaurab on 11/6/2016.
 */
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

users = [];
connections = [];

app.use(express.static(__dirname+'/'));

server.listen(process.env.PORT || 3030);
console.log('Server Running!!!');

app.get('/', function (request, respond) {
    respond.sendFile(__dirname+'/index.html');
});

io.sockets.on('connection',function (socket) {
    connections.push(socket);
    console.log('Connected: %s sockets connected',connections.length);

    //Disconnect
    socket.on('disconnect',function (data) {
        users.splice(users.indexOf(socket.username),1);
        updateUsername();
        connections.splice(connections.indexOf(socket),1);
        console.log('Disconnected: %s sockets connected',connections.length);
    });
    //Send Message
    socket.on('send message',function (data) {
        io.sockets.emit('new message',{msg:data, user:socket.username});
    });
    //New User Added
    socket.on('new user',function (data) {
        console.log(data);
        socket.username = data;
        users.push(socket.username);
        updateUsername();
    });
    function updateUsername(){
        io.sockets.emit('get users', users);
        console.log('Emitting from Server!');
    }
});