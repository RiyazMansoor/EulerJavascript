
// cnt=17000000000 sum=1517926517477964

namespace E700 {

    // largest javascript  9007199254740991
    const EULERDOB: bigint = 1504170715041707n;
    const MODULO: bigint = 4503599627370517n;

    const argv: bigint = BigInt(parseInt(process.argv[2] ?? "1000"));

    function seek(): void {
        const REM = 111054189n;
        // for (let r = REM -1n; r > 0; r++) {
        for (const r of [428410324n, REM, REM - 1n]) {
            for (let k = 1n; k < argv; k++) {
                if ((k * MODULO + r) % EULERDOB === 0n) {
                    const n = (k * MODULO + r) / EULERDOB;
                    console.log(`k=${k} n=${n}`);
                    break;
                }
            }
        }
    }

    export function run(): void {
        seek();
    }

    export function brute(): bigint {
        let sum: bigint = EULERDOB;
        let min: bigint = EULERDOB;
        let cnt: bigint = 2n;
        for (cnt = 2n; cnt < BigInt(1e11); cnt++) {
            const value: bigint = (cnt * EULERDOB) % MODULO;
            // console.log(`cnt=${cnt} value=${value}`);
            // if (cnt > 20n) break;
            if (value == EULERDOB) break;
            if (min > value) {
                sum += value;
                min = value;
                console.log(`min=${min} cnt=${cnt} sum=${sum}`);
                if (min < 2e7) break;
            }
            if (cnt % 100000000n == 0n) {
                console.log(`cnt=${cnt} sum=${sum}`);
            }
        };
        console.log(`min=${min} cnt=${cnt} sum=${sum}`);
        for (let rem = min - 1n; rem > 0; rem--) {
            // rem + k$ * MODULO == ncnt$ * EULERDOB
            for (let k = 1n; k <= rem; k++) {
                const km: bigint = rem + k * MODULO;
                if (km % EULERDOB === 0n) {
                    const value: bigint = km / EULERDOB;
                    if (min > value) {
                        sum += value;
                        min = value;
                        console.log(`min=${min} cnt=${cnt} sum=${sum}`);
                    }
                }
            }
            if (rem % 1000n === 0n) {
                console.log(`progress rem=${rem}`);
            }
        }
        return sum;
    }

}

console.log(E700.run());
