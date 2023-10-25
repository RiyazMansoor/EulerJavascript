
import { PrimeNumbers } from "./common";

const MAX_PERIMETER = parseInt(process.argv[2] ?? "100");

function scanner(): number {
    let cnt: number = MAX_PERIMETER * (MAX_PERIMETER + 1) / 2;
    const MAX_A: number = Math.ceil(MAX_PERIMETER / 3);
    const MAX_B: number = MAX_PERIMETER - 1;
    for (let a = 2; a < MAX_A; a++) {
        for (let b = a; b < MAX_B; b++) {

        }
    }
    return cnt;
}


console.log(new PrimeNumbers(1e6).toArray().length);
