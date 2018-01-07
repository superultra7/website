"use strict";
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
    play (sounds) {
        var that = this;

        if(typeof sounds !== 'object') {
            sounds = [sounds];
        }

        var s = sounds.shift();
        if(!s) {
            return;
        }

        // support callbacks in-between sounds
        if(typeof s === 'function') {
            s();
            return that.play(sounds);
        }

        if(!this.fx[s]) {
            console.log(`no effect for ${s}`);
            return;
        }
        this.fx[s].onended = function () { that.play(sounds); };
        this.fx[s].play();
    }
}
