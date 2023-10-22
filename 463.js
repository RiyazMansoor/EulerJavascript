"use strict";
const CacheStore463 = new Map();
function cacheValue(N) {
    let result = CacheStore463.get(N);
    if (result)
        return result;
    result = compute463(N % 1000000000n);
    CacheStore463.set(N, result);
    return result;
}
function compute463(N) {
    if (N === 1n) {
        return 1;
    }
    if (N === 3n) {
        return 3;
    }
    if (N % 2n === 0n) {
        return cacheValue(N / 2n);
    }
    if (N % 4n === 1n) {
        const n = N / 4n;
        return 2 * cacheValue(2n * n + 1n) - cacheValue(n);
    }
    if (N % 4n === 3n) {
        const n = N / 4n;
        return 3 * cacheValue(2n * n + 1n) - 2 * cacheValue(n);
    }
    return 0;
}
const N = parseInt(process.argv[2] ?? "1000");
function e463() {
    const timestamp = new Date().getTime();
    const vals = [0];
    let cumSum = 0;
    for (let n = 1n; n <= N; n++) {
        const result = compute463(n);
        vals.push(result);
        cumSum += result;
        console.log(`n=${n} result=${result}  cumsum=${cumSum}`);
    }
    console.log(`duration(s)=${(new Date().getTime() - timestamp) / 1000}`);
    for (const rem of [1, 2, 3, 4]) {
        const series = [];
        for (let i = rem; i < vals.length; i += 4) {
            series.push(vals[i]);
        }
        console.log(series);
    }
    return cumSum;
}
// console.log(e463());
const MAX_INCLUSIVE = 3n ** 37n;
//tri_num=1105442 sum=450283506288513521 max=450283905890997363
function n2summation(n) {
    return (n + 1n) * (2n * n + 1n) * n / 6n;
}
const Cache2Powers = new Map();
function cacheTwoPowers(N) {
    let result = Cache2Powers.get(N);
    if (result)
        return result;
    result = 2n ** N;
    Cache2Powers.set(N, result);
    return result;
}
function seriesCount() {
    // find how many triangle number fit into MAx
    let triNum = 40n;
    let newStt = 0n;
    while (true) {
        const sum = 2n ** triNum;
        if (sum > MAX_INCLUSIVE) {
            triNum--;
            break;
        }
        triNum++;
        newStt = sum + 1n;
        // console.log(`tri_num=${triNum} sum=${sum} max=${MAX_INCLUSIVE}`);
    }
    console.log(`triNum=${triNum} newStt=${newStt}`);
    let SSum = 6n; // n = 1,2,3,4;
    for (let triN = 2n; triN <= triNum; triN++) {
        const NM1 = cacheTwoPowers(triN - 1n);
        const N_0 = cacheTwoPowers(triN);
        const NP1 = cacheTwoPowers(triN + 1n);
        const NtN = triN * triN;
        // Series 1 :: top = 3*2^(n-1) - 1, stt = 2^(n+1) + 1, term_count = 2^(n-1) - 1 - 1
        SSum += 3n * NM1 - 1n;
        const s1stt = NP1 + 1n;
        const s1end = s1stt + 2n * (NM1 - 2n);
        SSum += s1end * s1end - s1stt * s1stt;
        // Series 2 :: start = n^2 - 1  end = 2^(n+1) - 3
        const s2stt = NtN - 1n;
        const s2end = NP1 - 3n;
        SSum += s2end * s2end - s2stt * s2stt;
        // Series 3 :: top = 2^(n+1) - 1, start = 3*2^n + 1, terms = 2^(n-1) - 1
        SSum += NP1 - 1n;
        const s3stt = 3n * N_0 + 1n;
        const s3end = NM1 - 1n;
        SSum += s3end * s3end - s3stt * s3stt;
        // Series 4
        SSum += NtN;
    }
    console.log(SSum);
    // last term = max_c
    const NM1 = cacheTwoPowers(triNum - 1n);
    const N_0 = cacheTwoPowers(triNum);
    const NP1 = cacheTwoPowers(triNum + 1n);
    const NtN = triNum * triNum;
    // Series 1 :: top = 3*2^(n-1) - 1, stt = 2^(n+1) + 1, term_count = 2^(n-1) - 1 - 1
    SSum += 3n * NM1 - 1n;
    const s1stt = NP1 + 1n;
    //    const s1end: bigint = s1stt + 2n * (NM1 - 2n);
    SSum += MAX_INCLUSIVE * MAX_INCLUSIVE - s1stt * s1stt;
    // Series 2 :: start = n^2 - 1  end = 2^(n+1) - 3
    const s2stt = NtN - 1n;
    const s2end = NP1 - 3n;
    SSum += MAX_INCLUSIVE * MAX_INCLUSIVE - s2stt * s2stt;
    // Series 3 :: top = 2^(n+1) - 1, start = 3*2^n + 1, terms = 2^(n-1) - 1
    SSum += NP1 - 1n;
    const s3stt = 3n * N_0 + 1n;
    const s3end = NM1 - 1n;
    SSum += MAX_INCLUSIVE * MAX_INCLUSIVE - s3stt * s3stt;
    // Series 4
    SSum += NtN;
    return SSum % 1000000000n;
}
console.log(seriesCount());
