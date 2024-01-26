/*
f(1)  = 1
f(2)  = 1
f(3)  = 3
f(4)  = 1
f(5)  = 2f(3)-f(1)      = 5
f(6)  = f(3)            = 3     = 15
f(7)  = 3f(3)-2f(1)     = 7
f(8)  = f(1)
f(9)  = 2f(5)-f(2)      = 8
f(10) = f(5)            = 5     = 27
f(11) = 3f(5)-2f(2)     = 13
f(12) = f(3)
f(13) = 2f(7)-f(3)      = 11
f(14) = f(7)            = 7     = 33
f(15) = 3f(7)-2f(3)     = 15
f(16) = f(1)
f(17) = 2f(9)-f(4)
f(18) = f(9)
f(19) = 3f(9)-2f(4)
f(20) = f(5)
f(21) = 2f(11)-f(5)
f(22) = f(11)
f(23) = 3f(11)-2f(5)
f(24) = f(3)
f(25) = 2f(13)-f(6)
f(26) = f(13)
f(27) = 3f(13)-2f(6)
f(28) = f(7)
f(29) = 2f(15)-f(7)
f(30) = f(15)
f(31) = 3f(15)-2f(7)
f(32) = f(1)

*/
import { Integer, Float } from "./common";


const MODULUS: bigint = 1000000000n;

const CACHE: Map<Integer, Integer> = new Map();

const MaxN: Integer = parseInt(process.argv[2] ?? "8");



function cacheValue(num: Integer): Integer {
    let result: Integer | undefined = CACHE.get(num);
    if (!result) {
        result = rcompute(num);
        CACHE.set(num, result);
    }
    return result;
}

function reduceEven(num: Integer): Integer {
    while (num % 2 === 0) {
        num /= 2;
    }
    return cacheValue(num);
}

function rcompute(num: Integer): Integer {
    if (num === 1) {
        return 1;
    }
    if (num === 3) {
        return 3;
    }
    if (num % 2 === 0) {
        return reduceEven(num);
    }
    const newnum: Integer = Math.floor(num / 4);
    const lpart: Integer = cacheValue(2 * newnum + 1);
    const rpart: Integer = reduceEven(newnum);
    const remainder: Integer = num % 4;
    if (remainder === 1) {
        return 2 * lpart - rpart;
    }
    if (remainder === 3) {
        return 3 * lpart - 2 * rpart;
    }
    return 0;
}

function rrun(): Integer {
    let sum: Integer = 0;
    for (let N = 1; N <= MaxN; N++) {
        const result: Integer = rcompute(N);
        sum += result;
        console.log(N, result);
    }
    console.log(CACHE.size);
    return sum;
}
console.log(rrun());

//tri_num=1105442 sum=450283506288513521 max=450283905890997363



