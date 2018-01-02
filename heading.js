"use strict";
export default class Heading {
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
