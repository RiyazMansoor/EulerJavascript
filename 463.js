"use strict";
const Modulo = 1000000000n;
const CACHE = new Map();
const ARG2 = parseInt(process.argv[2] ?? "8");
const MAXN = ARG2 ? BigInt(ARG2) : 3n ** 37n;
function cacheValue(N) {
    let result = CACHE.get(N);
    if (!result) {
        result = rcompute(N % Modulo);
        CACHE.set(N, result);
        // } else {
        //     console.log(`cache hit N=${N} result=${result}`);
    }
    return result;
}
function reduceEven(N) {
    while (N % 2n === 0n) {
        N /= 2n;
    }
    return cacheValue(N);
}
function rcompute(N) {
    if (N === 1n) {
        return 1n;
    }
    if (N === 3n) {
        return 3n;
    }
    if (N % 2n === 0n) {
        return reduceEven(N);
    }
    const n = N / 4n;
    const lpart = cacheValue(2n * n + 1n);
    const rpart = reduceEven(n);
    if (N % 4n === 1n) {
        return 2n * lpart - rpart;
    }
    if (N % 4n === 3n) {
        return 3n * lpart - 2n * rpart;
    }
    return 0n;
}
function rrun() {
    let sum = 0n;
    for (let N = 1n; N <= MAXN; N++) {
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