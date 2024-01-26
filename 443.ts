import { Integer, Numbers, Prime, PrimeNumbers } from "./common";

function bruteValue(n: Integer, nm1: Integer): Integer {
    if (n === 4) return 13;
    return nm1 + Numbers.GCD(nm1, n);
}

function bruteRun(): void {
    const results: Integer[] = [0,0,0,0,13];
    let val: Integer = 13;
    for (let n = 5; n < 1001; n++) {
        val = bruteValue(n, val);
        results.push(val);
    }
    results.forEach( (v, i) => console.log(i, v) );
}

// bruteRun();

const PRIMES: Prime[] = new PrimeNumbers(1e6).toArray();
const LOOKUP: Map<Integer, Prime> = new Map();
PRIMES.forEach( p => LOOKUP.set(Math.ceil(p/2), p) );


function calcValue(N: Integer): void {
    let n: Integer = 9, gn: Integer = 27; 
    while (n < N) {
        let target: Integer = 2 * n - 1;
        let limit: Integer = Math.ceil((target-n)/2) + n;
        let foundPrime: boolean = false;
        for (let pi = 1; n < limit; pi++) {
            const prime: Prime = PRIMES[pi];
            if (n % prime == Math.ceil(prime/2)) {
                n++;
                gn += prime;
                target += prime - 1;
                foundPrime = true;
                console.log(`n=${n} gn=${gn} prime=${prime}`);
                break;
            }
            n++;
            gn++;
        }
        if (!foundPrime) {
            gn += (target - n);
            n = target;
        }
    }
    const diff: Integer = n - N;
    n -= diff;
    gn -= diff;
    console.log(`n=${n} gn=${gn} diff=${diff}`);
}

calcValue(1e3);
