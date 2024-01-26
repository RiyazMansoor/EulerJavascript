import { Integer, Numbers, Util } from "./common";

function brute6(): void {
    const strNums: string[] = [];
    for (let out = 1; out < 10; out++) {
        const outStr: string = out.toString();
        for (let mid = 0; mid < 10; mid++) {
            const midStr: string = mid.toString();
            for (let inn = 0; inn < 10; inn++) {
                const innStr: string = inn.toString();
            }
        }
    }
    for (let i = 0; i < 10; i++) {
        const inner: string = i.toString().repeat(3);
        for (let j = 1; j < 10; j++) {
            const outer: string = j.toString();
            if (i == j) {
                strNums.push(outer.repeat(3) + inner);
                continue;
            }
            for (let m = 3, n = 0; m > 0; m--, n++) {
                const str: string = outer.repeat(m) + inner + outer.repeat(n);
                strNums.push(str);
            }
        }
    }
    strNums.sort();
    strNums.forEach( num => console.log(num) );
    const strNums0: string[] = strNums.filter( s => s[0] == "0" ).sort();
    const strNums9: string[] = strNums.filter( s => s[0] != "0" ).sort();

    console.log(strNums0.length);
    console.log(strNums0);
    console.log(strNums9.length);
    console.log(strNums9);
}

// depth >= 2
function countPerDigitPerDepth(MaxDepth: Integer, runDepth: Integer = MaxDepth): Integer[] {
    if (runDepth === 2) {
        return  [1, 3 * 9 + 1]; 
    }
    const cntPerDigitPerDepth: Integer[] = countPerDigitPerDepth(MaxDepth, runDepth-1);
    const cntPerDigitLastDepth: Integer = Util.peek(cntPerDigitPerDepth);
    return cntPerDigitPerDepth.concat(1 + (cntPerDigitLastDepth - 1) * 3 * 5/9 + cntPerDigitLastDepth * 3 * 9); // 5/9 is the proportion of unique numbers
}

// brute6();

function runCount(depth: Integer): Integer {
    const results: Integer[] = countPerDigitPerDepth(depth);
    console.log(depth, results);
    let result: Integer = results.pop()! * 9;
    result += Numbers.Sum(results) * 10 - results.length;
    return result;
}
for (let d = 2; d <11; d++) {
    console.log(d, runCount(d));
}
