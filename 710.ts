import { Integer, PrimeNumbers, SortedPrimeArray } from "./common";


namespace E710 {

    const solutions: Integer[][] = [];
    function find(sum: Integer, path: Integer[], target: Integer): void {
        if (sum == target) {
            solutions.push(path);
            return;
        }
        for (let val = 1; (sum + val) <= target; val++) {
            find(sum + val, path.concat([val]), target);
        }
    }

    export function run(): Integer {
        const timestart: Integer = new Date().getTime();
        let cnt: Integer = 0;

        const timeend: Integer = new Date().getTime();
        console.log(`Complete in ${(timeend-timestart)/1000} seconds;`);
        return cnt;
    }

}

