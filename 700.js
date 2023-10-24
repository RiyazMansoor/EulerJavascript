"use strict";
// cnt=17000000000 sum=1517926517477964
var E700;
(function (E700) {
    // largest javascript  9007199254740991
    const EULERDOB = 1504170715041707n;
    const MODULO = 4503599627370517n;
    function run() {
        let sum = EULERDOB;
        let min = EULERDOB;
        let cnt = 2n;
        for (cnt = 2n; cnt < BigInt(1e11); cnt++) {
            const value = (cnt * EULERDOB) % MODULO;
            // console.log(`cnt=${cnt} value=${value}`);
            // if (cnt > 20n) break;
            if (value == EULERDOB)
                break;
            if (min > value) {
                sum += value;
                min = value;
                console.log(`min=${min} cnt=${cnt} sum=${sum}`);
                if (min < 2e7)
                    break;
            }
            if (cnt % 100000000n == 0n) {
                console.log(`cnt=${cnt} sum=${sum}`);
            }
        }
        ;
        console.log(`min=${min} cnt=${cnt} sum=${sum}`);
        for (let rem = min - 1n; rem > 0; rem--) {
            // rem + k$ * MODULO == ncnt$ * EULERDOB
            for (let k = 1n; k <= rem; k++) {
                const km = rem + k * MODULO;
                if (km % EULERDOB === 0n) {
                    const value = km / EULERDOB;
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
    E700.run = run;
})(E700 || (E700 = {}));
console.log(E700.run());
