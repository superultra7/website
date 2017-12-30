import Battleship from "./battleship";
import Carrier from "./carrier";
import Destroyer from "./destroyer";
import Submarine from "./submarine";

export default class Fleet {
    constructor () {
        this.harbour = [
            new Battleship,
            new Carrier,
            new Destroyer, new Destroyer,
            new Submarine, new Submarine,
            ]
    }
};