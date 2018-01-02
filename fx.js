"use strict";
import Queue from "./queue";
export default class Fx {
    constructor () {
        this.fx = {};
        var that = this;
        [
            "explosion1.mp3",
            "klaxon.mp3",
            "missile_in_flight.mp3"
        ].forEach(function (o) {
            var key      = o.match(/^[^.]+/)[0];
            that.fx[key] = new Audio(`fx/${o}`); // buffer everything
        })
    }

    // nb. this way won't allow the same sound to play more than once simultaneously
    play () {
        var that     = this;
        var sequence = new Array();
        var args     = arguments;
        for (var i=0;i<args.length;i++) {
            sequence.push(function () {
                that.fx[args[i]].play();
            });
        }

        var q=new Queue(sequence);
        q.run(function () { console.log("sequence complete")});
    }
}
