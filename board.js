export default class Board {
    constructor (height, width, id) {
        this.board  = new Array(height).fill(new Array(width));
        this.width  = width;
        this.height = height;
        this.id     = id;
    }

    draw (id) {
        if(!id) {
            id = this.id;
        }

        if(!id) {
            console.log(`element id not given`);
            return;
        }

        var table=document.createElement("table");
        for (var y=0; y<this.height; y++) {
            var tr=document.createElement("tr");
            for (var x=0; x<this.width; x++) {
                var td=document.createElement("td");
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        var element = document.getElementById(id);
        if(!element) {
            console.log(`element ${id} not found`);
            return;
        }
        element.appendChild(table);
    }
}