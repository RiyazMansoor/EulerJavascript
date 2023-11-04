"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
var E710;
(function (E710) {
    const CACHEALL = new Map();
    function computeAll(target) {
        return 2n ** BigInt(target - 1);
        // if (CACHEALL.has(target)) return CACHEALL.get(target) as bigint;
        // const result: bigint = findAll([], target);
        // CACHEALL.set(target, result);
        // // console.log(`CACHEALL target=${target} result=${result}`);
        // return result;
    }
    const CACHETWO = new Map();
    function computeWith2(target) {
        if (CACHETWO.has(target))
            return CACHETWO.get(target);
        const result = findWith2([], target);
        CACHETWO.set(target, result);
        // console.log(`CACHETWO target=${target} result=${result}`);
        return result;
    }
    function findAll(path, target) {
        if (target === 0) {
            const perms = common_1.Numbers.Permutations(path);
            // console.log(target, perms, path);
            return perms;
        }
        let cnt = 0n;
        const lastValue = ((path[path.length - 1]) ?? 1);
        for (let val = lastValue; val <= target; val++) {
            cnt += findAll(path.concat([val]), target - val);
        }
        return cnt;
    }
    function findWith2(path, target) {
        const lastValue = ((path[path.length - 1]) ?? 1);
        if (target === 0) {
            if (lastValue == 1)
                return 0n;
            const perms = common_1.Numbers.Permutations(path);
            console.log(target, perms, path);
            return perms;
        }
        let cnt = 0n;
        if (lastValue == 1) {
            for (const val of [1, 2]) {
                cnt += findWith2(path.concat([val]), target - val);
            }
        }
        else {
            for (let val = lastValue; val <= target; val++) {
                cnt += findWith2(path.concat([val]), target - val);
            }
        }
        return cnt;
    }
    function run() {
        const timestart = new Date().getTime();
        // const argn: Integer = parseInt(process.argv[2] ?? "6");
        let cnt = 0n;
        for (let argn = 20; argn < 21; argn++) {
            cnt = 0n;
            // even number
            if (argn % 2 === 0) {
                for (let n = 0; n < argn; n += 2) {
                    if (n == 2)
                        continue;
                    const target = (argn - n) / 2;
                    cnt += computeWith2(target);
                    console.log(`middle=${n} half=${target} cnt=${cnt}`);
                }
                // with middle number 2
                cnt += computeAll((argn - 2) / 2);
            }
            else {
                for (let n = 1; n < argn; n += 2) {
                    const target = (argn - n) / 2;
                    cnt += computeWith2(target);
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
