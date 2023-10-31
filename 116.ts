// answer 20492570929

import { Integer, Numbers } from "./common";

namespace E116 {

    const BLOCKLENGTH: Integer = parseInt(process.argv[2] ?? "5");

    const BLOCKSIZES: Integer[] = [2, 3, 4];

    export function run(): bigint {
        let cnt: bigint = 0n;
        for (const blksize of BLOCKSIZES) {
            const blkmax: Integer = Math.floor(BLOCKLENGTH / blksize);
            for (let blkcount = 1; blkcount <= blkmax; blkcount++) {
                const blkarr = new Array(blkcount).fill(blksize);
                const onearr = new Array(BLOCKLENGTH - blkcount * blksize).fill(1);
                const perms = Numbers.Permutations(blkarr.concat(onearr));
                cnt += perms;
                console.log(blkmax, perms, blkarr.concat(onearr));
            }
        }
        return cnt;
    }

}

console.log(E116.run());
