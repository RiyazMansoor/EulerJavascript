
/*
    Solutions:
    10^1    => 5
    10^2    => 19
    10^5    => 713
    10^10   => 
 */

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
const PWR = 3;
// const powers = resolve(parseInt(process.argv.slice(2)[0]));
const powers = resolve(PWR).sort((a,b)=>a-b);
console.log(`Powers of 2 for 10^${PWR} :: ${powers}`)

function arr_insert(arr: number[], pos: number): number[] {
    const val_insert: number = arr[pos]-1;
    return [ ...arr.slice(0,pos), val_insert, val_insert, ...arr.slice(pos + 1) ];
}

function count(pos: number, solution: number[]): number {

    console.log(`pos=${pos} solution=${solution}`);

    const lastIndex = solution.length - 1;
    if (pos == lastIndex) return solution[lastIndex] + 1;

    let cnt: number = 0;

    cnt += count(pos + 1, solution);

    // if (solution[pos] == 1) return cnt;
    if (solution[pos] == solution[pos - 1]) return cnt;

    let new_pos = pos;
    let new_solution: number[] = arr_insert(solution, new_pos);
    console.log(`new_soltion=${new_solution}`)
    while (new_solution[new_pos] == new_solution[new_pos+2]) {
        new_pos += 2;
        new_solution = arr_insert(new_solution, new_pos);
        console.log(`new_soltion2=${new_solution}`)
    }

    if (new_solution[new_solution.length - 1] == -1) return cnt;

    cnt += count(new_pos + 1, new_solution);
    console.log(`cnt=${cnt}`);
    return cnt;

}

console.log(count(0, resolve(1)));
console.log(count(0, resolve(2)));
//console.log(count(0, resolve(3)));



/**
 * global solutions for all power of 2s upto 84
 * no solutions for index 0
 */
const powersols = [
    [[0]],                                                      // 1
    [[1], [0, 0]],                                              // 2
    [[2], [1, 1], [1, 0, 0]],                                   // 4
    [[3], [2, 2], [2, 1, 1], [2, 1, 0, 0]],                     // 8  
    [[4], [3, 3], [3, 2, 2], [3, 2, 1, 1], [3, 2, 1, 0, 0]],    // 16  
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


type freq = Map<number, number>;

function freqNew(powers: number[]): freq {
    const fmap: freq = new Map()
    for (const p of powers) {
        const curval = fmap.get(p) ?? 0;
        fmap.set(p, curval + 1);
    }
    return fmap;
}
function freqReduce(fmap: freq, remNums: number[]): freq {
    for (const p of remNums) {
        if (!fmap.has(p)) throw "error1";
        const curval = fmap.get(p) as number;
        fmap.set(p, curval - 1);
    }
    return fmap;
}
function freqBlocked(fmap: freq, addNums: number[]): boolean {
    for (const num of addNums.slice(0, addNums.length - 2)) {
        if (!fmap.has(num)) continue;
        const curval = fmap.get(num) as number;
        if (curval >= 2) return true;
    }
    return false;
}
function freqSkip(fmap: freq, addNums: number[]): boolean {
    const lstnum: number = addNums.slice(-1)[0];
    return !(!fmap.has(lstnum) || fmap[lstnum] <= 2);  

}
function freqAppend(fmap: freq, appNums: number[]): freq {
    for (const p of appNums) {
        const curval = fmap.get(p) ?? 0;
        fmap.set(p, curval + 1);
    }
    return fmap;
}


const solutionSet: Set<string> = new Set();

function find(pos: number, solpath: number[][], fmap: freq): number {
    // console.log(pos);
    // console.log(solpath);
    // console.log(fmap);
    if (pos == powers.length) {
        const solstr = solpath.flat().sort((a, b) => b - a).toString();
        if (!solutionSet.has(solstr)) {
            solutionSet.add(solstr);
            return 1;
        }
        return 0;
    }
    let cnt: number = 0;
    for (const sol of powersols[powers[pos]]) {
        const newfreq: freq = new Map(fmap);
        const newsolpath: number[][] = [...solpath];
        if (freqBlocked(newfreq, sol)) break;
        if (freqSkip(newfreq, sol)) continue;
        newsolpath.push(sol);
        freqAppend(newfreq, sol);
        cnt += find(pos + 1, newsolpath, newfreq);

    }
    return cnt;
}

// console.log(powers);
console.log(find(0, [], new Map()));
console.log(Array.from(solutionSet).sort((a,b)=>b.localeCompare(a)).forEach(s=>console.log(s)));
console.log(Array.from(solutionSet).sort((a,b)=>b.localeCompare(a)));


