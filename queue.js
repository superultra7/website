"use strict";
export default class Queue {
    constructor (args) {
        this.queue = new Array();
        for (var i=0; i<args.length; i++) {
            console.log("queue", args[i]);
            this.queue.push(function (cb) { args[i](); return cb(); });
        }
    }

    run (cb) {
        var that = this;
        var f    = this.queue.shift();
        if(!f) {
            if(cb) {
                return cb();
            }
            return;
        }
        f(function () { that.run(cb); });
    }
}
