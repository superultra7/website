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

var boardsize  = 24;
var myboard    = new Board(boardsize, boardsize, "myboard");
var theirboard = new Board(boardsize, boardsize, "theirboard");

myboard.draw();
theirboard.draw();

document
    .getElementById('fire')
    .onclick = function (e) {
        try {
            var coord   = document.getElementById('coord').value;
            var matches = coord.match(/^([A-Z])(\d+)/); // only support one letter (0-25)
            var x       = matches[1].charCodeAt(0)-64;
            var y       = matches[2];
            if(x>0 && x<=boardsize && y>0 && y<=boardsize) {
                myboard.fire(parseInt(x), parseInt(y));
            }
        } catch(e) {
            console.log("error", e);
        }
        return false;
    };

$(document).ready(() => {
    let game_id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6);
    let anchor  = document.location.href.split("#", 2);

    if(anchor.length === 2) {
	game_id = anchor[1];
    }

    document.getElementById('game_id').innerHTML=`<a href="${document.location.href}#${game_id}">${game_id}</a>`;

    let socket = io.connect();
    console.log(socket);
    socket.emit('join', game_id);
    socket.on('start', () => {
	alert("start!");
    });
    socket.on('player left', () => {
	alert("the other player left");
    });
});

var myfleet = new Fleet("myfleet");

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
