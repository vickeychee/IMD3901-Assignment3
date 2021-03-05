const express   = require('express');
const app       = express();
const http      = require('http');
const server    = require('http').createServer(app);  
const io        = require('socket.io')(server);

const LISTEN_PORT   = 8080;

server.listen(LISTEN_PORT);
app.use(express.static(__dirname + '/public')); //set root path of server ...
console.log("Listening on port: " + LISTEN_PORT );

//our routes
app.get( '/', function( req, res ){ 
    res.sendFile( __dirname + '/public/index.html' );
});

app.get( '/player1', function( req, res ){ 
    res.sendFile( __dirname + '/public/player1.html' );
});

app.get( '/player2', function( req, res ){ 
    res.sendFile( __dirname + '/public/player2.html' );
});


//socket.io events

io.on('connection', (socket) => {
    console.log('socket connected:' + socket.id);

    socket.on('blue',(data) => {
        io.sockets.emit('ring_color_change', '#1fe4f4');
    });

    socket.on('yellow',(data) => {
        io.sockets.emit('ring_color_change', '#f6de00');
    });

    socket.on('pink',(data) => {
        io.sockets.emit('ring_color_change', '#fe287c');
    });

    socket.on('purple',(data) => {
        io.sockets.emit('ring_color_change', '#7028cf');
    });
    
    socket.on('blue2',(data) => {
        io.sockets.emit('ring_color_change2', '#1fe4f4');
    });

    socket.on('yellow2',(data) => {
        io.sockets.emit('ring_color_change2', '#f6de00');
    });

    socket.on('pink2',(data) => {
        io.sockets.emit('ring_color_change2', '#fe287c');
    });

    socket.on('purple2',(data) => {
        io.sockets.emit('ring_color_change2', '#7028cf');
    });
    socket.on('ringSequence',(data) => {
        io.sockets.emit('ring_play_sequence');
    });

    socket.on('player2WaitScreenOff',(data) => {
        io.sockets.emit('player2_wait_screenOff');
    });

    socket.on('player2WaitScreen2On',(data) => {
        io.sockets.emit('player2_wait_screenOn');
    });

    socket.on('player2Banner',(data) => {
        io.sockets.emit('player2_banner');
    });

    socket.on('gameOver',(data) => {
        io.sockets.emit('game_Over');
    });

    socket.on('player1Win',(data) => {
        io.sockets.emit('player1_Win');
    });

    socket.on('player2Win',(data) => {
        io.sockets.emit('player2_Win');
    });

});