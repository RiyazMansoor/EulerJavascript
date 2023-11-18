import { Integer } from "./common";


function digitSum(num: Integer): Integer {
    let sum: Integer = 0;
    while (num > 0) {
        sum += num % 10;
        num = Math.floor(num / 10);
    }
    return sum;
}

function bruteList(max: Integer): void {
    for (let n = 0; n < max; n++) {
        if (digitSum(n) == digitSum(137*n)) {
            console.log(n, 137*n);
        }
    }
}

const Arg2: Integer = parseInt(process.argv[2] ?? "1000");
bruteList(Arg2);
