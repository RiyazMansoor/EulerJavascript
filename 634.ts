import { Integer } from "./common";

function cbroots(divisor: Integer, target: bigint): bigint {
    let newTgt: bigint = BigInt( Math.floor( Number(target) / divisor**2 ) );
    let estVal: bigint = BigInt( Math.floor( Math.cbrt( Number(newTgt) ) ) );
    while (estVal*estVal*estVal <= newTgt) {
        estVal++;
    }
    return estVal - 1n - BigInt(divisor - 1);
}

function sqroots(divisor: Integer, target: bigint): bigint {
    let newTgt: bigint = BigInt( Math.floor( Number(target) / divisor**3 ) );
    let estVal: bigint = BigInt( Math.floor( Math.sqrt( Number(newTgt) ) ) );
    while (estVal*estVal <= newTgt) {
        estVal++;
    }
    return estVal - 1n - BigInt(divisor);
}


function count(MAX: bigint): bigint {
    let cnt: bigint = 0n;
    for (let n = 2; true; n++) {
        const cnt3: bigint = cbroots(n, MAX);;
        const cnt2: bigint = sqroots(n, MAX);
        console.log(`n=${n} cbroots=${cnt3} sqroots=${cnt2}`);
        if (cnt2 <= 0n && cnt3 <= 0n) break;
        cnt += cnt2 + cnt3;
    }
    return cnt;
}

// console.log(sqroot(2, 10000n));
// console.log(cbroot(3, 1000000n));

console.log(count(100n));
console.log(count(20000n));
// console.log(count(3000000n));
