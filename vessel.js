export default class Vessel {
    constructor (size) {
        this.size = size;
    }

    heading (heading) {
	this._heading = heading;
    }

    // returns an array of coordinates which this vessel occupies
    coords () {
	var heading = this._heading;
	if(!heading) {
	    console.log("vessel has no heading");
	    return [];
	}

	return [this._heading.coordinate()];
    }
};
