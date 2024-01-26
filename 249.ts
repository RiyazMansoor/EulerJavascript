
import { Integer, Numbers, Prime, PrimeNumbers } from "./common";

const ARG2: Integer = parseInt(process.argv[2] ?? "4");

const ISPRIME: boolean[] = Array(16e5).fill(false);

const PRIMES: Prime[] = new PrimeNumbers(16e5).toArray();
PRIMES.forEach( prime => ISPRIME[prime] = true );

const DOMAIN_PRIMES: Prime[] = PRIMES.filter( prime => prime < 5e3 );

// const PRIMEMAP: Map<Prime, Prime[]> = new Map();
// PRIMES.forEach( prime => PRIMEMAP.set(prime, []) );


function* PivotVal(LENGTH: Integer, runPos: Integer = 1, runSum: Integer = 0, runLen: Integer = 0): Generator<Integer> {
    if (runLen == LENGTH) {
        yield runSum;
    } else {
        const newRunLen: Integer = runLen + 1;
        for (let runPosI = runPos; runPosI < DOMAIN_PRIMES.length; runPosI++) {
            const newRunPos: Integer = runPosI + 1;
            const newRunSum: Integer = runSum + DOMAIN_PRIMES[runPosI];
            yield * PivotVal(LENGTH, newRunPos, newRunSum, newRunLen); 
        }
    }
} 

function CountPivot(pivotVal: Integer): Integer {
    let cnt: Integer = 0;
    for (const prime of DOMAIN_PRIMES) {
        if (ISPRIME[prime + pivotVal]) {
            cnt++;
            // PRIMEMAP.get(prime)!.push(pivotVal);
        }
        if (ISPRIME[prime + pivotVal + 2]) {
            cnt++;
            // PRIMEMAP.get(prime)!.push(pivotVal);
        }
    }
    return cnt;
}

const CACHE: Map<Integer, Integer> = new Map();

function Traverse(): void {
    let cachecnt: Integer = 0;
    let cnt: Integer = CountPivot(0);
    console.log(`pivot=0, cnt=${cnt}`);
    for (let pivotLen = 2; pivotLen < ARG2; pivotLen += 2) {
        for (const pivotVal of PivotVal(pivotLen)) {
            let result: Integer | undefined = CACHE.get(pivotVal);
            if (!result) {
                result = CountPivot(pivotVal);
                CACHE.set(pivotVal, result);
                console.log(`pivotLen=${pivotLen}, pivotVal=${pivotVal}, result=${result} totalcnt=${cnt} cacheCnt=${cachecnt}`);
                cachecnt = 0;
            } else {
                cachecnt++;
            //     console.log(`pivotLen=${pivotLen}, pivotVal=${pivotVal}, cache=${result}`);
            }
            cnt += result;
        }
    }
}

Traverse();
