
// answer 100808458960497n

import { Integer, Numbers } from "./common";

namespace E117 {

    const BLOCKLENGTH: Integer = parseInt(process.argv[2] ?? "5");
    const BLOCKMAX: Integer = 4;

    function find(sum: Integer, path: Integer[]): bigint {
        if (sum === BLOCKLENGTH) {
            const perms: bigint = Numbers.Permutations(path);
            console.log(perms, path);
            return perms;
        }
        let cnt: bigint = 0n;
        const blkStartSize: Integer = path[path.length - 1] ?? 1;
        for (let blksize = blkStartSize; blksize <= BLOCKMAX; blksize++) {
            if (sum + blksize > BLOCKLENGTH) break;
            cnt += find(sum + blksize, path.concat([blksize]));
        }
        return cnt;
    }

    export function run(): bigint {
        return find(0, []);
    }

}

console.log(E117.run());
