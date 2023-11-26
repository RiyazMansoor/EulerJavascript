import { Integer } from "./common";

const CACHE: Map<string, Integer> = new Map();

function countEuclidSteps(x: Integer, y: Integer): Integer {
    let key: string = "", val: Integer;
    let cnt: Integer = 1;
    let xn = y, yn = x % y;
    while (yn != 0) {
        cnt++;
        [xn, yn] = [yn, xn % yn];
        key = `${x},${y}`;
        val = CACHE.get(key) ?? 0;
        
    }
    return cnt;
}

const ARG2: Integer = parseInt(process.argv[2] ?? "10");

function run(): void {
    let cnt: Integer = ARG2;
    for (let x = 1; x <= ARG2; x++) {
        for (let y = x + 1; y <= ARG2; y++) {
            const result: Integer = countEuclidSteps(y, x);
            cnt += result + result + 1;
            console.log(`x=${x} y=${y} result=${result}`);
        }
    }
    console.log(cnt);
}

run();