
import { Integer, Set } from "./common";

const OPTIONS: Integer = 26;
const OPTIONVALS: Integer[] = Array(OPTIONS).fill(0).map( (v, i) => i );

function* befStr(befLen: Integer, dipVal: Integer, solution: Integer[]) {
    const pos: Integer = solution.length;
    const optionVals: Integer[] = OPTIONVALS.filter( v => v != dipVal && solution.indexOf(v) < 0);
    if (pos == befLen - 1) {
        // in the last column
        for (const lstVal of optionVals.filter( v => v > dipVal )) {
            yield solution.concat([lstVal]);
        }
    } else {
        // NOT in the last column
        for (const nxtVal of optionVals) {
            befStr(befLen, dipVal, solution.concat([nxtVal]));
        }
    }
}

function aftCount(aftLen: Integer, dipVal: Integer, solution: Integer[]): Integer {
    // if there is no aftStr, then count the befStr
    if (aftLen === 0) return 1;
    const gapVals: Integer[] = solution.filter( v => v > dipVal );
    const optionVals: Integer[] = OPTIONVALS.filter( v => v != dipVal && solution.indexOf(v) < 0);
    return 0;
}

function run(): Integer {
    let cnt: Integer = 0;
    for (let strLen = 3; strLen < 4; strLen++) {
        for (let dipVal = 0; dipVal < (OPTIONS - 1); dipVal++) {
            for (let dipPos = 1; dipPos < OPTIONS; dipPos++) {
                const befLen: Integer = dipPos;
                const aftLen: Integer = strLen - dipPos - 1;
            }
        }
    }
    return cnt;
}



function countAft(dipVal: Integer, values: Integer[], slots: Integer): Integer {
    if (slots === 0) return 0;
    values = values.filter( v => v > dipVal );
    values.sort( (a, b) => a - b );
    const missingVals: Integer[] = [];
    for (let i = dipVal + 1; i <= values[values.length-1]; i++) {
        if (values.indexOf(i) >= 0) missingVals.push(i);
    }
    const combs: Integer[][] = Set.Combinations(values.length, slots);
    const combVals: Integer[] = combs.map( sol => {
        return sol.reduce( (pv, cv, i) => {
            const max: Integer = OPTIONS - slots + 1 + i;
            const min: Integer = values[cv];
            const cnt: Integer = missingVals.reduce( (pv, cv) => pv + (max >= cv && cv >= min ? 1 : 0), 0 );
            const len: Integer = max - min - cnt;
            return pv * (len > 0 ? len : 0); 
        }, 1);
    });
    return combVals.reduce( (pv, cv) => pv + cv, 0 );
}

console.log(countAft(20, [9,20,21,22,23], 2));


// canche of Map<LENGTH, Map<START, Count>>
const CACHE: Map<Integer, Map<Integer, Integer>> = new Map();

function countAllFixedLength(pos: Integer, trekked:Integer[], LENGTH: Integer): Integer {
    if (pos == LENGTH) {
        // console.log(trekked);
        return 1;
    }
    const startVal: Integer = 1 + (trekked[trekked.length - 1] ?? 0);
    const remLen: Integer = LENGTH - pos;
    if (!CACHE.has(remLen)) {
        CACHE.set(remLen, new Map());
    }
    const cache: Map<Integer, Integer> = CACHE.get(remLen) as Map<Integer, Integer>;
    let cnt: Integer = cache.get(startVal) ?? -1;
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

function trek(pos: Integer, trekked: Integer[], length: Integer, trekOptions: Integer[], dipped: boolean): Integer {
    if (pos == length) {
        let dips: Integer = 0;
        trekked.forEach( (v, i) => {
            if (v < trekked[i-1] ?? -1 ) dips++;
        } );
        if (dips > 1) {
            console.log(trekked);
            throw `multi dips`;
            // return 0;
        } else if (dips == 1) {
            // console.log(trekked);
            return 1;
        } else {
            // console.log("dips 0 :: ", trekked);
            return 0;
        }
    }
    const lastVal: Integer = trekked[trekked.length - 1] ?? -1;
    let cnt: Integer = 0;
    for (const num of trekOptions) {
        let newDipped: boolean = dipped;
        let newOptions: Integer[] = trekOptions.filter( v  => v  != num );
        if (num < lastVal || dipped) {
            // if (newDipped) console.log(trekked, num, newOptions);
            newDipped = true;
            newOptions = newOptions.filter( v => v > num);
            // if (newDipped) console.log(trekked, num, newOptions);
            if (newOptions.length + 1 < length - pos) break;
        }
        cnt += trek(pos + 1, trekked.concat([num]), length, newOptions, newDipped);
    }
    return cnt;
}

export function run2(): void {
    const options: Integer[] = Array(26).fill(1).map( (v, i) => v+i );
    for (let i = 3; i <= OPTIONS; i++) {
        console.log(i, trek(0, [], i, options, false));
    }
    // console.log(CACHE);
}


