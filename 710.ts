import { Integer, Numbers, PrimeNumbers, SortedPrimeArray } from "./common";


namespace E710 {

    const CACHEALL: Map<Integer, bigint> = new Map();
    function computeAll(target: Integer): bigint {
        return 2n ** BigInt(target - 1);
        // if (CACHEALL.has(target)) return CACHEALL.get(target) as bigint;
        // const result: bigint = findAll([], target);
        // CACHEALL.set(target, result);
        // // console.log(`CACHEALL target=${target} result=${result}`);
        // return result;
    }

    const CACHETWO: Map<Integer, bigint> = new Map();
    function computeWith2(target: Integer): bigint {
        if (CACHETWO.has(target)) return CACHETWO.get(target) as bigint;
        const result: bigint = findWith2([], target);
        CACHETWO.set(target, result);
        // console.log(`CACHETWO target=${target} result=${result}`);
        return result;
    }
    
    function findAll(path: Integer[], target: Integer): bigint {
        if (target === 0) {
            const perms = Numbers.Permutations(path);
            // console.log(target, perms, path);
            return perms;
        }
        let cnt: bigint = 0n;
        const lastValue: Integer =  ((path[path.length - 1]) ?? 1);
        for (let val = lastValue; val <= target; val++) {
            cnt += findAll(path.concat([val]), target - val);
        }
        return cnt;
    }

    function findWith2(path: Integer[], target: Integer): bigint {
        const lastValue: Integer =  ((path[path.length - 1]) ?? 1);
        if (target === 0) {
            if (lastValue == 1) return 0n;
            const perms = Numbers.Permutations(path);
            console.log(target, perms, path);
            return perms;
        }
        let cnt: bigint = 0n;
        if (lastValue == 1) {
            for (const val of [ 1, 2 ]) {
                cnt += findWith2(path.concat([val]), target - val);
            }    
        } else {
            for (let val = lastValue; val <= target; val++) {
                const newTarget = target - val;
                cnt += findWith2(path.concat([val]), newTarget);
            }
        }
        return cnt;
    }

    export function run(): bigint {
        const timestart: Integer = new Date().getTime();
        // const argn: Integer = parseInt(process.argv[2] ?? "6");
        let cnt: bigint = 0n;
        for (let argn = 20; argn < 21; argn++) {
            cnt = 0n;
            // even number
            if (argn % 2 === 0) {
                for (let n = 0; n < argn; n += 2) {
                    if (n == 2) continue;
                    const target: Integer = (argn - n) / 2;
                    cnt += computeWith2(target);
                    console.log(`middle=${n} target=${target} cnt=${cnt}`);
                }
                // with middle number 2
                cnt += computeAll((argn - 2) / 2)
            } else {
                for (let n = 1; n < argn; n += 2) {
                    const target: Integer = (argn - n) / 2;
                    cnt += computeWith2(target)
                    // console.log(`middle=${n} half=${target} cnt=${cnt}`);
                }
            }
            console.log(`N=${argn} cnt=${cnt}`);
            if (cnt % 1000000n === 0n) break;
        }
        const timeend: Integer = new Date().getTime();
        console.log(`Complete in ${(timeend-timestart)/1000} seconds;`);
        return cnt;
    }

}

console.log(E710.run());

