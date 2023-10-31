"use strict";
// answer 100808458960497n
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
var E117;
(function (E117) {
    const BLOCKLENGTH = parseInt(process.argv[2] ?? "5");
    const BLOCKMAX = 4;
    function find(sum, path) {
        if (sum === BLOCKLENGTH) {
            const perms = common_1.Numbers.Permutations(path);
            console.log(perms, path);
            return perms;
        }
        let cnt = 0n;
        const blkStartSize = path[path.length - 1] ?? 1;
        for (let blksize = blkStartSize; blksize <= BLOCKMAX; blksize++) {
            if (sum + blksize > BLOCKLENGTH)
                break;
            cnt += find(sum + blksize, path.concat([blksize]));
        }
        return cnt;
    }
    function run() {
        return find(0, []);
    }
    E117.run = run;
})(E117 || (E117 = {}));
console.log(E117.run());
