"use strict";
/*
arg=8500, prime=87557
Max Paths = 1011913
1000000 :: value=86597.5000000000 digitsExtra=3 primes=5,11,47,67
answer=108424772
*/
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const PRIMES = new common_1.PrimeNumbers(1e6).toArray();
const ARG2_PRIMES_INDEX = parseInt(process.argv[2] ?? "4");
function ToStr(path) {
    return `value=${path.relativeValue.toFixed(10)} digitsExtra=${path.digitsExtra} primes=${path.primes}`;
}
function sort(paths) {
    paths.sort((a, b) => a.relativeValue - b.relativeValue);
}
function PathNext(fromPath, prime, power) {
    const newPrimes = fromPath.primes.concat(Array(power).fill(prime));
    const newValue = newPrimes.reduce((pv, cv) => pv * cv / 2, 1) * Math.pow(2, fromPath.digitsExtra);
    return {
        relativeValue: newValue,
        digitsExtra: fromPath.digitsExtra,
        primes: newPrimes,
    };
}
function Paths(MAX, runPrimeIndex, path) {
    const paths = [];
    prime_loop: for (let newRunPrimeIndex = runPrimeIndex + 1; true; newRunPrimeIndex++) {
        for (let runPrimePow = 1; true; runPrimePow++) {
            const pathNext = PathNext(path, PRIMES[newRunPrimeIndex], runPrimePow);
            if (runPrimePow == 1 && pathNext.relativeValue > MAX)
                break prime_loop;
            if (pathNext.relativeValue > MAX)
                break;
            paths.push(pathNext);
            const results = Paths(MAX, newRunPrimeIndex, pathNext);
            if (results.length === 0)
                continue;
            results.forEach(p => paths.push(p));
        }
    }
    return paths;
}
const MAX = PRIMES[parseInt(process.argv[2] ?? "3")];
function run() {
    console.log(`arg=${process.argv[2] ?? 3}, prime=${MAX}`);
    const allPaths = [];
    const digitsExtraMax = Math.floor(Math.log2(MAX));
    for (let digitsExtra = 0; digitsExtra <= digitsExtraMax; digitsExtra++) {
        const startPath = { relativeValue: 1, digitsExtra: digitsExtra, primes: [] };
        const paths = Paths(MAX, 0, startPath);
        startPath.primes = Array(digitsExtra).fill(2);
        startPath.relativeValue = startPath.primes.reduce((pv, prime) => pv * prime, 1);
        paths.push(startPath);
        sort(paths);
        paths.forEach(p => allPaths.push(p));
        // paths.forEach( (p, i) => console.log(`${i} :: ${ToStr(p)}`) );
    }
    if (allPaths.length < 1e6) {
        console.log(`Max Paths = ${allPaths.length}`);
    }
    else {
        console.log(`Max Paths = ${allPaths.length}`);
        sort(allPaths);
        const path = allPaths[999999];
        console.log(`1000000 :: ${ToStr(path)}`);
        const blk = 25;
        const blks = 1e6 / blk;
        let val = Array(blk - path.primes.length + path.digitsExtra).fill(2).concat(path.primes).reduce((pv, cv) => pv * cv, 1);
        for (let cnt = 1; cnt < blks; cnt++) {
            val %= 123454321;
            val *= Math.pow(2, blk);
        }
        val %= 123454321;
        console.log(`answer=${val}`);
    }
    // allPaths.forEach( (p, i) => console.log(`${i} :: ${ToStr(p)}`) );
}
run();
//# sourceMappingURL=615.js.map