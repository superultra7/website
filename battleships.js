import Battleship from "./vessels/battleship";
import Carrier    from "./vessels/carrier";
import Destroyer  from "./vessels/destroyer";
import Submarine  from "./vessels/submarine";
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

var myfleet = new Fleet("myfleet");
myfleet.commission(new Battleship);
myfleet.commission(new Carrier);
myfleet.commission(new Destroyer);
myfleet.commission(new Destroyer);
myfleet.commission(new Submarine);
myfleet.commission(new Submarine);

myfleet.deploy('Battleship', new Heading(new Coordinate(5,5),   new Direction('nw')));
myfleet.deploy('Carrier',    new Heading(new Coordinate(20,20), new Direction('s')));
myfleet.deploy('Carrier',    new Heading(new Coordinate(20,20), new Direction('s')));

myboard.deploy(myfleet);

myfleet.draw();
