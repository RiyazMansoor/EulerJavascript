
// type Integer = number;

import { Integer } from "./common";

enum Result { NotEvaluated, SureWin, CanWinCanLose, SureLose }
const LIMIT: Integer = parseInt(process.argv[2] ?? "50");
const Results: Result[] = Array(LIMIT+1).fill(Result.NotEvaluated);


function play(len: Integer): void {
    const mid: Integer = Math.floor(len/2);
    let sureWin: boolean = false, sureLose: boolean = false;
    for (let pos: Integer = 0; pos < mid; pos++) {
        const befLen: Integer = pos;
        const aftLen: Integer = len - (pos + 2);
        if ((Results[befLen] == Result.SureLose) && (Results[aftLen] == Result.SureLose)) {
            sureWin = true;
            continue;
        }
        if ((Results[befLen] == Result.SureWin) && (Results[aftLen] == Result.SureWin)) {
            sureLose = true;
            continue;
        }
        // if ((Results[befLen] == Result.SureWin) != (Results[aftLen] == Result.SureWin)) {
        //     sureLose = true;
        // }
    }
    if (sureWin && sureLose) {
        Results[len] = Result.CanWinCanLose;
    } else if (sureWin) {
        Results[len] = Result.SureWin;
    } else if (sureLose) {
        Results[len] = Result.SureLose;
    } else {
        throw 'error no win no lose';
    }
}

function run(): void {
    Results[0] = Result.SureLose;
    Results[1] = Result.SureLose;
    Results[2] = Result.SureWin;
    for (let n: Integer = 3; n <= LIMIT; n++) {
        play(n);
        console.log(n, Result[Results[n]]);
    }
    let cnt: Integer = 0;
    for (let n = 1; n <= LIMIT; n++) {
        if (Results[n]) cnt++;
    }
    console.log(cnt);
}

run();
