"use strict";
export default class Coordinate {
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
