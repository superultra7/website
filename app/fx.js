"use strict";

export default class Fx {
    constructor () {
        this.fx = {};

        [
            "explosion1.mp3",
            "klaxon.mp3",
            "missile_in_flight.mp3",
            "bloop.mp3"
        ].forEach((o) => {
            let key      = o.match(/^[^.]+/)[0];
            this.fx[key] = new Audio(require(`./fx/${o}`)); // buffer everything
        })
    }

    // nb. this way won't allow the same sound to play more than once simultaneously
    play (sounds) {
        if(typeof sounds !== 'object') {
            sounds = [sounds];
        }

        let s = sounds.shift();
        if(!s) {
            return;
        }

        // support callbacks in-between sounds
        if(typeof s === 'function') {
            s();
            return this.play(sounds);
        }

        if(!this.fx[s]) {
            console.log(`no effect for ${s}`);
            return;
        }

        this.fx[s].onended = () => { this.play(sounds); };
        this.fx[s].play();
    }
}
