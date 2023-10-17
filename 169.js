/*
    Solutions:
    10^1    => 5
    10^2    => 19
    10^5    => 713
    10^10   =>
 */
function resolve(power) {
    const sol = [];
    let N = 10n ** BigInt(power);
    while (N > 0n) {
        let p = 0n;
        while (2n ** p < N) {
            p++;
        }
        if (2n ** p > N)
            p--;
        sol.push(Number(p));
        N = N - 2n ** p;
    }
    return sol;
}
const PWR = 3;
// const powers = resolve(parseInt(process.argv.slice(2)[0]));
const powers = resolve(PWR).sort((a, b) => a - b);
console.log(`Powers of 2 for 10^${PWR} :: ${powers}`);
function arr_insert(arr, pos) {
    const val_insert = arr[pos] - 1;
    return [...arr.slice(0, pos), val_insert, val_insert, ...arr.slice(pos + 1)];
}
function count(pos, solution) {
    console.log(`pos=${pos} solution=${solution}`);
    const lastIndex = solution.length - 1;
    if (pos == lastIndex)
        return solution[lastIndex] + 1;
    let cnt = 0;
    cnt += count(pos + 1, solution);
    // if (solution[pos] == 1) return cnt;
    if (solution[pos] == solution[pos - 1])
        return cnt;
    let new_pos = pos;
    let new_solution = arr_insert(solution, new_pos);
    console.log(`new_soltion=${new_solution}`);
    while (new_solution[new_pos] == new_solution[new_pos + 2]) {
        new_pos += 2;
        new_solution = arr_insert(new_solution, new_pos);
        console.log(`new_soltion2=${new_solution}`);
    }
    if (new_solution[new_solution.length - 1] == -1)
        return cnt;
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
    [[0]],
    [[1], [0, 0]],
    [[2], [1, 1], [1, 0, 0]],
    [[3], [2, 2], [2, 1, 1], [2, 1, 0, 0]],
    [[4], [3, 3], [3, 2, 2], [3, 2, 1, 1], [3, 2, 1, 0, 0]], // 16  
];
function popSols(power) {
    for (let p = 5; p <= power; p++) {
        const sol = [[p]];
        while (true) {
            let arr = [...sol[sol.length - 1]];
            let lst = arr.pop();
            if (lst == 0)
                break;
            arr.push(lst - 1, lst - 1);
            sol.push(arr);
        }
        powersols.push(sol);
    }
}
popSols(94);
function freqNew(powers) {
    const fmap = new Map();
    for (const p of powers) {
        const curval = fmap.get(p) ?? 0;
        fmap.set(p, curval + 1);
    }
    return fmap;
}
function freqReduce(fmap, remNums) {
    for (const p of remNums) {
        if (!fmap.has(p))
            throw "error1";
        const curval = fmap.get(p);
        fmap.set(p, curval - 1);
    }
    return fmap;
}
function freqBlocked(fmap, addNums) {
    for (const num of addNums.slice(0, addNums.length - 2)) {
        if (!fmap.has(num))
            continue;
        const curval = fmap.get(num);
        if (curval >= 2)
            return true;
    }
    return false;
}
function freqSkip(fmap, addNums) {
    const lstnum = addNums.slice(-1)[0];
    return !(!fmap.has(lstnum) || fmap[lstnum] <= 2);
}
function freqAppend(fmap, appNums) {
    for (const p of appNums) {
        const curval = fmap.get(p) ?? 0;
        fmap.set(p, curval + 1);
    }
    return fmap;
}
const solutionSet = new Set();
function find(pos, solpath, fmap) {
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
    let cnt = 0;
    for (const sol of powersols[powers[pos]]) {
        const newfreq = new Map(fmap);
        const newsolpath = [...solpath];
        if (freqBlocked(newfreq, sol))
            break;
        if (freqSkip(newfreq, sol))
            continue;
        newsolpath.push(sol);
        freqAppend(newfreq, sol);
        cnt += find(pos + 1, newsolpath, newfreq);
    }
    return cnt;
}
// console.log(powers);
console.log(find(0, [], new Map()));
console.log(Array.from(solutionSet).sort((a, b) => b.localeCompare(a)).forEach(s => console.log(s)));
console.log(Array.from(solutionSet).sort((a, b) => b.localeCompare(a)));
