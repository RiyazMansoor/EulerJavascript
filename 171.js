"use strict";
// number that meet criteria 2130015017428935929n
// but how to add so many numbers ??
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
function squares(upto) {
    const result = [];
    for (let i = 1; i * i < upto; i++) {
        result.push(i * i);
    }
    return result;
}
const Targets = squares(9 * 9 * 20);
const SlotVals = Array(10).fill(0).map((v, i) => i);
function combinations(slots, runVal, runPath) {
    if (runPath.length == slots) {
        if (Targets.includes(runVal)) {
            let result = common_1.Numbers.Permutations(runPath.slice(1));
            console.log(`runVal=${runVal}, result=${result} runPath=${runPath.toLocaleString()}`);
            return result;
        }
        return 0n;
    }
    let cnt = 0n;
    const SlotValsIndex = runPath.length == 1 ? 0 : SlotVals.indexOf(runPath[runPath.length - 1]);
    for (const nextVal of SlotVals.slice(SlotValsIndex)) {
        const result = combinations(slots, runVal + nextVal ** 2, runPath.concat([nextVal]));
        cnt += result;
    }
    return cnt;
}
const ARG2 = parseInt(process.argv[2] ?? "4");
function run() {
    let cnt = 9n;
    for (let slots = 2; slots <= ARG2; slots++) {
        for (let digit = 1; digit < 10; digit++) {
            const result = combinations(slots, digit ** 2, [digit]);
            cnt += result;
            console.log(`slots=${slots} digit=${digit} result=${result}`);
        }
        console.log(`slots=${slots} cnt=${cnt}`);
    }
    console.log(cnt % 1000000000n);
}
run();
//# sourceMappingURL=171.js.map