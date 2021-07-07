"use strict";
import Fx    from "./fx";
export default class Board {
    constructor (height, width, id) {
        this.board  = new Array(height).fill(new Array(width));
        this.width  = width;
        this.height = height;
        this.id     = id;
        this.fired  = {};
        this.fx     = new Fx();
    }

    deploy (fleet) {
        this.fleet = fleet;
        this.refresh();
    }

    mark_cell (x, y, className) {
        let id   = this.id;
        let cell = document.querySelector(`#${id} .cell[data-x='${x}'][data-y='${y}']`);
        if(!cell) {
            console.log(`no cell at ${x}, ${y}`);
            return;
        }

        let cn = cell.className.split(" ");
        cn.push(className);
        cell.className = cn.join(" ");
    }

    draw () {
        let container       = document.createElement("div");
        container.className = "board";

        for (let y=0; y<=this.height; y++) {
            let row       = document.createElement("div");
            row.dataset.y = y;
            row.className = "row"

            for (let x=0; x<=this.width; x++) {
                let col = document.createElement("div");
                if(y===0 && x!==0) {
                    let index     = String.fromCharCode(64+x);
                    col.innerHTML = index;
                    col.className = "index";
                } else if(y!==0 && x===0) {
                    let index     = y;
                    col.innerHTML = index;
                    col.className = "index";
                } else {
                    col.dataset.x = x;
                    col.dataset.y = y;
                    col.className = "cell";
		    col.onclick = () => {
			console.log("clicked", col.dataset.x, col.dataset.y);
		    };
                }

                row.appendChild(col);
            }
            container.appendChild(row);
        }

        let element = document.getElementById(this.id);
        if(!element) {
            console.log(`element ${this.id} not found`);
            return;
        }
        element.appendChild(container);
    }

    refresh () {
        let fleet = this.fleet;

        if(!fleet) {
            console.log("no fleet deployed");
            return;
        }

        fleet.vessels()
	    .forEach((o) => {
		o.coords().forEach((c) => {
                    this.mark_cell(c.x(), c.y(), 'hot');
		});
            });
    }

    fire (x, y, callback) {
        if(this.fired[`${x},${y}`]) {
            console.log(`${x},${y} already fired`);
            this.fx.play("klaxon");
            return;
        }

        this.fired[`${x},${y}`] = 1;

        this.fx.play(["missile_in_flight",
                      () => {
                          let fleet   = this.fleet;
                          let vessels = fleet.vessels();

                          for (let vi=0; vi<vessels.length; vi++) {
                              let coords = vessels[vi].coords();

                              for (let ci=0; ci<coords.length; ci++) {
                                  let c = coords[ci];

                                  if(c.x() == x && c.y() == y) {
                                      vessels[vi].hit(1);
                                      this.fx.play("explosion1");
				      callback(1);
                                      return this.mark_cell(x, y, "hit");
                                  }
                              }
                          }

                          this.fx.play("bloop");
			  callback(0);
                          this.mark_cell(x, y, "miss");
                      }
                     ]);
    }
}
