
// answer = 100315739184392

import { Integer, PrimeNumbers, Numbers } from "./common"

const sTime: number = new Date().getTime();


function factorise(num: Integer, index: Integer, PRIMES: Integer[]): [ Integer, Integer, Integer ] {
    const number: Integer = num;
    const root: Integer = Math.ceil(Math.sqrt(num));
    const factors: Integer[] = [];
    for (const prime of PRIMES) {
        if (prime > root) {
            factors.push(num);
            break;
        }
        while (num % prime === 0) {
            if (num % (prime**2) === 0) {
                num /= prime;
            } else {
                factors.push(prime);
            }
            num /= prime;
        }
        if (num === 1) break;
    }
    const product: Integer = factors.reduce( (pv, cv) => pv * cv, 1 );
    return [ product, number, index ];
}



function run(N: Integer): Integer {
    console.log(`N=${N}`);
    let PRIMES: Integer[] = new PrimeNumbers(N).toArray();
    if (N < 1000) PRIMES = PRIMES.filter( p => p < N);
    console.log(`primes generated in duration=${(new Date().getTime() - sTime)/1000} seconds`);
    const Nums: Integer[] = PRIMES.map( p => p+1 );
    const UniqFactors: Integer[][] = Nums.map( (n, i) => factorise(n, i, PRIMES) );
    UniqFactors.sort( (a, b) => a[0] - b[0] || a[1] - b[1] );
    console.log(`nums computed in duration=${(new Date().getTime() - sTime)/1000} seconds`);
    let debug_af: Integer = 1;
    let sum: Integer = 0;
    const uflen: Integer = UniqFactors.length;
    for (let ai = 0; ai < uflen; ai++) {
        const [af, an, aindex] = UniqFactors[ai];
        for (let ci = ai+1; ci < uflen; ci++) {
            const [cf, cn, cindex] = UniqFactors[ci];
            if (af != cf) break;
            const bn: Integer = Math.sqrt(an * cn);
            const bi: Integer = Numbers.binarySearch(Nums, bn, aindex, cindex);
            if (bi >= 0) {
                sum += an + bn + cn - 3;
                // console.log(`a=${an-1} b=${bn-1} c=${cn-1}`);
            }
        }
        // if (af != debug_af) {
        //     console.log(`factor.product=${debug_af} sum=${sum}`);
        //     debug_af = af;
        // }
    }
    return sum;
}

const ARG2: Integer = parseInt(process.argv[2] ?? "100");

console.log(run(ARG2));
// console.log(candidateFactors([2, 3], 48));
// console.log(candidateFactors([2], 8));

console.log(`ended in duration=${(new Date().getTime() - sTime)/1000} seconds`);

