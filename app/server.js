const uuidv1  = require('uuid/v1');
const express = require('express');
const app     = express();
const http    = require('http').Server(app);
const io      = require('socket.io')(http);

export default class Server {
    constructor (port) {
	this.games = {};

	app.use('/',
		express.static('build', {
		    dotfiles: 'ignore',
		    etag: false,
		    extensions: ['css', 'js', 'html'],
		    index: false,
		    maxAge: '1d',
		    redirect: false,
		    setHeaders: (res, path, stat) => {
			res.set('x-timestamp', Date.now());
		    }
		}));
	
	io.on('connection', (socket) => {
	    console.log('a user connected');
	    socket.on('join', (game_id) => {
		
		if(!this.games[game_id]) {
		    this.games[game_id] = {
			players: {}
		    };
		}
		
		socket.join(game_id);
		socket.game_id = game_id;
		this.games[game_id].players[socket.id] = Object.keys(this.games[game_id]).length + 1; // length before value is added
		
		console.log(game_id, `player ${this.games[game_id].players[socket.id]} joined`);
		
		if(Object.keys(this.games[game_id].players).length == 2) {
		    // two players in the game - ready to start
		    io.to(game_id).emit('start');
		}
	    });
	    
	    socket.on('turn', (data) => {
		console.log(`${socket.id} played ${data.x}, ${data.y}`);
		socket.to(socket.game_id).emit('turn', data);
	    });
	    socket.on('hit', (data) => {
		socket.to(socket.game_id).emit('hit', data);
	    });
	    socket.on('miss', (data) => {
		socket.to(socket.game_id).emit('miss', data);
	    });
	    
	    socket.on('disconnect', () => {
		if(socket.game_id) {
		    console.log(`${socket.game_id} player ${this.games[socket.game_id].players[socket.id]} left`);
		    socket.to(socket.game_id).emit(`player left`);
		    delete this.games[socket.game_id].players[socket.id];
		    // argumably the whole game should be reset now
		    // if someone else connects the game state for each player won't correspond to the other
		}
	    });
	});
	
	http.listen(port, () => {
	    console.log(`listening on *:${port}`);
	});
    }
}
