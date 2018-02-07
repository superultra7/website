"use strict";
require('webpack-jquery-ui');
require('webpack-jquery-ui/css');
import SockPuppet from "./sockpuppet";
import {Battleship, Carrier, Destroyer, Submarine, Frigate, Lifeboat} from "./vessels";

import Heading    from "./heading";
import Coordinate from "./coordinate";
import Direction  from "./direction";
import Board      from "./board";
import Fleet      from "./fleet";

var boardsize  = 24;
var myboard    = new Board(boardsize, boardsize, "myboard");
var theirboard = new Board(boardsize, boardsize, "theirboard");
var sp         = new SockPuppet("ws://localhost:8080");

sp.start();

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
