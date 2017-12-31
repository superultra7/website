export default class Board {
    constructor (height, width, id) {
        this.board  = new Array(height).fill(new Array(width));
        this.width  = width;
        this.height = height;
        this.id     = id;
    }

    deploy (fleet) {
	this.fleet = fleet;
	this.refresh();
    }

    draw () {
        var container       = document.createElement("div");
	container.className = "board";

        for (var y=0; y<this.height; y++) {
            var row       = document.createElement("div");
	    row.dataset.y = y;
	    row.className = "row"

            for (var x=0; x<this.width; x++) {
                var col       = document.createElement("div");
		col.dataset.x = x;
		col.dataset.y = y;
		col.className = "cell";

                row.appendChild(col);
            }
            container.appendChild(row);
        }

        var element = document.getElementById(this.id);
        if(!element) {
            console.log(`element ${this.id} not found`);
            return;
        }
        element.appendChild(container);
//	this.refresh();
    }

    refresh () {
	var fleet = this.fleet;
	var id    = this.id;

	if(!fleet) {
	    console.log("no fleet deployed");
	    return;
	}

	fleet.vessels().forEach(function (o) {
	    o.coords().forEach(function (c) {
		var cell = document.querySelector("#"+id+" .cell[data-x='"+c.x()+"'][data-y='"+c.y()+"']");
		var cn   = cell.className.split(" ");
		cn.push("hot");
		cell.className=cn.join(" ");
	    });
	});
    }
}
