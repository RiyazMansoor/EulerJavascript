"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
var E116;
(function (E116) {
    const BLOCKLENGTH = parseInt(process.argv[2] ?? "5");
    const BLOCKSIZES = [2, 3, 4];
    function run() {
        let cnt = 0n;
        for (const blksize of BLOCKSIZES) {
            const blkmax = Math.floor(BLOCKLENGTH / blksize);
            for (let blkcount = 1; blkcount <= blkmax; blkcount++) {
                const blkarr = new Array(blkcount).fill(blksize);
                const onearr = new Array(BLOCKLENGTH - blkcount * blksize).fill(1);
                const perms = common_1.Numbers.Permutations(blkarr.concat(onearr));
                cnt += perms;
                console.log(blkmax, perms, blkarr.concat(onearr));
            }
        }
        return cnt;
    }
    E116.run = run;
})(E116 || (E116 = {}));
console.log(E116.run());
