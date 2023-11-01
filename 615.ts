
import { Integer, Numbers, Prime, PrimeNumbers } from "./common";

namespace E615 {

    const MODULO: Integer = 123454321;

    const MAX: Integer = parseInt(process.argv[2] ?? "1000010");
    const PRIMES: Prime[] = new PrimeNumbers(MAX).toArray();

    type PrimeValue = {
        value: number,
        primes: Prime[]
    }

    // clear this solution container before calling find() function below
    const paths: PrimeValue[] = [];

    function find(product: Integer, path: Integer[], lastPrimeIndex: Integer): void {
        for (let i = lastPrimeIndex; i < PRIMES.length; i++) {
            const prime: Prime = PRIMES[i]
            if (product * prime > MAX) {
                // console.log(`${path}`);
                const prod: Integer = Numbers.Product(path);
                const denom: Integer = 2 * (path[0] == 2 ? 1 : path.length);
                const pv: PrimeValue = {
                    value: prod / denom,
                    primes: path
                }
                paths.push(pv);
                return;
            }
            find(product * prime, path.concat([prime]), i);
            if (paths.length > 2e6) break;
        }
    }

    export function run(): Integer {
        const timestart: Integer = new Date().getTime();
        let cnt: Integer = 0;
        find(1, [], 0);
        paths.sort((a, b) => a.value - b.value);
        const primes = paths[1e6 - 1].primes;
        console.log(primes);
        const twocount: Integer = 1e6 - (primes[0] == 2 ? 1 : primes.length);
        const wholecount: Integer = Math.floor(twocount / 20);
        let result: Integer = Math.pow(2, twocount % 20) % MODULO;
        for (let i = 0; i < wholecount; i++) {
            result = (result * Math.pow(2, 20)) % MODULO;
        }
        for (let i = 0; i < primes.length; i++) {
            result = (result * primes[i]) % MODULO;
        }
        cnt = result;
        const timeend: Integer = new Date().getTime();
        console.log(`Complete in ${(timeend - timestart) / 1000} seconds;`);
        return cnt;
    }

}

console.log(E615.run());
