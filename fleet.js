export default class Fleet {
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
	document.getElementById(this.id).appendChild(ul);
    }
};
