"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run2 = void 0;
const common_1 = require("./common");
const OPTIONS = 26;
const OPTIONVALS = Array(OPTIONS).fill(0).map((v, i) => i);
function* befStr(befLen, dipVal, solution) {
    const pos = solution.length;
    const optionVals = OPTIONVALS.filter(v => v != dipVal && solution.indexOf(v) < 0);
    if (pos == befLen - 1) {
        // in the last column
        for (const lstVal of optionVals.filter(v => v > dipVal)) {
            yield solution.concat([lstVal]);
        }
    }
    else {
        // NOT in the last column
        for (const nxtVal of optionVals) {
            befStr(befLen, dipVal, solution.concat([nxtVal]));
        }
    }
}
function aftCount(aftLen, dipVal, solution) {
    // if there is no aftStr, then count the befStr
    if (aftLen === 0)
        return 1;
    const gapVals = solution.filter(v => v > dipVal);
    const optionVals = OPTIONVALS.filter(v => v != dipVal && solution.indexOf(v) < 0);
    return 0;
}
function run() {
    let cnt = 0;
    for (let strLen = 3; strLen < 4; strLen++) {
        for (let dipVal = 0; dipVal < (OPTIONS - 1); dipVal++) {
            for (let dipPos = 1; dipPos < OPTIONS; dipPos++) {
                const befLen = dipPos;
                const aftLen = strLen - dipPos - 1;
            }
        }
    }
    return cnt;
}
function countAft(dipVal, values, slots) {
    if (slots === 0)
        return 0;
    values = values.filter(v => v > dipVal);
    values.sort((a, b) => a - b);
    const missingVals = [];
    for (let i = dipVal + 1; i <= values[values.length - 1]; i++) {
        if (values.indexOf(i) >= 0)
            missingVals.push(i);
    }
    const combs = common_1.Set.Combinations(values.length, slots);
    const combVals = combs.map(sol => {
        return sol.reduce((pv, cv, i) => {
            const max = OPTIONS - slots + 1 + i;
            const min = values[cv];
            const cnt = missingVals.reduce((pv, cv) => pv + (max >= cv && cv >= min ? 1 : 0), 0);
            const len = max - min - cnt;
            return pv * (len > 0 ? len : 0);
        }, 1);
    });
    return combVals.reduce((pv, cv) => pv + cv, 0);
}
console.log(countAft(20, [9, 20, 21, 22, 23], 2));
// canche of Map<LENGTH, Map<START, Count>>
const CACHE = new Map();
function countAllFixedLength(pos, trekked, LENGTH) {
    if (pos == LENGTH) {
        // console.log(trekked);
        return 1;
    }
    const startVal = 1 + (trekked[trekked.length - 1] ?? 0);
    const remLen = LENGTH - pos;
    if (!CACHE.has(remLen)) {
        CACHE.set(remLen, new Map());
    }
    const cache = CACHE.get(remLen);
    let cnt = cache.get(startVal) ?? -1;
    if (cnt < 0) {
        cnt = 0;
        for (let num = startVal; num <= OPTIONS; num++) {
            cnt += countAllFixedLength(pos + 1, trekked.concat([num]), LENGTH);
        }
        cache.set(startVal, cnt);
        // console.log(cnt);
    }
    return cnt;
}
function trek(pos, trekked, length, trekOptions, dipped) {
    if (pos == length) {
        let dips = 0;
        trekked.forEach((v, i) => {
            if (v < trekked[i - 1] ?? -1)
                dips++;
        });
        if (dips > 1) {
            console.log(trekked);
            throw `multi dips`;
            // return 0;
        }
        else if (dips == 1) {
            // console.log(trekked);
            return 1;
        }
        else {
            // console.log("dips 0 :: ", trekked);
            return 0;
        }
    }
    const lastVal = trekked[trekked.length - 1] ?? -1;
    let cnt = 0;
    for (const num of trekOptions) {
        let newDipped = dipped;
        let newOptions = trekOptions.filter(v => v != num);
        if (num < lastVal || dipped) {
            // if (newDipped) console.log(trekked, num, newOptions);
            newDipped = true;
            newOptions = newOptions.filter(v => v > num);
            // if (newDipped) console.log(trekked, num, newOptions);
            if (newOptions.length + 1 < length - pos)
                break;
        }
        cnt += trek(pos + 1, trekked.concat([num]), length, newOptions, newDipped);
    }
    return cnt;
}
function run2() {
    const options = Array(26).fill(1).map((v, i) => v + i);
    for (let i = 3; i <= OPTIONS; i++) {
        console.log(i, trek(0, [], i, options, false));
    }
    // console.log(CACHE);
}
exports.run2 = run2;
//# sourceMappingURL=158.js.map