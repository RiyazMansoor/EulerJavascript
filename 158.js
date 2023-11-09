"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var E158;
(function (E158) {
    const ALPHABETS = 26;
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
            for (let num = startVal; num <= ALPHABETS; num++) {
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
    function run() {
        const options = Array(26).fill(1).map((v, i) => v + i);
        for (let i = 3; i <= ALPHABETS; i++) {
            console.log(i, trek(0, [], i, options, false));
        }
        // console.log(CACHE);
    }
    E158.run = run;
})(E158 || (E158 = {}));
E158.run();
