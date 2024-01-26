/*
https://en.wikipedia.org/wiki/Miller%E2%80%93Rabin_primality_test
Input #1: n > 2, an odd integer to be tested for primality
Input #2: k, the number of rounds of testing to perform
Output: “composite” if n is found to be composite, “probably prime” otherwise
let s > 0 and d odd > 0 such that n − 1 = 2sd  # by factoring out powers of 2 from n − 1
repeat k times:
    a ← random(2, n − 2)  # n is always a probable prime to base 1 and n − 1
    x ← ad mod n
    repeat s times:
        y ← x2 mod n
        if y = 1 and x ≠ 1 and x ≠ n − 1 then # nontrivial square root of 1 modulo n
            return “composite”
        x ← y
    if y ≠ 1 then
        return “composite”
return “probably prime”
*/

import { Integer, PRIMES1000 } from "./common";
import { PrimeLib } from "./lib/prime";


// calculates   base^exponent % modulus
function PowerMod(base: Integer, exponent: Integer, modulus: Integer): Integer {
    if (modulus === 1) return 0;
    let result: Integer = 1;
    base = base % modulus;
    while (exponent > 0) {
        if (exponent % 2 === 1)  //odd number
            result = (result * base) % modulus;
        exponent = exponent >> 1; //divide by 2
        base = (base * base) % modulus;
    }
    return result;
}

// console.log(PowerMod(parseInt(process.argv[2]),parseInt(process.argv[3]),parseInt(process.argv[4])))

function IsProbablePrime(num: Integer, rounds: Integer): boolean {
    let numMinusOne: Integer = num - 1;
    let s: Integer = 0, d: Integer = 0; 
    while (numMinusOne % 2 === 0) {
        numMinusOne /= 2;
        s++;
    }
    d = numMinusOne;
    console.log(`n=${num} s=${s} d=${d}`);
    for (let round = 0; round < rounds; round++) {
        const a: Integer = Math.floor(Math.random() * (num - 4)) + 2;
        let x: Integer = PowerMod(a, d, num);
        let y: Integer = 0;
        for (let si = 0; si < s; si++) {
            y = PowerMod(x, 2, num);
            if (y === 1 && x !== 1 && x !== (num - 1)) return false;
            x = y;
        }
        if (y !== 1) return false;
    }
    return true;
}

const ARG2: Integer = parseInt(process.argv[2] ?? "10000");

function run(): Integer {
    let cnt: Integer = 0;
    for (let n = 2; n <= ARG2; n++) {
        const isPrime: boolean = IsProbablePrime(2*n*n - 1, 4);
        if (isPrime) cnt++;
    }
    return cnt;
}

// console.log(run());

function runLib(): Integer {
    let cnt: Integer = 0;
    for (let n = 2; n <= 1000; n++) {
        if (n % 100 === 0) console.log(n);
        const isPrime: boolean = PrimeLib.isProbablePrime(2*n*n - 1);
        if (isPrime) cnt++;
    }
    console.log(PRIMES1000.length);
    return cnt;
}

console.log(runLib());




