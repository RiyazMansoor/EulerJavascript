"use strict";
// answer 16475640049n
Object.defineProperty(exports, "__esModule", { value: true });
var E114;
(function (E114) {
    const BLOCKLENGTH = parseInt(process.argv[2] ?? "7");
    const BLOCKSIZES = [1].concat(new Array(BLOCKLENGTH - 3 + 1).fill(3).map((n, i) => n + i));
    // console.log(BLOCKSIZES);
    const CACHE = new Map();
    function find(sum, path) {
        if (sum === BLOCKLENGTH) {
            // console.log(path);
            return 1n;
        }
        let tocache = false;
        let cnt = 0n;
        const isPrevOne = path[path.length - 1] === 1;
        if (!isPrevOne && path.length > 0 && (sum + 1) < BLOCKLENGTH) {
            if (CACHE.has(sum + 1))
                return CACHE.get(sum + 1);
            sum++;
            path.push(1);
            tocache = true;
        }
        for (const blksize of BLOCKSIZES) {
            if (sum + blksize > BLOCKLENGTH)
                break;
            cnt += find(sum + blksize, path.concat([blksize]));
            if (path.length == 0) {
                console.log(`progress level 0 value=${blksize}`);
            }
        }
        if (tocache)
            CACHE.set(sum, cnt);
        return cnt;
    }
    function run() {
        const startTime = new Date().getMilliseconds();
        const result = find(0, []);
        const endTime = new Date().getMilliseconds();
        console.log(`time elapsed ${(endTime - startTime) / 1000} seconds.`);
        return result;
    }
    E114.run = run;
})(E114 || (E114 = {}));
console.log(E114.run());
//# sourceMappingURL=114.js.map