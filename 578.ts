import { Integer, Prime, PrimeNumbers } from "./common";


const PRIMES: Prime[] = new PrimeNumbers(1e7).toArray();

function find(MaxProduct: Integer, 
              runPos: Integer = 0, runProduct: Integer = 1, 
              runPrimeIndex: Integer = 0, runPrimePower: Integer = 1): Integer {
    let count: Integer = 0;
    if (runPos >= 2) {
        count++;
        // console.log(`solution=${runProduct}`);
    }
    for (let primeIndex = runPrimeIndex; primeIndex < PRIMES.length; primeIndex++) {
        const product: Integer = runProduct * Math.pow(PRIMES[primeIndex], runPrimePower);
        if (product > MaxProduct) break;
        for (let primePower = runPrimePower; true; primePower++) {
            const product: Integer = runProduct * Math.pow(PRIMES[primeIndex], primePower);
            if (product > MaxProduct) break;
            count += find(MaxProduct, runPos+1, product, primeIndex+1, primePower+1);
        }
    }
    return count;
}

const ARG2: Integer = parseInt(process.argv[2] ?? "100");
console.log(find(ARG2));
