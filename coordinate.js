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
}
