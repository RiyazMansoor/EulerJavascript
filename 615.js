"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
var E615;
(function (E615) {
    const MODULO = 123454321;
    const MAX = parseInt(process.argv[2] ?? "1000010");
    const PRIMES = new common_1.PrimeNumbers(MAX).toArray();
    // clear this solution container before calling find() function below
    const paths = [];
    function find(product, path, lastPrimeIndex) {
        for (let i = lastPrimeIndex; i < PRIMES.length; i++) {
            const prime = PRIMES[i];
            if (product * prime > MAX) {
                // console.log(`${path}`);
                const prod = common_1.Numbers.Product(path);
                const denom = 2 * (path[0] == 2 ? 1 : path.length);
                const pv = {
                    value: prod / denom,
                    primes: path
                };
                paths.push(pv);
                return;
            }
            find(product * prime, path.concat([prime]), i);
            if (paths.length > 2e6)
                break;
        }
    }
    function run() {
        const timestart = new Date().getTime();
        let cnt = 0;
        find(1, [], 0);
        paths.sort((a, b) => a.value - b.value);
        const primes = paths[1e6 - 1].primes;
        console.log(primes);
        const twocount = 1e6 - (primes[0] == 2 ? 1 : primes.length);
        const wholecount = Math.floor(twocount / 20);
        let result = Math.pow(2, twocount % 20) % MODULO;
        for (let i = 0; i < wholecount; i++) {
            result = (result * Math.pow(2, 20)) % MODULO;
        }
        for (let i = 0; i < primes.length; i++) {
            result = (result * primes[i]) % MODULO;
        }
        cnt = result;
        const timeend = new Date().getTime();
        console.log(`Complete in ${(timeend - timestart) / 1000} seconds;`);
        return cnt;
    }
    E615.run = run;
})(E615 || (E615 = {}));
console.log(E615.run());
