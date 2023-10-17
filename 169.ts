
/*
    Solutions:
    10^1    => [ 3, 1 ]                 => 5
    10^2    => [ 6, 5, 2 ]              => 19
    10^3    => [ 9, 8, 7, 6, 5, 3 ]     => 39
    10^4    => [ 13, 10, 9, 8, 4 ]      => 205
    10^5    => [ 16, 15, 10, 9, 7, 5 ]  => 713
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

function compute(powers: number[], cache:Map<number, number>): number {
    // const sum: number = powers.slice(1).map( k => cache.get(k) ?? -999 ).reduce((p,c)=>p+c,0);
    const sum: number = cache.get(powers[1]) ?? -222222;
    let cnt: number = (powers[0] - powers[1] - 1) * sum;
    console.log(`sum=${sum} cnt=${cnt}`);
    if (powers.length == 2 || powers[1] != powers[2] + 1) {
        cnt += sum - 1;
    } else {
        let i: number = 2;
        while (true) {
            if (i + 1 == powers.length) {
                cnt += cache.get(i) ?? -9999999999;
                break;
            } else if (powers[i] == powers[i] + 1) {
                i++;
            } else {
                const new_head: number = powers[i] - 1;
                const new_tail: number = powers[i+1];
                console.log(new_head, new_tail);
                cnt += (new_head - new_tail) * (cache.get(new_tail) ?? -44444);
                cnt += (cache.get(new_tail) ?? -44444) - 1;
                break;
            }

        }
    }
    return cnt;
}

function e169(): number {
    const pwr: number = parseInt(process.argv[2] ?? "2");
    const powers: number[] = resolve(pwr);
    const lstind = powers.length - 1;
    const cache: Map<number, number> = new Map();
    cache.set(powers[lstind], powers[lstind] + 1);
    for (let i = lstind - 1; i >= 0; i--) {
        console.log(powers.slice(i), cache);
        const val: number = compute(powers.slice(i), cache);
        cache.set(powers[i], val);
    }
    console.log(cache);
    const ans: number = Array.from(cache.values()).reduce((p,c)=>p+c,0);
    return ans;
}

const CNT: number = e169();
console.log(`CNT=${CNT}`);

const PWR = 5;
// const powers = resolve(parseInt(process.argv.slice(2)[0]));
const powers = resolve(PWR);
// console.log(`Powers of 2 for 10^${PWR} :: ${powers}`)

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

// console.log(resolve(3));
// console.log(resolve(4));
// console.log(resolve(5));
// console.log(count(0yd, resolve(1)));
// console.log(count(0, resolve(2)));
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

function freqValid(powers: number[]): boolean {
    const fmap: freq = new Map()
    for (const p of powers) {
        const curval = fmap.get(p) ?? 0;
        if (curval == 2) return false;
        fmap.set(p, curval + 1);
    }
    return true;
}
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
    return !(!fmap.has(lstnum) || fmap.get(lstnum) as number <= 2);  

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
        if (!freqValid(solpath.flat())) return 0;
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
// console.log(find(0, [], new Map()));
// console.log(Array.from(solutionSet).sort((a,b)=>b.localeCompare(a)).forEach(s=>console.log(s)));
// console.log(Array.from(solutionSet).sort((a,b)=>b.localeCompare(a)));


