
// cnt=17000000000 sum=1517926517477964

namespace E700 {

    // largest javascript  9007199254740991
    const EULERDOB: bigint = 1504170715041707n;
    const MODULO: bigint = 4503599627370517n;

    export function run(): bigint {
        let sum: bigint = EULERDOB;
        let min: bigint = EULERDOB;
        for (let cnt = 2n; cnt < BigInt(1e11); cnt++) {
            const value: bigint = (cnt * EULERDOB) % MODULO;
            // console.log(`cnt=${cnt} value=${value}`);
            // if (cnt > 20n) break;
            if (value == EULERDOB) break;
            if (min > value) {
                sum += value;
                min = value;
                console.log(`min=${min} cnt=${cnt} sum=${sum}`);
            }
            if (cnt % 1000000000n == 0n) {
                console.log(`cnt=${cnt} sum=${sum}`);
            }
        };
        return sum;
    }

}

console.log(E700.run());
