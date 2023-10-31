import { Integer, PrimeNumbers, SortedPrimeArray } from "./common";


namespace E153 {

    const PRIMES: SortedPrimeArray = new PrimeNumbers(1e8).toArray();

    export function run(): Integer {
        const timestart: Integer = new Date().getTime();
        let cnt: Integer = 0;

        const timeend: Integer = new Date().getTime();
        console.log(`Complete in ${(timeend-timestart)/1000} seconds;`);
        return cnt;
    }

}