"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var E816;
(function (E816) {
    function findCycle() {
        const START = 290797;
        const MODULO = 50515093;
        let result = START;
        for (let cnt = 2; cnt < 5e6; cnt++) {
            result = (result * result) % MODULO;
            if (result == START) {
                console.log(`cycled cnt=${cnt}`);
                break;
            }
            if (cnt % 100000 == 0)
                console.log(`cnt=${cnt} ${result}`);
        }
    }
    E816.findCycle = findCycle;
})(E816 || (E816 = {}));
E816.findCycle();
