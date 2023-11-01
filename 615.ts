
import { Integer, Numbers, Prime, PrimeNumbers } from "./common";

namespace E615 {

    const MODULO: Integer = 123454321;

    const MAX: Integer = parseInt(process.argv[2] ?? "1500000");
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
                const denom: Integer = Math.pow(2, (path[0] == 2 ? 1 : path.length));
                const pv: PrimeValue = {
                    value: product / denom,
                    primes: path
                }
                paths.push(pv);
                return;
            }
            find(product * prime, path.concat([prime]), i);
            // if (paths.length > 2e6) break;
        }
    }

    function moduloPower(base: Integer, power: Integer, modulo: Integer): Integer {
        let result: Integer = 1;
        while (power > 0) {
            result = (result * base) % modulo;
            power--;
        }
        return result;
    }

    function moduloArray(nums: Integer[], modulo: Integer): Integer {
        return nums.reduce( (pv, cv) => (pv * cv) % modulo, 1 );        
    }

    export function run(): Integer {
        const timestart: Integer = new Date().getTime();
        let cnt: Integer = 0;
        find(1, [], 0);
        console.log(paths.length);
        paths.sort((a, b) => a.value - b.value);
        // paths.forEach( path => console.log(`value=${path.value} path=${path.primes}`));
        const primes = paths[1e6 - 1].primes;
        console.log(paths[1e6 - 1].value);
        console.log(primes);
        const twopower: Integer = 1e6 - (primes[0] == 2 ? 1 : primes.length);
        cnt = (moduloPower(2, twopower, MODULO) * moduloArray(primes, MODULO)) % MODULO;
        // const wholecount: Integer = Math.floor(twopower / 20);
        // let result: Integer = Math.pow(2, twopower % 20) % MODULO;
        // for (let i = 0; i < wholecount; i++) {
        //     result = (result * Math.pow(2, 20)) % MODULO;
        // }
        // for (let i = 0; i < primes.length; i++) {
        //     result = (result * primes[i]) % MODULO;
        // }
        // cnt = result;
        const timeend: Integer = new Date().getTime();
        console.log(`Complete in ${(timeend - timestart) / 1000} seconds;`);
        return cnt;
    }

}

console.log(E615.run());
