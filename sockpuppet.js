"use strict";
export default class SockPuppet {
    async constructor (url) {
	
	this.ws = new WebSocket(url);
	try {
	    await this.ws.connect;
	} catch (connect_error) {

	}
    }

    start () {
	this.ws.send(JSON.stringify({
	    action:"start"
	}));
    }
}
