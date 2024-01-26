"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
function bruteValue(n, nm1) {
    if (n === 4)
        return 13;
    return nm1 + common_1.Numbers.GCD(nm1, n);
}
function bruteRun() {
    const results = [0, 0, 0, 0, 13];
    let val = 13;
    for (let n = 5; n < 1001; n++) {
        val = bruteValue(n, val);
        results.push(val);
    }
    results.forEach((v, i) => console.log(i, v));
}
// bruteRun();
const PRIMES = new common_1.PrimeNumbers(1e6).toArray();
const LOOKUP = new Map();
PRIMES.forEach(p => LOOKUP.set(Math.ceil(p / 2), p));
function calcValue(N) {
    let n = 9, gn = 27;
    while (n < N) {
        let target = 2 * n - 1;
        let limit = Math.ceil((target - n) / 2) + n;
        let foundPrime = false;
        for (let pi = 1; n < limit; pi++) {
            const prime = PRIMES[pi];
            if (n % prime == Math.ceil(prime / 2)) {
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
    const diff = n - N;
    n -= diff;
    gn -= diff;
    console.log(`n=${n} gn=${gn} diff=${diff}`);
}
calcValue(1e3);
//# sourceMappingURL=443.js.map