
const CacheStore463: Map<bigint, number> = new Map();

function cacheValue(N: bigint): number {
    let result: number | undefined = CacheStore463.get(N);
    if (result) return result;
    result = compute463(N % 1000000000n);
    CacheStore463.set(N, result);
    return result;
}

function compute463(N: bigint): number {
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
        const n: bigint = N / 4n;
        return 2 * cacheValue(2n * n + 1n) - cacheValue(n);
    }
    if (N % 4n === 3n) {
        const n: bigint = N / 4n;
        return 3 * cacheValue(2n * n + 1n) - 2 * cacheValue(n);
    }
    return 0;
}

const N: number = parseInt(process.argv[2] ?? "1000");

function e463(): number {
    const timestamp = new Date().getTime();
    const vals: number[] = [0];
    let cumSum: number = 0;
    for (let n = 1n; n <= N; n++) {
        const result: number =  compute463(n);
        vals.push(result);
        cumSum += result;
        console.log(`n=${n} result=${result}  cumsum=${cumSum}`);
    }
    console.log(`duration(s)=${(new Date().getTime() - timestamp) / 1000}`);
    for (const rem of [ 1, 2, 3, 4]) {
        const series: number[] = [];
        for (let i = rem; i < vals.length; i += 4) {
            series.push(vals[i]);
        }
        console.log(series);
    }
    return cumSum;
}
// console.log(e463());

const MAX_INCLUSIVE: bigint = 3n**37n;
//tri_num=1105442 sum=450283506288513521 max=450283905890997363

function n2summation(n: bigint): bigint {
    return (n + 1n) * (2n * n + 1n) * n / 6n;
}

const Cache2Powers: Map<bigint, bigint> = new Map();

function cacheTwoPowers(N: bigint): bigint {
    let result: bigint | undefined = Cache2Powers.get(N);
    if (result) return result;
    result = 2n ** N;
    Cache2Powers.set(N, result);
    return result;
}


function seriesCount(): bigint {
    // find how many triangle number fit into MAx
    let triNum: bigint = 40n;
    let newStt: bigint = 0n;
    while (true) {
        const sum: bigint = 2n ** triNum;
        if (sum > MAX_INCLUSIVE) {
            triNum--;
            break;
        }
        triNum++;
        newStt = sum + 1n;
        // console.log(`tri_num=${triNum} sum=${sum} max=${MAX_INCLUSIVE}`);
    }
    console.log(`triNum=${triNum} newStt=${newStt}`);
    let SSum: bigint = 6n; // n = 1,2,3,4;
    for (let triN = 2n; triN <= triNum; triN++) {
        const NM1: bigint = cacheTwoPowers(triN - 1n);
        const N_0: bigint = cacheTwoPowers(triN);
        const NP1: bigint = cacheTwoPowers(triN + 1n);
        const NtN: bigint = triN * triN;
        // Series 1 :: top = 3*2^(n-1) - 1, stt = 2^(n+1) + 1, term_count = 2^(n-1) - 1 - 1
        SSum += 3n * NM1 - 1n;
        const s1stt: bigint = NP1 + 1n;
        const s1end: bigint = s1stt + 2n * (NM1 - 2n);
        SSum += s1end * s1end - s1stt * s1stt;
        // Series 2 :: start = n^2 - 1  end = 2^(n+1) - 3
        const s2stt: bigint = NtN - 1n;
        const s2end: bigint = NP1 - 3n;
        SSum += s2end * s2end - s2stt * s2stt;
        // Series 3 :: top = 2^(n+1) - 1, start = 3*2^n + 1, terms = 2^(n-1) - 1
        SSum += NP1 - 1n;
        const s3stt: bigint = 3n * N_0 + 1n;
        const s3end: bigint = NM1 - 1n;
        SSum += s3end * s3end - s3stt * s3stt;
        // Series 4
        SSum += NtN;
    }
    console.log(SSum);
    // last term = max_c
    const NM1: bigint = cacheTwoPowers(triNum - 1n);
    const N_0: bigint = cacheTwoPowers(triNum);
    const NP1: bigint = cacheTwoPowers(triNum + 1n);
    const NtN: bigint = triNum * triNum;
    // Series 1 :: top = 3*2^(n-1) - 1, stt = 2^(n+1) + 1, term_count = 2^(n-1) - 1 - 1
    SSum += 3n * NM1 - 1n;
    const s1stt: bigint = NP1 + 1n;
//    const s1end: bigint = s1stt + 2n * (NM1 - 2n);
    SSum += MAX_INCLUSIVE * MAX_INCLUSIVE - s1stt * s1stt;
    // Series 2 :: start = n^2 - 1  end = 2^(n+1) - 3
    const s2stt: bigint = NtN - 1n;
    const s2end: bigint = NP1 - 3n;
    SSum += MAX_INCLUSIVE * MAX_INCLUSIVE - s2stt * s2stt;
    // Series 3 :: top = 2^(n+1) - 1, start = 3*2^n + 1, terms = 2^(n-1) - 1
    SSum += NP1 - 1n;
    const s3stt: bigint = 3n * N_0 + 1n;
    const s3end: bigint = NM1 - 1n;
    SSum += MAX_INCLUSIVE * MAX_INCLUSIVE - s3stt * s3stt;
    // Series 4
    SSum += NtN;

    return SSum % 1000000000n;
}

console.log(seriesCount());
