"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var E622;
(function (E622) {
    function packCycle(packSize) {
        const HALF = packSize / 2;
        const START = 2;
        let cnt = 0;
        let position = START;
        do {
            cnt++;
            if (position < HALF) {
                position = 2 * position - 1;
            }
            else {
                position %= HALF;
                position = 2 * position;
            }
            console.log(`pack=${packSize} cnt=${cnt} position=${position}`);
        } while (position != START);
        return cnt;
    }
    function run() {
        const timestart = new Date().getTime();
        let cnt = 0;
        packCycle(52);
        packCycle(86);
        const timeend = new Date().getTime();
        console.log(`Complete in ${(timeend - timestart) / 1000} seconds;`);
        return cnt;
    }
    E622.run = run;
})(E622 || (E622 = {}));
console.log(E622.run());
