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
        var id   = this.id;
        var cell = document.querySelector(`#${id} .cell[data-x='${x}'][data-y='${y}']`);
        if(!cell) {
            console.log(`no cell at ${x}, ${y}`);
            return;
        }

        var cn = cell.className.split(" ");
        cn.push(className);
        cell.className = cn.join(" ");
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
    }

    refresh () {
        var that  = this;
        var fleet = this.fleet;

        if(!fleet) {
            console.log("no fleet deployed");
            return;
        }

        fleet.vessels().forEach(function (o) {
            o.coords().forEach(function (c) {
                that.mark_cell(c.x(), c.y(), 'hot');
            });
        });
    }

    fire (x, y) {
        var that = this;

        if(that.fired[`${x},${y}`]) {
            console.log(`${x},${y} already fired`);
            that.fx.play("klaxon");
            return;
        }

        that.fired[`${x},${y}`] = 1;

        that.fx.play(["missile_in_flight",
                      function () {
                          var fleet   = that.fleet;
                          var vessels = fleet.vessels();

                          for (var vi=0; vi<vessels.length; vi++) {
                              var coords = vessels[vi].coords();

                              for (var ci=0; ci<coords.length; ci++) {
                                  var c = coords[ci];

                                  if(c.x() == x && c.y() == y) {
                                      vessels[vi].hit(1);
				      that.fx.play("explosion1");
                                      return that.mark_cell(x, y, "hit");
                                  }
                              }
                          }

			  that.fx.play("sploosh");
                          that.mark_cell(x, y, "miss");
                      }
                     ]);
    }
}
