"use strict";
export default class Vessel {
    constructor (size) {
        this._size   = size;
        this._damage = 0;
        this._events = {};
    }

    heading (heading) {
        if(heading) {
            this._heading = heading;
            this.trigger('change', 'heading'); // trigger a redraw
        }

        return this._heading;
    }

    type () {
        return this.constructor.name;
    }

    deployed () {
        return this._heading ? 1 : 0;
    }

    perc_damage () {
        return 100 * (this._damage / this._size);
    }

    bind (type, func) {
        if(!this._events[type]) {
            this._events[type] = new Array();
        }
        this._events[type].push(func);
    }

    trigger (type, args) {
        if(this._events[type]) {
            this._events[type].forEach(function (f) { f(args); });
        }
    }

    hit (damage) {
        this._damage += damage;
        this.trigger('change');
    }

    // returns an array of coordinates which this vessel occupies
    coords () {
        var heading = this.heading();

        if(!heading) {
            console.log(this.constructor.name, "has no heading");
            return [];
        }

        var start_coordinate = heading.coordinate();
        var delta  = heading.direction().delta();
        var coords = [];

        for (var i=0; i<this._size; i++) {
            coords.push(this._heading.coordinate().move(delta, i));
        }

        return coords;
    }
};
