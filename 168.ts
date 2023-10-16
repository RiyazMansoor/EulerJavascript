/**
 * let N = 10n + u
 * let R = u*10^d + n where d is the number of digits in "n"
 * R == kN
 * u*10^d + n = 10nk + uk
 * u(10^d - k) = n(10k - 1)
 * n = u(10^d - k)/(10k - 1) where all variables are integers
 */

function e168(): string {

    // special case where k == 1 => n = u(10^d - 1)/9
    let sum = BigInt(5 * (99 + 999 + 9999) + 5 * 99999 * 95);

    for (let k = 2; k < 10; k++) {
        let den = 10n * BigInt(k) - 1n;
        for (let d = 1; d < 99; d++) {
            for (let u = 1; u < 10; u++) {
                let num = BigInt(u) * (10n ** BigInt(d) - BigInt(k));
                let n = num / den;
                if (n * den == num) {
                    const N = 10n * BigInt(n) + BigInt(u);
                    const strN = N.toString();
                    // if (parseInt(strN.charAt(0)) <= u) {
                        console.log(`N=${N}, num=${num}, den=${den}, d=${d}, u=${u}, k=${k}, n=${n}`);
                        sum += N;
                    // }
                }
            }
        }
    }
    console.log(`final sum=${sum}`);
    return sum.toString().substring(-5);

}
