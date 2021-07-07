"use strict";
/*
require('webpack-jquery-ui');
require('webpack-jquery-ui/css');
require('webpack-jquery-ui/interactions');
require('webpack-jquery-ui/widgets');
require('webpack-jquery-ui/effects');
require('webpack-jquery-ui/dialog');
*/
import { ipcRenderer } from "electron";
import io from 'socket.io-client';

import {Battleship, Carrier, Destroyer, Submarine, Frigate, Lifeboat} from "./vessels";

import Heading    from "./heading";
import Coordinate from "./coordinate";
import Direction  from "./direction";
import Board      from "./board";
import Fleet      from "./fleet";
import Fx         from "./fx";

let boardsize  = 24;
let myboard    = new Board(boardsize, boardsize, "myboard");
let theirboard = new Board(boardsize, boardsize, "theirboard");
let fx         = new Fx();
let socket;

ipcRenderer.on("lan_player", (e, data) => {
    $('#setup_lan').append(`<li>${data.addr}:${data.port} <a data-address="${data.addr}:${data.port}" href="#">connect</a></li>`);
    $('#setup_lan a').unbind('click').click((e) => {
	console.log("click", e.target.dataset["address"]);
	socket = io.connect(`http://${e.target.dataset["address"]}`);
	
	socket.on('start', () => {
	    fx.play('klaxon');
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
});

fx.play('klaxon');

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
    $('#connect').click((e) => {
	e.preventDefault();
	let game_id = $('#game_id').value;
	console.log("joining " + game_id);
	socket.emit('join', game_id); // join a game as soon as the page is ready
	return false;
    });

    let new_game_id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6);
    let game_id = $('#game_id').value;
    if(!game_id) {
	$('#game_id').value = new_game_id;
    }

//    document.getElementById('game_id').innerHTML=`<a href="${anchor[0]}#${game_id}">${game_id}</a>`;

    if (Notification && Notification.permission !== "granted") {
	Notification.requestPermission();
    }

    /*
     * socket.io handling
     */
//    socket.emit('join', game_id); // join a game as soon as the page is ready

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

const rnd_pos = () => {
    return Math.floor(Math.random() * boardsize);
}


//myfleet.deploy('Battleship', new Heading(new Coordinate(rnd_pos(), rnd_pos()),   new Direction('random')));
myfleet.deploy('Carrier',    new Heading(new Coordinate(rnd_pos(), rnd_pos()), new Direction('random')));
myfleet.deploy('Destroyer',  new Heading(new Coordinate(rnd_pos(), rnd_pos()), new Direction('random')));
myfleet.deploy('Destroyer',  new Heading(new Coordinate(rnd_pos(), rnd_pos()), new Direction('random')));
myfleet.deploy('Submarine',  new Heading(new Coordinate(rnd_pos(), rnd_pos()), new Direction('random')));
myfleet.deploy('Submarine',  new Heading(new Coordinate(rnd_pos(), rnd_pos()), new Direction('random')));
myfleet.deploy('Frigate',    new Heading(new Coordinate(rnd_pos(), rnd_pos()), new Direction('random')));
myfleet.deploy('Lifeboat',   new Heading(new Coordinate(rnd_pos(), rnd_pos()), new Direction('random')));

myboard.deploy(myfleet);

myfleet.draw();

//$('#init').click(() => {
//    sp.start();
//});
