"use strict";
export default class SockPuppet {
    constructor (url) {
	this.url   = url;
	this.queue = [];
	this._init();
    }

    _init () {
	if(this.ws) {
	    this.ws.close();
	}
	this.ws         = new WebSocket(this.url);
	this.ws.onerror = () => {
	    console.error("websocket failed");
	    setTimeout(() => { this._init() }, 1000);
	};
	this.ws.onmessage = this.handler.bind(this);
	this.tries      = 1;
    }

    _send (obj) {
	let o;
	if(obj) {
	    this.queue.push(obj);
	}

	// if socket is ready
	if(this.ws.readyState) {
	    while(o = this.queue.pop()) {
		this.ws.send(JSON.stringify(o));
	    }
	    return;
	}

	// if socket is not ready, retry with exponential backoff
	this.tries += this.tries;
	this.timer = setTimeout(() => {
	    this._send();
	}, 100*this.tries);
	console.warn("socket not ready. retrying in", 100*this.tries);
    }

    start () {
	this._send({
	    action:"start"
	});
    }

    handler (object) {
	let message;
	try {
	    message = JSON.parse(object.data);
	    if(message.conn) {
		$('#conn').html(message.conn);
	    }
	    if(message.game) {
		$('#game').html(message.game);
	    }
	} catch (message_error) {
	    console.error("message error", message);
	}
	console.info(message);
    }
}
