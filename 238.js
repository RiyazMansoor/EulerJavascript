"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BLUM_ZERO = 14025256;
const BLUM_DENO = 20300713;
function blum_cycle() {
    let count = 1;
    let blum = BLUM_ZERO;
    while (true) {
        blum = (blum * blum) % 20300713;
        if (blum == BLUM_ZERO)
            break;
        count++;
    }
    return count;
}
// cycle size for blum random generator == 2534198
const BLUM_CYCLE = blum_cycle();
// sum of all digits in a cycle 80846691
// sum_of_digits_as_index = string_start_position
const Start_Position = new Array(BLUM_CYCLE + 1).fill(-1);
function sum_start_positions(toIndex) {
    return Start_Position.slice(1, toIndex + 1).reduce((p, c) => p + (c < 0 ? 0 : c), 0);
}
function* blum_gen() {
    let blum = 14025256;
    for (let cnt = 0; cnt < BLUM_CYCLE; cnt++) {
        if (cnt) {
            blum = (blum * blum) % 20300713;
        }
        yield blum;
    }
    return -1;
}
const POSITIONS = [
    1, 2, 3, 5, 6, 7, 8, 9,
    10, 11, 12, 14, 15, 16, 17, 18,
    19, 20, 23, 24, 26, 27, 28, 29,
    30, 31, 32
];
function blum_thru() {
    const rand_gen_cnt = 200000;
    for (const start_pos of POSITIONS) {
        const rand = blum_gen();
        let char_cnt = 0;
        let digitsum = 0;
        while (true) {
            const rand_val = rand.next().value;
            if (rand_val < 0)
                break;
            for (const char of rand_val.toString()) {
                char_cnt++;
                if (char_cnt < start_pos)
                    continue;
                const digit = parseInt(char);
                digitsum += digit;
                if (Start_Position[digitsum] < 0 || Start_Position[digitsum] > start_pos) {
                    Start_Position[digitsum] = start_pos;
                }
            }
        }
        console.log(`start_pos=${start_pos} char_cnt=${char_cnt} digit_sum=${digitsum}`);
    }
    console.log(sum_start_positions(1000));
    console.log(Start_Position.slice(1, 1001).filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => a - b));
}
blum_thru();
const PATHS = 74;
const Status = {
    min_k: 1000,
    paths: new Array(PATHS + 1).fill(0),
    min_path: new Array(BLUM_CYCLE + 1).fill(0),
};
function status_process() {
    let min_tmp = 1e10;
    for (let path = 1; path <= PATHS; path++) {
        const val = Status.paths[path];
        if (val < min_tmp)
            min_tmp = val;
        if (!Status.min_path[val])
            Status.min_path[val] = path + 1;
    }
    Status.min_k = min_tmp;
}
function e238() {
    const rand = blum_gen();
    let char_cnt = 0;
    for (let randi = 0; randi < 10; randi++) {
        const blum = rand.next().value;
        for (const char of blum.toString()) {
            const digit = parseInt(char);
            for (let cnt = 1; cnt <= char_cnt + 1; cnt++) {
                Status.paths[cnt] += digit;
                const val = Status.paths[cnt];
                if (!val)
                    continue;
                if (!Status.min_path[val])
                    Status.min_path[val] = cnt;
            }
            char_cnt++;
        }
    }
    console.log(Status.min_path.slice(1, PATHS + 1));
    console.log(Status.paths);
    while (true) {
        const blum = rand.next().value;
        if (blum < 0)
            break;
        for (const char of blum.toString()) {
            const digit = parseInt(char);
            for (let path = 1; path <= PATHS; path++) {
                Status.paths[path] += digit;
                const val = Status.paths[path];
                if (!val)
                    continue;
                if (!Status.min_path[val])
                    Status.min_path[val] = path + 1;
            }
            char_cnt++;
        }
    }
    const ans = Status.min_path.slice(0, 1001).reduce((p, c) => p + c, 0);
    console.log(ans);
}
// e238();
//# sourceMappingURL=238.js.map