"use strict";
// how to scale this solution?
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
function peek(nums) {
    return nums[nums.length - 1];
}
function WithTwo(target, runVal = 2, runPath = [2]) {
    // check cache first
    const newTarget = target - runVal;
    let result = CACHE.get(newTarget);
    if (result)
        return result;
    // compute if target reached
    if (runVal === target) {
        return common_1.Numbers.Permutations(runPath);
    }
    // check all unique paths
    const DigitStart = runPath.length == 1 ? 1 : peek(runPath);
    let cnt = 0n;
    for (let digit = DigitStart; true; digit++) {
        const newRunVal = runVal + digit;
        if (runVal + digit > target)
            break;
        const newRunPath = runPath.concat(digit);
        cnt += WithTwo(target, newRunVal, newRunPath);
    }
    // cache & return
    CACHE.set(newTarget, cnt);
    return cnt;
}
function WithoutTwo(target) {
    return 2n ** BigInt(target - 1);
}
const CACHE = new Map();
function DoTarget(target) {
    const midStart = (target % 2 === 0) ? 0 : 1;
    let cnt = 0n;
    for (let mid = midStart; mid < target; mid += 2) {
        const newTarget = (target - mid) / 2;
        if (mid === 2) {
            cnt += WithoutTwo(newTarget);
        }
        else {
            let result = CACHE.get(newTarget);
            if (!result) {
                result = WithTwo(newTarget);
                CACHE.set(newTarget, result);
            }
            cnt += result;
        }
    }
    return cnt;
}
function Run() {
    // console.log(DoTarget(6));
    // console.log(DoTarget(20));
    // console.log(DoTarget(42));
    for (let n = 6; true; n++) {
        const Result = DoTarget(n);
        console.log(`n=${n} result=${Result} cacheSize=${CACHE.size}`);
        if (Result % 1000000n === 0n) {
            console.log("Answer Found above");
            break;
        }
    }
}
Run();
//# sourceMappingURL=710.js.map