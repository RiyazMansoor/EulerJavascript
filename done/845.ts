
// answer = 45009328011709400

import { Integer, Numbers, PRIMES1000, Prime } from "../common";


const PRIMES: Prime[] = PRIMES1000.slice(0, Numbers.indexOfSorted(9*16, PRIMES1000));

const SlotVals: Integer[] = Array(10).fill(0).map( (v, i) => i );

function count(SLOTS: Integer, PREFIXLEN: Integer, runVal: Integer, runPath: Integer[], runIndex: Integer): bigint {
    if (runPath.length == SLOTS) {
        if (PRIMES.includes(runVal)) {
            // console.log(runPath);
            return Numbers.Permutations(runPath.slice(PREFIXLEN));
        }
        return 0n;
    }
    let cnt: bigint = 0n;
    for (const slotVal of SlotVals.slice(runIndex)) {
        cnt += count(SLOTS, PREFIXLEN, runVal + slotVal, runPath.concat([slotVal]), slotVal);
    }
    return cnt;
}

function findNum(SLOTS: Integer, prefix: Integer[], target: bigint, runCnt: bigint): Integer[] {
    if (prefix.length == SLOTS) return prefix;
    for (let digit = 0; digit < 10; digit++) {
        const runVal: Integer = Numbers.Sum(prefix) + digit;
        const runPath: Integer[] = prefix.concat([digit]);
        const prefixLen: Integer = prefix.length + 1;
        const result: bigint = count(SLOTS, prefixLen, runVal, runPath, 0);
        console.log(`findNum :: result=${result} runCnt=${runCnt} runVal=${runVal} target=${target} ${runPath}`);
        if (runCnt + result >= target) {
            // console.log(`more digits found :: cnt=${runCnt} target=${target} ${prefix.concat([digit])}`);
            return findNum(SLOTS, prefix.concat([digit]), target, runCnt);
        }
        runCnt += result;
    }
    throw `should not reach`
}

function run(): void {
    let ARG2: Integer = parseInt(process.argv[2] ?? "61");
    const TARGET: bigint = (ARG2 == 61) ? BigInt(ARG2) : 10n**BigInt(ARG2);
    let cnt: bigint = 4n;
    let slots: Integer = 0, digit: Integer = 0;
    OUT:
    for (slots = 2; slots < 20; slots++) {
        for (digit = 1; digit < 10; digit++) {
            const result: bigint = count(slots, 1, digit, [digit], 0);
            console.log(`slots=${slots} digit=${digit} result=${result} cnt=${cnt}`);
            if (result + cnt > TARGET) break OUT;
            cnt += result;
        }
    }
    // at this point, slot width and first digit determined
    console.log(`slots=${slots} digit=${digit} cnt=${cnt}`);
    const num: Integer[] = findNum(slots, [digit], TARGET, cnt);
    console.log(num);
}

run();

