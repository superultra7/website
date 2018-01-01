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
        this._size   = size;
        this._damage = 0;
        this._events = {};
    }

    heading (heading) {
        if(heading) {
            this._heading = heading;
            this.trigger('change', 'heading'); // trigger a redraw
        }

        return this._heading;
    }

    type () {
        return this.constructor.name;
    }

    deployed () {
        return this._heading ? 1 : 0;
    }

    perc_damage () {
        return 100 * (this._damage / this._size);
    }

    bind (type, func) {
        if(!this._events[type]) {
            this._events[type] = new Array();
        }
        this._events[type].push(func);
    }

    trigger (type, args) {
        if(this._events[type]) {
            this._events[type].forEach(function (f) { f(args); });
        }
    }

    hit (damage) {
        this._damage += damage;
        this.trigger('change');
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

        for (var i=0; i<this._size; i++) {
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__vessels_frigate__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__vessels_lifeboat__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__heading__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__coordinate__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__direction__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__board__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__fleet__ = __webpack_require__(12);














var boardsize  = 24;
var myboard    = new __WEBPACK_IMPORTED_MODULE_9__board__["a" /* default */](boardsize, boardsize, "myboard");
var theirboard = new __WEBPACK_IMPORTED_MODULE_9__board__["a" /* default */](boardsize, boardsize, "theirboard");

myboard.draw();
theirboard.draw();

document
    .getElementById('fire')
    .onclick = function (e) {
        var x = document.getElementById('x').value;
        var y = document.getElementById('y').value;
        myboard.fire(parseInt(x), parseInt(y));
        return false;
    };

var myfleet = new __WEBPACK_IMPORTED_MODULE_10__fleet__["a" /* default */]("myfleet");

myfleet.commission(new __WEBPACK_IMPORTED_MODULE_0__vessels_battleship__["a" /* default */]);
myfleet.commission(new __WEBPACK_IMPORTED_MODULE_1__vessels_carrier__["a" /* default */]);
myfleet.commission(new __WEBPACK_IMPORTED_MODULE_2__vessels_destroyer__["a" /* default */]);
myfleet.commission(new __WEBPACK_IMPORTED_MODULE_2__vessels_destroyer__["a" /* default */]);
myfleet.commission(new __WEBPACK_IMPORTED_MODULE_3__vessels_submarine__["a" /* default */]);
myfleet.commission(new __WEBPACK_IMPORTED_MODULE_3__vessels_submarine__["a" /* default */]);
myfleet.commission(new __WEBPACK_IMPORTED_MODULE_4__vessels_frigate__["a" /* default */]);
myfleet.commission(new __WEBPACK_IMPORTED_MODULE_5__vessels_lifeboat__["a" /* default */]);

myfleet.deploy('Battleship', new __WEBPACK_IMPORTED_MODULE_6__heading__["a" /* default */](new __WEBPACK_IMPORTED_MODULE_7__coordinate__["a" /* default */](5,5),   new __WEBPACK_IMPORTED_MODULE_8__direction__["a" /* default */]('nw')));
myfleet.deploy('Carrier',    new __WEBPACK_IMPORTED_MODULE_6__heading__["a" /* default */](new __WEBPACK_IMPORTED_MODULE_7__coordinate__["a" /* default */](20,20), new __WEBPACK_IMPORTED_MODULE_8__direction__["a" /* default */]('s')));
myfleet.deploy('Destroyer',  new __WEBPACK_IMPORTED_MODULE_6__heading__["a" /* default */](new __WEBPACK_IMPORTED_MODULE_7__coordinate__["a" /* default */](20,5),  new __WEBPACK_IMPORTED_MODULE_8__direction__["a" /* default */]('s')));
myfleet.deploy('Destroyer',  new __WEBPACK_IMPORTED_MODULE_6__heading__["a" /* default */](new __WEBPACK_IMPORTED_MODULE_7__coordinate__["a" /* default */](10,10), new __WEBPACK_IMPORTED_MODULE_8__direction__["a" /* default */]('s')));
myfleet.deploy('Submarine',  new __WEBPACK_IMPORTED_MODULE_6__heading__["a" /* default */](new __WEBPACK_IMPORTED_MODULE_7__coordinate__["a" /* default */](8,0),   new __WEBPACK_IMPORTED_MODULE_8__direction__["a" /* default */]('n')));
myfleet.deploy('Submarine',  new __WEBPACK_IMPORTED_MODULE_6__heading__["a" /* default */](new __WEBPACK_IMPORTED_MODULE_7__coordinate__["a" /* default */](10,20), new __WEBPACK_IMPORTED_MODULE_8__direction__["a" /* default */]('s')));
myfleet.deploy('Frigate', new __WEBPACK_IMPORTED_MODULE_6__heading__["a" /* default */](new __WEBPACK_IMPORTED_MODULE_7__coordinate__["a" /* default */](5,5),   new __WEBPACK_IMPORTED_MODULE_8__direction__["a" /* default */]('e')));
myfleet.deploy('Lifeboat',    new __WEBPACK_IMPORTED_MODULE_6__heading__["a" /* default */](new __WEBPACK_IMPORTED_MODULE_7__coordinate__["a" /* default */](13,1), new __WEBPACK_IMPORTED_MODULE_8__direction__["a" /* default */]('w')));


myboard.deploy(myfleet);

myfleet.draw();


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
/* harmony export (immutable) */ __webpack_exports__["a"] = Destroyer;



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
/* harmony export (immutable) */ __webpack_exports__["a"] = Submarine;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vessel__ = __webpack_require__(0);


class Frigate extends __WEBPACK_IMPORTED_MODULE_0__vessel__["a" /* default */] {
    constructor () {
        super(6);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Frigate;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vessel__ = __webpack_require__(0);


class Lifeboat extends __WEBPACK_IMPORTED_MODULE_0__vessel__["a" /* default */] {
    constructor () {
        super(1);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Lifeboat;



/***/ }),
/* 8 */
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
/* 9 */
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
/* 10 */
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
            return [0, 0];
        }

        return delta;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Direction;



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class Board {
    constructor (height, width, id) {
        this.board  = new Array(height).fill(new Array(width));
        this.width  = width;
        this.height = height;
        this.id     = id;
	this.fired  = {};
    }

    deploy (fleet) {
        this.fleet = fleet;
        this.refresh();
    }

    mark_cell (x, y, className) {
        var id   = this.id;
        var cell = document.querySelector(`#${id} .cell[data-x='${x}'][data-y='${y}']`);
        if(!cell) {
            console.log(`no cell at ${x}, ${y}`);
            return;
        }

        var cn = cell.className.split(" ");
        cn.push(className);
        cell.className = cn.join(" ");
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
    }

    refresh () {
        var that  = this;
        var fleet = this.fleet;

        if(!fleet) {
            console.log("no fleet deployed");
            return;
        }

        fleet.vessels().forEach(function (o) {
            o.coords().forEach(function (c) {
                that.mark_cell(c.x(), c.y(), 'hot');
            });
        });
    }

    fire (x, y) {
	if(this.fired[`${x},${y}`]) {
	    console.log(`${x},${y} already fired`);
	    return;
	}

	this.fired[`${x},${y}`] = 1;

        var fleet   = this.fleet;
        var vessels = fleet.vessels();

        for (var vi=0; vi<vessels.length; vi++) {
            var coords = vessels[vi].coords();

            for (var ci=0; ci<coords.length; ci++) {
                var c = coords[ci];

                if(c.x() == x && c.y() == y) {
                    vessels[vi].hit(1);
                    return this.mark_cell(x, y, "hit");
                }
            }
        }

        this.mark_cell(x, y, "miss");
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Board;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class Fleet {
    constructor (id) {
        this._vessels = [];
        this.id       = id;
    }

    commission (vessel) {
        this._vessels.push(vessel);
        var that = this;
        vessel.bind('change', function (e) {
            that.draw();
        });
    }

    vessels () {
        return this._vessels;
    }

    deploy (vesseltype, heading) {
        var undeployed_vessels = this._vessels.filter(function (o) {

            if (o.type() === vesseltype) {
                return ! o.deployed();
            }
        });

        if(undeployed_vessels.length === 0) {
            console.log(`no undeployed vessels of type ${vesseltype}`);
            return;
        }

        undeployed_vessels[0].heading(heading);
    }

    draw () {
        var ul = document.createElement("ul");
        this._vessels.forEach(function (o) {
            var li        = document.createElement("li");
            var damage    = o.perc_damage();
            var className = "damage_none";

            if(damage > 10) {
                className = "damage_light";
            }

            if(damage > 30) {
                className = "damage_moderate";
            }

            if(damage > 60) {
                className = "damage_heavy";
            }

            if(damage >= 100) {
                className = "damage_total";
            }

            li.className = className;
            li.innerText = [
                o.type(),
                (o.deployed() ? "deployed" : "undeployed"),
                o.perc_damage() + "% damage"
            ].join(" ");

            ul.appendChild(li);
        });

        // clean up any previous lists
        var children=document.getElementById(this.id).children;
        for (var i=0;i<children.length; i++) {
            children[i].remove();
        }

        // drop in the new list
        document.getElementById(this.id).appendChild(ul);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Fleet;
;


/***/ })
/******/ ]);