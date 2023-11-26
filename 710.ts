
// how to scale this solution?

import { Integer, Numbers } from "./common";


function peek(nums: Integer[]): Integer {
    return nums[nums.length - 1];
}

function WithTwo(target: Integer, runVal: Integer = 2, runPath: Integer[] = [2]): bigint {
    // check cache first
    const newTarget: Integer = target - runVal;
    let result = CACHE.get(newTarget);
    if (result) return result;
    // compute if target reached
    if (runVal === target) {
        return Numbers.Permutations(runPath);
    }
    // check all unique paths
    const DigitStart: Integer = runPath.length == 1 ? 1 : peek(runPath);
    let cnt: bigint = 0n;
    for (let digit = DigitStart; true; digit++) {
        const newRunVal: Integer = runVal + digit;
        if (runVal + digit > target) break;
        const newRunPath: Integer[] = runPath.concat(digit)
        cnt += WithTwo(target, newRunVal, newRunPath);
    }
    // cache & return
    CACHE.set(newTarget, cnt);
    return cnt;
}

function WithoutTwo(target: Integer): bigint {
    return 2n ** BigInt(target - 1);
}

const CACHE: Map<Integer, bigint> = new Map();

function DoTarget(target: Integer): bigint {
    const midStart: Integer = (target % 2 === 0) ? 0 : 1;
    let cnt: bigint = 0n;
    for (let mid = midStart; mid < target; mid += 2) {
        const newTarget: Integer = (target - mid) / 2;
        if (mid === 2) {
            cnt += WithoutTwo(newTarget);
        } else {
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

function Run(): void {
    // console.log(DoTarget(6));
    // console.log(DoTarget(20));
    // console.log(DoTarget(42));
    for (let n = 6; true; n++) {
        const Result: bigint = DoTarget(n);
        console.log(`n=${n} result=${Result} cacheSize=${CACHE.size}`);
        if (Result % 1000000n === 0n) {
            console.log("Answer Found above");
            break;
        }
    }
}

Run();
