"use strict";
// cnt=20500000000 sum=1528096379332306
var E700;
(function (E700) {
    // largest javascript  9007199254740991
    const EULERDOB = 1504170715041707n;
    const MODULO = 4503599627370517n;
    function run() {
        let sum = EULERDOB;
        let min = EULERDOB;
        for (let cnt = 2n; cnt < BigInt(1e11); cnt++) {
            const value = (cnt * EULERDOB) % MODULO;
            // console.log(`cnt=${cnt} value=${value}`);
            // if (cnt > 20n) break;
            if (value == EULERDOB)
                break;
            if (min > value) {
                sum += value;
                min = value;
                console.log(`min=${min} cnt=${cnt} sum=${sum}`);
            }
            if (cnt % 1000000000n == 0n) {
                console.log(`cnt=${cnt} sum=${sum}`);
            }
        }
        ;
        return sum;
    }
    E700.run = run;
})(E700 || (E700 = {}));
console.log(E700.run());
