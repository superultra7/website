const mapping = {
    "n":  [0,   1],
    "s":  [0,  -1],
    "e":  [1,   0],
    "w":  [-1,  0],
    "nw": [-1, -1],
};

export default class Direction {
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
