// number that meet criteria 2130015017428935929n
// but how to add so many numbers ??

import { Integer, Numbers } from "./common";

function squares(upto: Integer): Integer[] {
    const result: Integer[] = [];
    for (let i = 1; i*i < upto; i++) {
        result.push(i*i);
    }
    return result;
}
const Targets: Integer[] = squares(9*9*20);

const SlotVals: Integer[] = Array(10).fill(0).map( (v, i) => i );

function combinations(slots: Integer, runVal: Integer, runPath: Integer[]): bigint {
    if (runPath.length == slots) {
        if (Targets.includes(runVal)) {
            let result: bigint = Numbers.Permutations(runPath.slice(1));
            console.log(`runVal=${runVal}, result=${result} runPath=${runPath.toLocaleString()}`);
            return result;
        }
        return 0n
    }
    let cnt: bigint = 0n;
    const SlotValsIndex: Integer = runPath.length == 1 ? 0 : SlotVals.indexOf(runPath[runPath.length - 1]);
    for (const nextVal of SlotVals.slice(SlotValsIndex)) {
        const result: bigint = combinations(slots, runVal + nextVal**2, runPath.concat([nextVal]));
        cnt += result;
    }
    return cnt;
}

const ARG2: Integer = parseInt(process.argv[2] ?? "4");

function run(): void {
    let cnt: bigint = 9n;
    for (let slots = 2; slots <= ARG2; slots++) {
        for (let digit = 1; digit < 10; digit++) {
            const result: bigint = combinations(slots, digit**2, [digit]);
            cnt += result;
            console.log(`slots=${slots} digit=${digit} result=${result}`);
        }
        console.log(`slots=${slots} cnt=${cnt}`);
    }
    console.log(cnt % 1000000000n);
}

run();