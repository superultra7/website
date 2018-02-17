"use strict";

require('webpack-jquery-ui');
require('webpack-jquery-ui/css');
require('webpack-jquery-ui/interactions');
require('webpack-jquery-ui/widgets');
require('webpack-jquery-ui/effects');
//require("socket.io-client");
import io from 'socket.io-client';

import {Battleship, Carrier, Destroyer, Submarine, Frigate, Lifeboat} from "./vessels";

import Heading    from "./heading";
import Coordinate from "./coordinate";
import Direction  from "./direction";
import Board      from "./board";
import Fleet      from "./fleet";

let boardsize  = 24;
let myboard    = new Board(boardsize, boardsize, "myboard");
let theirboard = new Board(boardsize, boardsize, "theirboard");
let socket     = io.connect();

myboard.draw();
theirboard.draw();

document
    .getElementById('fire')
    .onclick = function (e) {
        try {
            var coord   = document.getElementById('coord').value;
            var matches = coord.match(/^([A-Z])(\d+)/); // only support one letter (0-25)
            var x       = parseInt(matches[1].charCodeAt(0)-64);
            var y       = parseInt(matches[2]);
            if(x>0 && x<=boardsize && y>0 && y<=boardsize) { // basic boundary checking
		console.log("turn", {x:x, y:y});
		socket.emit('turn', {x:x, y:y});
            } else {
		console.error("out of bounds");
	    }
        } catch(e) {
            console.log("error", e);
        }
        return false;
    };

const notify = (body, title, icon) => {
    if(!Notification) {
	// no support
	return;
    }

    if (Notification.permission !== "granted") {
	Notification.requestPermission();
    }

    var notification = new Notification(title || 'battleships', {
	icon: icon || 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
	body: body,
    });
};

$(document).ready(() => {
    let game_id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6);
    let anchor  = document.location.href.split("#", 2);

    if(anchor.length === 2) {
	game_id = anchor[1];
    }

    document.getElementById('game_id').innerHTML=`<a href="${anchor[0]}#${game_id}">${game_id}</a>`;

    if (Notification && Notification.permission !== "granted") {
	Notification.requestPermission();
    }

    /*
     * socket.io handling
     */
    socket.emit('join', game_id); // join a game as soon as the page is ready

    socket.on('start', () => {
	notify('game started');
    });

    socket.on('player left', () => {
	notify('other player left');
    });
    socket.on('turn', (turn) => {
	notify(`other player fired ${turn.x},${turn.y}`);
        myboard.fire(parseInt(turn.x), parseInt(turn.y), (result) => {
	    socket.emit(result ? 'hit' : 'miss', turn);
	});
    });
    socket.on('hit', (turn) => {
	notify(`HIT! ${turn.x},${turn.y}`);
	theirboard.mark_cell(turn.x, turn.y, "hit");
    });
    socket.on('miss', (turn) => {
	notify(`MISS! ${turn.x},${turn.y}`);
	theirboard.mark_cell(turn.x, turn.y, "miss");
    });
});


let myfleet = new Fleet("myfleet");

myfleet.commission(new Battleship);
myfleet.commission(new Carrier);
myfleet.commission(new Destroyer);
myfleet.commission(new Destroyer);
myfleet.commission(new Submarine);
myfleet.commission(new Submarine);
myfleet.commission(new Frigate);
myfleet.commission(new Lifeboat);

function rnd_pos () {
    return Math.floor(Math.random() * boardsize);
}


myfleet.deploy('Battleship', new Heading(new Coordinate(rnd_pos(), rnd_pos()),   new Direction('random')));
//myfleet.deploy('Carrier',    new Heading(new Coordinate(20,20), new Direction('s')));
//myfleet.deploy('Destroyer',  new Heading(new Coordinate(20,5),  new Direction('s')));
//myfleet.deploy('Destroyer',  new Heading(new Coordinate(10,10), new Direction('s')));
//myfleet.deploy('Submarine',  new Heading(new Coordinate(8,0),   new Direction('n')));
//myfleet.deploy('Submarine',  new Heading(new Coordinate(10,20), new Direction('s')));
//myfleet.deploy('Frigate', new Heading(new Coordinate(5,5),   new Direction('e')));
//myfleet.deploy('Lifeboat',    new Heading(new Coordinate(13,1), new Direction('w')));


myboard.deploy(myfleet);

myfleet.draw();

$('#init').click(() => {
    sp.start();
});
