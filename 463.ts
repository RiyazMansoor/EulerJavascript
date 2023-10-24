
namespace E463 {

    const Modulo: bigint = 1000000000n;

    const CacheResult: Map<bigint, bigint> = new Map();

    const Cache2Powers: Map<bigint, bigint> = new Map();

    const ARG_2: number = parseInt(process.argv[2] ?? "0");
    const MAX_INCLUSIVE: bigint = ARG_2 ? BigInt(ARG_2) : 3n**37n;

    function cacheValue(N: bigint): bigint {
        let result: bigint | undefined = CacheResult.get(N);
        if (result) return result;
        result = compute(N % Modulo);
        CacheResult.set(N, result);
        return result;
    }
    
    function compute(N: bigint): bigint {
        if (N === 1n) {
            return 1n;
        }
        if (N === 3n) {
            return 3n;
        }
        if (N % 2n === 0n) {
            return cacheValue(N / 2n);
        }
        if (N % 4n === 1n) {
            const n: bigint = N / 4n;
            return 2n * cacheValue(2n * n + 1n) - cacheValue(n);
        }
        if (N % 4n === 3n) {
            const n: bigint = N / 4n;
            return 3n * cacheValue(2n * n + 1n) - 2n * cacheValue(n);
        }
        return 0n;
    }
    
    function e463(): bigint {
        const vals: bigint[] = [0n];
        let cumSum: bigint = 0n;
        for (let n = 1n; n <= MAX_INCLUSIVE; n++) {
            const result: bigint =  compute(n);
            vals.push(result);
            cumSum += result;
            console.log(`n=${n} result=${result}  cumsum=${cumSum}`);
        }
        // for (const rem of [ 1n, 2n, 3n, 4n ]) {
        //     const series: bigint[] = [];
        //     for (let i = rem; i < vals.length; i += 4n) {
        //         series.push(vals[i]);
        //     }
        //     console.log(series);
        // }
        return cumSum;
    }

    function arithSum(a: bigint, n: bigint): bigint {
        // difference "2" factored in
        return n * (a + (n - 1n));
    }

    function cacheTwoPowers(N: bigint): bigint {
        let result: bigint | undefined = Cache2Powers.get(N);
        if (result) return result;
        result = 2n ** N;
        Cache2Powers.set(N, result);
        return result;
    }


    export function run() {
        const timestamp = new Date().getTime();
        let MaxRunDown: bigint = MAX_INCLUSIVE - 4n;
        let NCycleNum: bigint = 0n;
        let SSum: bigint = 5n;
        console.log(`SSum1=${SSum}`);
        // add by blocks 4 * 2^n
        while (true) {
            NCycleNum++;
            const blocksize: bigint = 4n * (2n ** NCycleNum);
            if (blocksize > MaxRunDown) {
                NCycleNum--;
                break;
            }
            MaxRunDown -= blocksize;
            // commong powers of 2
            const NM1: bigint = cacheTwoPowers(NCycleNum - 1n);
            const N_0: bigint = cacheTwoPowers(NCycleNum);
            const NP1: bigint = cacheTwoPowers(NCycleNum + 1n);
            const NP2: bigint = cacheTwoPowers(NCycleNum + 2n);
            // Series 1 :: top = 3*2^(n) - 1, stt = 2^(n+2) + 1 , term_count = 2^(n) - 1 
            SSum += 3n * N_0 - 1n;
            console.log(`SSum2=${SSum}`);
            const s1stt: bigint = NP2 + 1n;
            SSum += arithSum(s1stt, N_0 - 1n);
            console.log(`SSum3=${SSum}`);
            // Series 3 :: top = 2^(n+2) - 1, start =  3*2^(n+1) + 1, terms = 2^(n) - 1 
            SSum += NP2 - 1n;
            console.log(`SSum4=${SSum}`);
            const s3stt: bigint = 3n * NP1 + 1n;
            SSum += arithSum(s3stt,  N_0 - 1n);
            console.log(`SSum5=${SSum}`);
            // Series 4 end = 2^(n+1) - 1, sum = 2 * end
            SSum += arithSum(1n, N_0);
            console.log(`SSum6=${SSum}`);
        }
        // series 2 max
        const Series2Terms: bigint = (MAX_INCLUSIVE - MaxRunDown) / 4n;
        SSum += Series2Terms * Series2Terms; // series sum of odd numbers = n^2
        console.log(`whole 2^power blocks calcluated = ${SSum} ncycles=${NCycleNum}`);
        console.log(`duration(s)=${(new Date().getTime() - timestamp) / 1000}`);
        if (MaxRunDown > 0n) {
            console.log(`Remaining numbers = ${MaxRunDown}`);
            // Remaining number = 162053529739285623
            // too big to do singly like below.
            const RemStart: bigint = MAX_INCLUSIVE - MaxRunDown + 1n;
            for (let n: bigint = RemStart; n <= MAX_INCLUSIVE; n++) {
                const singleResult = compute(n);
                SSum += singleResult;
                // console.log(`n=${n} result=${singleResult} ssum=${SSum}`);
            }
            console.log(`duration(s)=${(new Date().getTime() - timestamp) / 1000}`);
        }
        return SSum % 1000000000n;
    }

}

// console.log(e463());

//tri_num=1105442 sum=450283506288513521 max=450283905890997363





console.log(E463.run());
