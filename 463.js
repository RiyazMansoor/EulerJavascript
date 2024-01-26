"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MODULUS = 1000000000n;
const CACHE = new Map();
const MaxN = parseInt(process.argv[2] ?? "8");
function cacheValue(num) {
    let result = CACHE.get(num);
    if (!result) {
        result = rcompute(num);
        CACHE.set(num, result);
    }
    return result;
}
function reduceEven(num) {
    while (num % 2 === 0) {
        num /= 2;
    }
    return cacheValue(num);
}
function rcompute(num) {
    if (num === 1) {
        return 1;
    }
    if (num === 3) {
        return 3;
    }
    if (num % 2 === 0) {
        return reduceEven(num);
    }
    const newnum = Math.floor(num / 4);
    const lpart = cacheValue(2 * newnum + 1);
    const rpart = reduceEven(newnum);
    const remainder = num % 4;
    if (remainder === 1) {
        return 2 * lpart - rpart;
    }
    if (remainder === 3) {
        return 3 * lpart - 2 * rpart;
    }
    return 0;
}
function rrun() {
    let sum = 0;
    for (let N = 1; N <= MaxN; N++) {
        const result = rcompute(N);
        sum += result;
        console.log(N, result);
    }
    console.log(CACHE.size);
    return sum;
}
console.log(rrun());
//tri_num=1105442 sum=450283506288513521 max=450283905890997363
//# sourceMappingURL=463.js.map