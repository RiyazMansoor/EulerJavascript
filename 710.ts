import { Integer, Numbers, PrimeNumbers, SortedPrimeArray } from "./common";


namespace E710 {

    function computeStart1(target: Integer): bigint {
        // this is the pattern when paths are computed
        return 2n ** BigInt(target - 1);
    }

    const CACHESTART2PATHS: Map<Integer, Integer[][]> = new Map();
    function findStart2(path: Integer[], target: Integer): Integer[][] {
        if (target === 0) {
            return [path];
        }
        let paths: Integer[][] = [];
        const lastValue: Integer =  (path[path.length - 1]) as Integer;
        for (let val = lastValue; val <= target; val++) {
            const subpaths: Integer[][] = findStart2(path.concat([val]), target - val);
            subpaths.forEach( apath => paths.push(apath) );
        }
        return paths;
    }


    const CACHESTART2: Map<Integer, bigint> = new Map();
    function computeStart2(target: Integer): bigint {
        if (CACHESTART2.has(target)) return CACHESTART2.get(target) as bigint;
        let cnt: bigint = 0n; // findAll([2], target - 2); 
        for (let oneCount = target - 1; oneCount > 0; oneCount--) {
            const subTarget: Integer = target - oneCount;
            if (!CACHESTART2PATHS.has(subTarget)) {
                CACHESTART2PATHS.set(subTarget, findStart2([2], subTarget - 2));
            }
            const paths: Integer[][] = CACHESTART2PATHS.get(oneCount) as Integer[][];
            paths.forEach( path => cnt += Numbers.Permutations(Array(target - path.length).fill(1).concat(path)) );
            console.log(`target=${target} onecount=${oneCount} perms=${perms}`);
        }
        console.log(`CACHESTART2 target=${target} result=${cnt}`);
        CACHESTART2.set(target, cnt);
        return cnt;
    }
    
    function findAll(path: Integer[], target: Integer): bigint {
        if (target === 0) {
            const perms = Numbers.Permutations(path);
            // console.log(target, perms, path);
            return perms;
        }
        let cnt: bigint = 0n;
        const lastValue: Integer =  (path[path.length - 1]) as Integer;
        for (let val = lastValue; val <= target; val++) {
            cnt += findAll(path.concat([val]), target - val);
        }
        return cnt;
    }


    export function run(): bigint {
        const timestart: Integer = new Date().getTime();
        // const argn: Integer = parseInt(process.argv[2] ?? "6");
        let cnt: bigint = 0n;
        for (let argn = 6; argn < 7; argn++) {
            cnt = 0n;
            // even number
            if (argn % 2 === 0) {
                // where middle digits are even
                for (let n = 0; n < argn; n += 2) {
                    if (n == 2) continue;
                    const target: Integer = (argn - n) / 2;
                    cnt += computeStart2(target);
                    // console.log(`middle=${n} target=${target} cnt=${cnt}`);
                }
                // with middle number 2
                cnt += computeStart1((argn - 2) / 2)
            } else {
                for (let n = 1; n < argn; n += 2) {
                    const target: Integer = (argn - n) / 2;
                    cnt += computeStart2(target)
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

