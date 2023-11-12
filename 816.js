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
    function distance(p1, p2) {
        const xdiff = p1.x - p2.x;
        const ydiff = p1.y - p2.y;
        return Math.sqrt(xdiff * xdiff + ydiff * ydiff);
    }
    function getPointsSortedX(num) {
        const START = 290797;
        const MODULO = 50515093;
        let result = START;
        result = (result * result) % MODULO;
        const points = [{ x: START, y: result }];
        for (let n = 1; n < num; n++) {
            result = (result * result) % MODULO;
            const xv = result;
            result = (result * result) % MODULO;
            const yv = result;
            points.push({ x: xv, y: yv });
        }
        points.sort((a, b) => a.x - b.x);
        return points;
    }
    function find(lo, hi) {
    }
})(E816 || (E816 = {}));
E816.findCycle();
//# sourceMappingURL=816.js.map