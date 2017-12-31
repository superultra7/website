export default class Vessel {
    constructor (size) {
        this._size  = size;
	this._state = "undamaged";
    }

    heading (heading) {
	if(heading) {
	    this._heading = heading;
	}

	return this._heading;
    }

    type () {
	return this.constructor.name;
    }

    deployed () {
	return this._heading ? 1 : 0;
    }

    state () {
	return this._state;
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
};
