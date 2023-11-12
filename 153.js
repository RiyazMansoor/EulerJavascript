"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
var E153;
(function (E153) {
    const PRIMES = new common_1.PrimeNumbers(1e8).toArray();
    function run() {
        const timestart = new Date().getTime();
        let cnt = 0;
        const timeend = new Date().getTime();
        console.log(`Complete in ${(timeend - timestart) / 1000} seconds;`);
        return cnt;
    }
    E153.run = run;
})(E153 || (E153 = {}));
//# sourceMappingURL=153.js.map