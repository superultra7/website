"use strict";
import Battleship from "./vessels/battleship";
import Carrier    from "./vessels/carrier";
import Destroyer  from "./vessels/destroyer";
import Submarine  from "./vessels/submarine";
import Frigate  from "./vessels/frigate";
import Lifeboat  from "./vessels/lifeboat";
import Heading    from "./heading";
import Coordinate from "./coordinate";
import Direction  from "./direction";

import Board from "./board";
import Fleet from "./fleet";

var boardsize  = 24;
var myboard    = new Board(boardsize, boardsize, "myboard");
var theirboard = new Board(boardsize, boardsize, "theirboard");

myboard.draw();
theirboard.draw();

document
    .getElementById('fire')
    .onclick = function (e) {
        var x=document.getElementById('x').value;
        var y=document.getElementById('y').value;
        myboard.fire(parseInt(x), parseInt(y));
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

myfleet.deploy('Battleship', new Heading(new Coordinate(5,5),   new Direction('nw')));
myfleet.deploy('Carrier',    new Heading(new Coordinate(20,20), new Direction('s')));
myfleet.deploy('Destroyer',  new Heading(new Coordinate(20,5),  new Direction('s')));
myfleet.deploy('Destroyer',  new Heading(new Coordinate(10,10), new Direction('s')));
myfleet.deploy('Submarine',  new Heading(new Coordinate(8,0),   new Direction('n')));
myfleet.deploy('Submarine',  new Heading(new Coordinate(10,20), new Direction('s')));
myfleet.deploy('Frigate', new Heading(new Coordinate(5,5),   new Direction('e')));
myfleet.deploy('Lifeboat',    new Heading(new Coordinate(13,1), new Direction('w')));


myboard.deploy(myfleet);

myfleet.draw();
