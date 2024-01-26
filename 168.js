"use strict";
/**
 * let N = 10n + u
 * let R = u*10^d + n where d is the number of digits in "n"
 * R == kN
 * u*10^d + n = 10nk + uk
 * u(10^d - k) = n(10k - 1)
 * n = u(10^d - k)/(10k - 1) where all variables are integers
 *
 * Answer = 59206
 */
Object.defineProperty(exports, "__esModule", { value: true });
function e168() {
    // special case where k == 1 => n = u(10^d - 1)/9
    let sum = BigInt(5 * (99 + 999 + 9999) + 5 * 99999 * 95);
    sum = 0n;
    for (let k = 1; k < 10; k++) {
        let den = 10n * BigInt(k) - 1n;
        for (let d = 1; d < 100; d++) {
            for (let u = 1; u < 10; u++) {
                let num = BigInt(u) * (10n ** BigInt(d) - BigInt(k));
                let n = num / den;
                if (n * den == num) {
                    const N = 10n * BigInt(n) + BigInt(u);
                    if (N > 10n ** 100n)
                        continue;
                    const strN = N.toString();
                    if (n.toString().length == d) {
                        // console.log(`N=${N}, num=${num}, den=${den}, d=${d}, u=${u}, k=${k}, n=${n}`);
                        console.log(`${N} ${d} ${u} ${k}`);
                        sum += N;
                    }
                }
            }
        }
    }
    console.log(`final sum=${sum.toString().slice(-5)}`);
}
e168();
//# sourceMappingURL=168.js.map