/*
arg=8500, prime=87557
Max Paths = 1011913
1000000 :: value=86597.5000000000 digitsExtra=3 primes=5,11,47,67
answer=108424772
*/


import { Integer, Float, Prime, PrimeNumbers, Numbers, Util } from "./common";

const PRIMES: Prime[] = new PrimeNumbers(1e6).toArray();

const ARG2_PRIMES_INDEX: Prime = parseInt(process.argv[2] ?? "4");

type Path = {
    relativeValue: Float,
    digitsExtra: Integer,    // exceeding baseline
    primes: Prime[],
}

function ToStr(path: Path): string {
    return `value=${path.relativeValue.toFixed(10)} digitsExtra=${path.digitsExtra} primes=${path.primes}`;
}

function sort(paths: Path[]): void {
    paths.sort( (a, b) => a.relativeValue - b.relativeValue );
}

function PathNext(fromPath: Path, prime: Prime, power: Integer): Path {
    const newPrimes: Prime[] = fromPath.primes.concat( Array(power).fill(prime) );
    const newValue: Integer =  newPrimes.reduce( (pv, cv) => pv * cv / 2, 1 ) * Math.pow(2, fromPath.digitsExtra);
    return {
        relativeValue: newValue,
        digitsExtra: fromPath.digitsExtra,
        primes: newPrimes,
    }
}

function Paths(MAX: Integer, runPrimeIndex: Integer, path: Path): Path[] {
    const paths: Path[] = [];
    prime_loop:
    for (let newRunPrimeIndex = runPrimeIndex + 1; true; newRunPrimeIndex++) {
        for (let runPrimePow = 1; true; runPrimePow++) {
            const pathNext: Path = PathNext(path, PRIMES[newRunPrimeIndex], runPrimePow);
            if (runPrimePow == 1 && pathNext.relativeValue > MAX) break prime_loop;
            if (pathNext.relativeValue > MAX) break;
            paths.push(pathNext);
            const results: Path[] = Paths(MAX, newRunPrimeIndex, pathNext);
            if (results.length === 0) continue;
            results.forEach( p => paths.push(p) );
        }    
    }
    return paths;
}

const MAX: Integer = PRIMES[parseInt(process.argv[2] ?? "3")];

function run(): void {
    console.log(`arg=${process.argv[2] ?? 3}, prime=${MAX}`);
    const allPaths: Path[] = [];
    const digitsExtraMax: Integer = Math.floor(Math.log2(MAX));
    for (let digitsExtra = 0; digitsExtra <= digitsExtraMax; digitsExtra++) {
        const startPath: Path = { relativeValue: 1, digitsExtra: digitsExtra, primes: [] };
        const paths: Path[] = Paths(MAX, 0, startPath);
        startPath.primes = Array(digitsExtra).fill(2);
        startPath.relativeValue = startPath.primes.reduce( (pv, prime) => pv * prime, 1)
        paths.push(startPath);
        sort(paths);
        paths.forEach( p => allPaths.push(p) );
        // paths.forEach( (p, i) => console.log(`${i} :: ${ToStr(p)}`) );
    }
    if (allPaths.length < 1e6) {
        console.log(`Max Paths = ${allPaths.length}`);
    } else {
        console.log(`Max Paths = ${allPaths.length}`);
        sort(allPaths);
        const path: Path = allPaths[999999];
        console.log(`1000000 :: ${ToStr(path)}`);
        const blk: Integer = 25;
        const blks: Integer = 1e6 / blk;
        let val: Integer = Array(blk-path.primes.length+path.digitsExtra).fill(2).concat(path.primes).reduce( (pv, cv) => pv * cv, 1 );
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



