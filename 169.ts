
/**
 * global solutions for all power of 2s upto 84
 * no solutions for index 0
 */
const powersols = [
    [[0]],                                      // 1
    [[1], [0, 0]],                                // 2
    [[2], [1, 1], [1, 0, 0]],                        // 4
    [[3], [2, 2], [2, 1, 1], [2, 1, 0, 0]],              // 8  
    [[4], [3, 3], [3, 2, 2], [3, 2, 1, 1], [3, 2, 1, 0, 0]],  // 8  
];

function popSols(power: number): void {
    for (let p = 5; p <= power; p++) {
        const sol = [[p]];
        while (true) {
            let arr = [...sol[sol.length - 1]];
            let lst = arr.pop() as number;
            if (lst == 0) break;
            arr.push(lst - 1, lst - 1);
            sol.push(arr);
        }
        powersols.push(sol);
    }
}
popSols(94);

function resolve(power: number): number[] {
    const sol: number[] = [];
    let N: bigint = 10n ** BigInt(power);
    while (N > 0n) {
        let p: bigint = 0n;
        while (2n ** p < N) {
            p++;
        }
        if (2n ** p > N) p--;
        sol.push(Number(p));
        N = N - 2n ** p;
    }
    return sol;
}
const powers = resolve(5);

type numarr = (number|number[])[];

function isvalid(powers: numarr): boolean {
    const map = {}
    for (const p of powers.flat()) {
        if (p in map) {
            map[p]++;
            if (map[p] > 2) return false;
        } else {
            map[p] = 1;
        }
    }
    return true;
}


const set: Set<string> = new Set();

function find(pos: number, solpath: numarr): number {
    // console.log(`\npos=${pos} path=${solpath}`)
    if (pos == powers.length) {
        if (isvalid(solpath)) {
            const solstr = solpath.flat().sort((a,b) => b-a).toString();
            if (!set.has(solstr)) {
                // console.log(`solution=${solpath}`);
                set.add(solstr);
                return 1;
            }
        }
        return 0;
    }
    let cnt: number = 0;
    for (const sol of powersols[powers[pos]]) {
        // console.log(sol);
        const newsolpath: numarr = [...solpath];
        // console.log(`before path=${newsolpath}`);
        newsolpath[pos] = sol;
        // console.log(`after path=${newsolpath}`);
        cnt += find(pos + 1, newsolpath);

    }
    return cnt;
}

// console.log(powers);
console.log(find(0, [...powers]));
//console.log(set);


