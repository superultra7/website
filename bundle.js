/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Vessel {
    constructor (size) {
        this.size = size;
    }

    heading (heading) {
	if(heading) {
	    this._heading = heading;
	}

	return this._heading;
    }

    // returns an array of coordinates which this vessel occupies
    coords () {
	var heading = this.heading();
	if(!heading) {
	    console.log(this.constructor.name, "has no heading");
	    return [];
	}

	var start_coordinate = heading.coordinate();
	var delta  = heading.direction().delta();
	var coords = [];

	for (var i=0; i<this.size; i++) {
	    coords.push(this._heading.coordinate().move(delta, i));
	}

	return coords;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Vessel;
;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vessels_battleship__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vessels_carrier__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vessels_destroyer__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vessels_submarine__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__heading__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__coordinate__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__direction__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__board__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__fleet__ = __webpack_require__(10);











var boardsize  = 24;
var myboard    = new __WEBPACK_IMPORTED_MODULE_7__board__["a" /* default */](boardsize, boardsize, "myboard");
var theirboard = new __WEBPACK_IMPORTED_MODULE_7__board__["a" /* default */](boardsize, boardsize, "theirboard");

myboard.draw();
theirboard.draw();

var myfleet = new __WEBPACK_IMPORTED_MODULE_8__fleet__["a" /* default */]();
myfleet.commission(new __WEBPACK_IMPORTED_MODULE_0__vessels_battleship__["a" /* default */]);
myfleet.commission(new __WEBPACK_IMPORTED_MODULE_1__vessels_carrier__["a" /* default */]);
//myfleet.commission(new Destroyer);
//myfleet.commission(new Destroyer);
//myfleet.commission(new Submarine);
//myfleet.commission(new Submarine);

myfleet.deploy('Battleship', new __WEBPACK_IMPORTED_MODULE_4__heading__["a" /* default */](new __WEBPACK_IMPORTED_MODULE_5__coordinate__["a" /* default */](5,5),   new __WEBPACK_IMPORTED_MODULE_6__direction__["a" /* default */]('nw')));
myfleet.deploy('Carrier',    new __WEBPACK_IMPORTED_MODULE_4__heading__["a" /* default */](new __WEBPACK_IMPORTED_MODULE_5__coordinate__["a" /* default */](20,20), new __WEBPACK_IMPORTED_MODULE_6__direction__["a" /* default */]('s')));

myboard.deploy(myfleet);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vessel__ = __webpack_require__(0);


class Battleship extends __WEBPACK_IMPORTED_MODULE_0__vessel__["a" /* default */] {
    constructor () {
        super(5);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Battleship;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vessel__ = __webpack_require__(0);


class Carrier extends __WEBPACK_IMPORTED_MODULE_0__vessel__["a" /* default */] {
    constructor () {
        super(4);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Carrier;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vessel__ = __webpack_require__(0);


class Destroyer extends __WEBPACK_IMPORTED_MODULE_0__vessel__["a" /* default */] {
    constructor () {
        super(3);
    }
}
/* unused harmony export default */



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vessel__ = __webpack_require__(0);


class Submarine extends __WEBPACK_IMPORTED_MODULE_0__vessel__["a" /* default */] {
    constructor () {
        super(2);
    }
}
/* unused harmony export default */



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Heading {
    constructor (coordinate, direction) {
        this._coordinate = coordinate;
        this._direction  = direction;
    }

    coordinate () {
	return this._coordinate;
    }

    direction () {
	return this._direction;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Heading;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Coordinate {
    constructor (x, y) {
        this._x = x;
        this._y = y;
    }

    x () {
	return this._x;
    }

    y () {
	return this._y;
    }

    move (delta, magnitude) {
	return new Coordinate(this._x + (delta[0] * magnitude), this._y + (delta[1] * magnitude));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Coordinate;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const mapping = {
    "n":  [0,   1],
    "s":  [0,  -1],
    "e":  [1,   0],
    "w":  [-1,  0],
    "nw": [-1, -1],
};

class Direction {
    constructor (direction) {
        this._direction = direction; // n, ne, e, se, s, sw, w, nw
    }

    delta () {
	var delta = mapping[this._direction];
	if(!delta) {
	    console.log(`no mapping for direction ${this._direction}`);
	    return [0,0];
	}

	return delta;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Direction;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Board {
    constructor (height, width, id) {
        this.board  = new Array(height).fill(new Array(width));
        this.width  = width;
        this.height = height;
        this.id     = id;
    }

    deploy (fleet) {
	this.fleet = fleet;
	this.refresh();
    }

    draw () {
        var container       = document.createElement("div");
	container.className = "board";

        for (var y=0; y<this.height; y++) {
            var row       = document.createElement("div");
	    row.dataset.y = y;
	    row.className = "row"

            for (var x=0; x<this.width; x++) {
                var col       = document.createElement("div");
		col.dataset.x = x;
		col.dataset.y = y;
		col.className = "cell";

                row.appendChild(col);
            }
            container.appendChild(row);
        }

        var element = document.getElementById(this.id);
        if(!element) {
            console.log(`element ${this.id} not found`);
            return;
        }
        element.appendChild(container);
//	this.refresh();
    }

    refresh () {
	var fleet = this.fleet;
	var id    = this.id;

	if(!fleet) {
	    console.log("no fleet deployed");
	    return;
	}

	fleet.vessels().forEach(function (o) {
	    o.coords().forEach(function (c) {
		var cell = document.querySelector("#"+id+" .cell[data-x='"+c.x()+"'][data-y='"+c.y()+"']");
		var cn   = cell.className.split(" ");
		cn.push("hot");
		cell.className=cn.join(" ");
	    });
	});
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Board;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Fleet {
    constructor () {
        this._vessels = [];
    }

    commission (vessel) {
	this._vessels.push(vessel);
    }

    vessels () {
	return this._vessels;
    }

    deploy (vesseltype, heading) {
	var undeployed_vessels = this._vessels.filter(function (o) {

	    if (o.constructor.name === vesseltype) {
		return 1;
	    }
	});

	if(undeployed_vessels.length === 0) {
	    console.log(`no undeployed vessels of type ${vesseltype}`);
	    return;
	}

	undeployed_vessels[0].heading(heading);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Fleet;
;


/***/ })
/******/ ]);