

export namespace PrimeLib {

    /**
     * Integer number type - for easy readability
     */
    type Integer = number;

    /**
     * Float number type - for easy readability
     */
    type Float = number;

    /**
     * Prime number type - for easy readability
     */
    type Prime = number;

    /**
     * Primes are used extensively.
     * Hardcoding the initial primes for efficiency.
     */
    export const PRIMES1000: Prime[] = [
        2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
        101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199,
        211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293,
        307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397,
        401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499,
        503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599,
        601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691,
        701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797,
        809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887,
        907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997
    ];

    const SievedPrimes: Prime[] = [];

    export function Primes(): Prime[] {
        return (SievedPrimes.length > 0) ? SievedPrimes : PRIMES1000;
    }

    /**
     * A normal sieve, but uses bit setting on odd numbers only to save memory.
     * 
     * @param uptoMax 
     * @return the array of primes below @uptoMax
     */
    export function sievePrimes(uptoMax: Integer): Prime[] {
        // uses an unsigned array for bit setting of odd numbers only
        const UIntVirtualSize = 64;
        const SieveLength = Math.ceil(uptoMax / UIntVirtualSize);
        const Sieve = new Uint32Array(SieveLength);
        // first pass goes through hard coded set of primes
        for (const prime of PRIMES1000.slice(1)) {
            const i1 = Math.floor(prime / UIntVirtualSize);
            const i1_rem_mask = 1 << (Math.floor((prime % UIntVirtualSize) / 2));
            if ((Sieve[i1] & i1_rem_mask) === 0) {
                for (let n2 = prime * prime; n2 < uptoMax; n2 += 2 * prime) {
                    const i2 = Math.floor(n2 / UIntVirtualSize);
                    const i2_rem_mask = 1 << (Math.floor((n2 % UIntVirtualSize) / 2));
                    if ((Sieve[i2] & i2_rem_mask) === 0) {
                        Sieve[i2] |= i2_rem_mask;
                    }
                }
            }
        }
        // second pass goes through every odd number
        SievedPrimes.length = 0;
        SievedPrimes.push(...PRIMES1000);
        const StartNum = PRIMES1000[PRIMES1000.length - 1] + 2;
        for (let n1 = StartNum; n1 < uptoMax; n1 += 2) {
            const i1 = Math.floor(n1 / UIntVirtualSize);
            const i1_rem_mask = 1 << (Math.floor((n1 % UIntVirtualSize) / 2));
            if ((Sieve[i1] & i1_rem_mask) === 0) {
                SievedPrimes.push(n1);
                for (let n2 = n1 * n1; n2 <= uptoMax; n2 += 2 * n1) {
                    const i2 = Math.floor(n2 / UIntVirtualSize);
                    const i2_rem_mask = 1 << (Math.floor((n2 % UIntVirtualSize) / 2));
                    if ((Sieve[i2] & i2_rem_mask) === 0) {
                        Sieve[i2] |= i2_rem_mask;
                    }
                }
            }
        }
        return Primes();
    }

    /**
     * 
     * @param nthPrime index of the Prime to return
     * @returns nth Prime number
     */
    export function nthPrime(nthPrime: Integer): Prime {
        if (nthPrime < PRIMES1000.length) return PRIMES1000[nthPrime];
        return 0;
    }

    export function ModularExponentiation(base: Integer, exponent: Integer, modulus: Integer): Integer {
        if (modulus === 1) return 0;
        let result: Integer = 1;
        base = base % modulus;
        while (exponent > 0) {
            if (exponent % 2 === 1) {  //odd number
                result = (result * base) % modulus;
            }
            exponent = exponent >> 1; //divide by 2
            base = (base * base) % modulus;
        }
        return result;
    }

    /**
     * Algorithm based on pseudocode at
     * https://en.wikipedia.org/wiki/Miller%E2%80%93Rabin_primality_test
     * 
     * @param num number to test for primality
     * @return true if @num is probably a prime
     */
    export function isProbablePrime(num: Integer, k: Integer = 10): boolean {
        if (num == 2) return true;
        if ((num & 1) === 0) return false;
        let s: Integer = 0;
        let d: Integer = num - 1;
        while ((d & 1) === 0) {     // While the d is even
            s++;
            d >>= 1;                // Faster than division by 2
        }
        for (let i: Integer = 0; i < k; i++) {
            let a: Integer = Math.floor(Math.random() * (num - 2 + 1) + 2); // random(two, n - two);
            let x: Integer = ModularExponentiation(a, d, num);
            let y: Integer = 0;
            for (let j: Integer = 0; j < s; j++) {
                y = ModularExponentiation(x, 2, num);
                // Nontrivial square root of 1 modulo n
                if (y === 1 && x !== 1 && x !== num - 1) {
                    return false;
                }
                x = y;
            }
            if (y !== 1) {
                return false;
            }
        }
        // The number is probably prime
        return true;
    }

    const PhiCache: Map<Integer, Map<Integer, Integer>> = new Map();

    function phi(x: Integer, a: Integer): Integer {
        let xCache: Map<Integer, Integer>;
        if (PhiCache.has(x)) {
            xCache = PhiCache.get(x)!;
            if (xCache.has(a)) return xCache.get(a)!;
        } else {
            xCache = new Map();
            PhiCache.set(x, xCache);
        }
        if (a == 1) return x + 1; // 2
        const result: Integer = phi(x, a - 1) - phi(Math.floor(x / nthPrime(a)), a - 1);
        xCache.set(a, result);
        return result;
    }

    /**
     * Returns the number of primes less than @x
     * 
     * @param x number upto which to count the number of primes
     * @returns number of primes upto @x
     */
    function pi(x: Integer): Integer {
        if (x < PRIMES1000.length) return PRIMES1000.findIndex(p => p > x);
        const root4: Float = pi(Math.floor(Math.pow(x, 1/4)));  // # fourth root of x
        const root2: Float = pi(Math.floor(Math.sqrt(x)));      // # square root of x
        const root3: Float = pi(Math.floor(Math.cbrt(x)));      // # cube root of x
        let count: Integer = phi(x, root4) + (root2 + root4 - 2) * (root2 - root4 + 1) / 2;
        for (let i = root4 + 1; i <= root2; i++) {
            const w = x / nthPrime(i);
            const limit = pi(Math.sqrt(w));
            count -= pi(w);
            if (i <= root3) {
                for (let j = i; j <= limit; j++) {
                    count = count - pi(w / nthPrime(j)) + j - 1;
                }
            }
        }
        return count;
    }

}

function testModularExponentiation(): void {
    console.log(`Testing PrimeLib.ModularExponentiation`);
    if (PrimeLib.ModularExponentiation(3, 7, 5) != 2) throw "error1";
    if (PrimeLib.ModularExponentiation(2, 13, 11) != 8) throw "error2";
    if (PrimeLib.ModularExponentiation(5, 13, 17) != 3) throw "error3";
    console.log(`Testing PrimeLib.ModularExponentiation Completed.`);
}
testModularExponentiation();
