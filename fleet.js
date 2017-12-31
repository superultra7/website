export default class Fleet {
    constructor (id) {
        this._vessels = [];
	this.id       = id;
    }

    commission (vessel) {
	this._vessels.push(vessel);
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
	    var li       = document.createElement("li");
	    li.innerText = o.type() + " " + (o.deployed() ? "deployed" : "undeployed") + " " + o.state();
	    ul.appendChild(li);
	});
	document.getElementById(this.id).appendChild(ul);
    }
};
