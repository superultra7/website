export default class Fleet {
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
};
