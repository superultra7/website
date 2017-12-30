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
class Ship {
    constructor (size) {
        this.size = size;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Ship;
;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fleet__ = __webpack_require__(3);


var size = 24;

var myboard    = new __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */](size, size, "myboard");
var theirboard = new __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */](size, size, "theirboard");
myboard.draw();
theirboard.draw();


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Board {
    constructor (height, width, id) {
        this.board  = new Array(height).fill(new Array(width));
        this.width  = width;
        this.height = height;
        this.id     = id;
    }

    draw (id) {
        if(!id) {
            id = this.id;
        }

        if(!id) {
            console.log(`element id not given`);
            return;
        }

        var table=document.createElement("table");
        for (var y=0; y<this.height; y++) {
            var tr=document.createElement("tr");
            for (var x=0; x<this.width; x++) {
                var td=document.createElement("td");
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        var element = document.getElementById(id);
        if(!element) {
            console.log(`element ${id} not found`);
            return;
        }
        element.appendChild(table);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Board;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__battleship__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__carrier__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__destroyer__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__submarine__ = __webpack_require__(7);





class Fleet {
    constructor () {
        this.harbour = [
            new __WEBPACK_IMPORTED_MODULE_0__battleship__["a" /* default */],
            new __WEBPACK_IMPORTED_MODULE_1__carrier__["a" /* default */],
            new __WEBPACK_IMPORTED_MODULE_2__destroyer__["a" /* default */], new __WEBPACK_IMPORTED_MODULE_2__destroyer__["a" /* default */],
            new __WEBPACK_IMPORTED_MODULE_3__submarine__["a" /* default */], new __WEBPACK_IMPORTED_MODULE_3__submarine__["a" /* default */],
            ]
    }
}
/* unused harmony export default */
;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ship__ = __webpack_require__(0);


class Battleship extends __WEBPACK_IMPORTED_MODULE_0__ship__["a" /* default */] {
    constructor () {
        super(5);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Battleship;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ship__ = __webpack_require__(0);


class Carrier extends __WEBPACK_IMPORTED_MODULE_0__ship__["a" /* default */] {
    constructor () {
        super(4);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Carrier;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ship__ = __webpack_require__(0);


class Destroyer extends __WEBPACK_IMPORTED_MODULE_0__ship__["a" /* default */] {
    constructor () {
        super(3);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Destroyer;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ship__ = __webpack_require__(0);


class Submarine extends __WEBPACK_IMPORTED_MODULE_0__ship__["a" /* default */] {
    constructor () {
        super(2);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Submarine;



/***/ })
/******/ ]);