import Board from "./board";
import Fleet from "./fleet";
var size = 24;

var myboard    = new Board(size, size, "myboard");
var theirboard = new Board(size, size, "theirboard");
myboard.draw();
theirboard.draw();
