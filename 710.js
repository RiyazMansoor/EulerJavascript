"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
var E710;
(function (E710) {
    const CACHEALL = new Map();
    function computeStart1(target) {
        // this is the pattern when paths are computed
        return 2n ** BigInt(target - 1);
    }
    const CACHESTART2 = new Map();
    const CACHESTART2IND = new Map();
    function computeStart2(target) {
        if (CACHESTART2.has(target))
            return CACHESTART2.get(target);
        let cnt = 0n; // findAll([2], target - 2); 
        for (let oneCount = target - 1; oneCount >= 0; oneCount--) {
            if (CACHESTART2IND.has(oneCount)) {
                cnt += CACHESTART2IND.get(oneCount);
            }
            else {
                const perms = findAll([2], target - oneCount);
                CACHESTART2IND.set(oneCount, perms);
                cnt += perms;
                console.log(`target=${target} onecount=${oneCount} perms=${perms}`);
            }
        }
        console.log(`CACHESTART2 target=${target} result=${cnt}`);
        CACHESTART2.set(target, cnt);
        return cnt;
    }
    function findAll(path, target) {
        if (target === 0) {
            const perms = common_1.Numbers.Permutations(path);
            // console.log(target, perms, path);
            return perms;
        }
        let cnt = 0n;
        const lastValue = (path[path.length - 1]);
        for (let val = lastValue; val <= target; val++) {
            cnt += findAll(path.concat([val]), target - val);
        }
        return cnt;
    }
    function run() {
        const timestart = new Date().getTime();
        // const argn: Integer = parseInt(process.argv[2] ?? "6");
        let cnt = 0n;
        for (let argn = 6; argn < 7; argn++) {
            cnt = 0n;
            // even number
            if (argn % 2 === 0) {
                // where middle digits are even
                for (let n = 0; n < argn; n += 2) {
                    if (n == 2)
                        continue;
                    const target = (argn - n) / 2;
                    cnt += computeStart2(target);
                    // console.log(`middle=${n} target=${target} cnt=${cnt}`);
                }
                // with middle number 2
                cnt += computeStart1((argn - 2) / 2);
            }
            else {
                for (let n = 1; n < argn; n += 2) {
                    const target = (argn - n) / 2;
                    cnt += computeStart2(target);
                    // console.log(`middle=${n} half=${target} cnt=${cnt}`);
                }
            }
            console.log(`N=${argn} cnt=${cnt}`);
            if (cnt % 1000000n === 0n)
                break;
        }
        const timeend = new Date().getTime();
        console.log(`Complete in ${(timeend - timestart) / 1000} seconds;`);
        return cnt;
    }
    E710.run = run;
})(E710 || (E710 = {}));
console.log(E710.run());
