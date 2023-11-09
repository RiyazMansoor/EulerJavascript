
// answer 16475640049n

import { Integer, Numbers } from "../common";

namespace E115 {

    const BLOCKLENGTH: Integer = parseInt(process.argv[3] ?? "29");
    const BLOCKMIN: Integer = parseInt(process.argv[2] ?? "3");
    const BLOCKSIZES: Integer[] = [1].concat(new Array(BLOCKLENGTH - BLOCKMIN + 1).fill(BLOCKMIN).map((n, i) => n + i));
    // console.log(BLOCKSIZES);

    const CACHE: Map<Integer, bigint> = new Map();

    function find(sum: Integer, path: Integer[]): bigint {
        if (sum === BLOCKLENGTH) {
            // console.log(path);
            return 1n;
        }
        let tocache: boolean = false;
        let cnt: bigint = 0n;
        const isPrevOne: boolean = path[path.length - 1] === 1;
        if (!isPrevOne && path.length > 0 && (sum + 1) < BLOCKLENGTH) {
            if (CACHE.has(sum + 1)) return CACHE.get(sum + 1) as bigint;
            sum++;
            path.push(1);
            tocache = true;
        }
        for (const blksize of BLOCKSIZES) {
            if (sum + blksize > BLOCKLENGTH) break;
            cnt += find(sum + blksize, path.concat([blksize]));
            // if (path.length == 0) {
            //     console.log(`progress level 0 value=${blksize}`);
            // }
        }
        if (tocache) CACHE.set(sum, cnt);
        return cnt;
    }

    export function run(): bigint {
        const startTime = new Date().getMilliseconds();
        // for (let len =)
        const result = find(0, []);
        const endTime = new Date().getMilliseconds();
        console.log(`time elapsed ${(endTime - startTime) / 1000} seconds.`);
        return result;
    }

}

console.log(E115.run());
