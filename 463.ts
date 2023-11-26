

const Modulo: bigint = 1000000000n;

const CACHE: Map<bigint, bigint> = new Map();

const ARG2: number = parseInt(process.argv[2] ?? "8");
const MAXN: bigint = ARG2 ? BigInt(ARG2) : 3n**37n;

function cacheValue(N: bigint): bigint {
    let result: bigint | undefined = CACHE.get(N);
    if (!result) {
        result = rcompute(N % Modulo);
        CACHE.set(N, result);
    // } else {
    //     console.log(`cache hit N=${N} result=${result}`);
    }
    return result;
}

function reduceEven(N: bigint): bigint {
    while (N % 2n === 0n) {
        N /= 2n;
    }
    return cacheValue(N);
}

function rcompute(N: bigint): bigint {
    if (N === 1n) {
        return 1n;
    }
    if (N === 3n) {
        return 3n;
    }
    if (N % 2n === 0n) {
        return reduceEven(N);
    }
    const n: bigint = N / 4n;
    const lpart: bigint = cacheValue(2n * n + 1n);
    const rpart: bigint = reduceEven(n)
    if (N % 4n === 1n) {
        return 2n * lpart - rpart;
    }
    if (N % 4n === 3n) {
        return 3n * lpart - 2n * rpart;
    }
    return 0n;
}

function rrun(): bigint {
    let sum: bigint = 0n;
    for (let N = 1n; N <= MAXN; N++) {
        const result: bigint = rcompute(N);
        sum += result;
        console.log(N, result);
    }
    console.log(CACHE.size);
    return sum;
}
console.log(rrun());

//tri_num=1105442 sum=450283506288513521 max=450283905890997363



