"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
var E710;
(function (E710) {
    function computeStart1(target) {
        // this is the pattern when paths are computed
        return 2n ** BigInt(target - 1);
    }
    const CACHESTART2PATHS = new Map();
    function findStart2Paths(path, target) {
        if (target === 0) {
            return [path];
        }
        let paths = [];
        const lastValue = (path[path.length - 1]);
        for (let val = lastValue; val <= target; val++) {
            const subpaths = findStart2Paths(path.concat([val]), target - val);
            subpaths.forEach(apath => paths.push(apath));
        }
        return paths;
    }
    const CACHESTART2 = new Map();
    function computeWith2(target) {
        if (CACHESTART2.has(target))
            return CACHESTART2.get(target);
        let cnt = 0n; // findAll([2], target - 2); 
        for (let oneCount = 0; oneCount < target; oneCount++) {
            const subTarget = target - oneCount;
            if (!CACHESTART2PATHS.has(subTarget)) {
                const paths = findStart2Paths(Array(oneCount).fill(1).concat([2]), subTarget - 2);
                CACHESTART2PATHS.set(subTarget, paths);
                // console.log(paths);
            }
            const paths = CACHESTART2PATHS.get(subTarget);
            // console.log(paths);
            paths.forEach(path => cnt += common_1.Numbers.Permutations(path));
            // console.log(`target=${target} onecount=${oneCount}`);
        }
        // console.log(`CACHESTART2 target=${target} result=${cnt}`);
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
        for (let argn = 6; argn < 43; argn++) {
            cnt = 0n;
            // even number
            if (argn % 2 === 0) {
                cnt += computeWith2(argn / 2);
                console.log(`a cnt=${cnt}`);
                // where middle digits are even
                for (let n = 4; n < argn; n += 2) {
                    const target = (argn - n) / 2;
                    cnt += computeWith2(target);
                    // console.log(`middle=${n} target=${target} cnt=${cnt}`);
                }
                console.log(`b cnt=${cnt}`);
                // with middle number 2
                cnt += computeStart1((argn - 2) / 2);
                console.log(`c cnt=${cnt}`);
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
