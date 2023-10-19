"use strict";
var StrPath;
(function (StrPath) {
    StrPath["A"] = "aRbFR";
    StrPath["B"] = "LFaLb";
})(StrPath || (StrPath = {}));
var DIR;
(function (DIR) {
    DIR["N"] = "N";
    DIR["E"] = "E";
    DIR["S"] = "S";
    DIR["W"] = "W";
})(DIR || (DIR = {}));
const POS = {
    xpos: 0,
    ypos: 1,
    face: DIR.N,
    count: 1,
    path: "N",
    chkstr: ""
};
const D = parseInt(process.argv[2] ?? "50");
const BreakAt = parseInt(process.argv[3] ?? "2600000000");
const ChkLen = parseInt(process.argv[4] ?? "9000000");
const Sols = [];
function foward() {
    switch (POS.face) {
        case DIR.N:
            POS.ypos++;
            break;
        case DIR.E:
            POS.xpos++;
            break;
        case DIR.S:
            POS.ypos--;
            break;
        case DIR.W:
            POS.xpos--;
            break;
        default:
            throw "bad direction";
    }
    POS.count++;
    // POS.path += DIR[POS.face];
    // if (POS.count == ChkLen) {
    //     POS.chkstr = POS.path;
    //     POS.path = "";
    // }
    // const bufflen: number = 4 * ChkLen;
    // if (POS.path.length == bufflen) {
    //     const ind: number = POS.path.indexOf(POS.chkstr);
    //     console.log(`count=${POS.count} chklen=${ChkLen} foundIndex=${ind} absIndex=${POS.count - bufflen + ind}`);
    //     if (ind > 0) {
    //         Sols.push(POS.count - bufflen + ind);
    //         console.log(Sols);
    //     }
    //     POS.path = POS.path.slice(-ChkLen);
    // }
    if (POS.count % 301989888 == 0) {
        console.log(`${POS.count}`);
        console.log(`${POS.xpos},${POS.ypos}`);
    }
    if (POS.count == BreakAt) {
        console.log(`${POS.xpos},${POS.ypos}`);
    }
}
function left() {
    switch (POS.face) {
        case DIR.N:
            POS.face = DIR.W;
            break;
        case DIR.E:
            POS.face = DIR.N;
            break;
        case DIR.S:
            POS.face = DIR.E;
            break;
        case DIR.W:
            POS.face = DIR.S;
            break;
        default:
            throw "bad direction";
    }
}
function right() {
    switch (POS.face) {
        case DIR.N:
            POS.face = DIR.E;
            break;
        case DIR.E:
            POS.face = DIR.S;
            break;
        case DIR.S:
            POS.face = DIR.W;
            break;
        case DIR.W:
            POS.face = DIR.N;
            break;
        default:
            throw "bad direction";
    }
}
function stepper(depth, spath) {
    for (const char of spath) { // TODO spath to string ?
        switch (char) {
            case "F":
                foward();
                break;
            case "a":
                if (depth == 0) {
                    // ignore
                }
                else {
                    stepper(depth - 1, StrPath.A);
                }
                break;
            case "R":
                right();
                break;
            case "b":
                if (depth == 0) {
                    // ignore
                }
                else {
                    stepper(depth - 1, StrPath.B);
                }
                break;
            case "L":
                left();
                break;
            default:
                throw "errorX";
        }
        if (POS.count >= BreakAt)
            break;
    }
}
function e220() {
    stepper(D, StrPath.A);
    console.log(`walked`);
    /*
    const steps: string = POS.path;
    // find length of repeat pattern
    let foundlen: number = -1;
    for (let chklen = 200000; chklen < steps.length/2; chklen += 200000) {
        const chkstr: string = steps.slice(0, chklen);
        const fndlen: number = steps.indexOf(chkstr, chklen);
        console.log(`first match at ${fndlen} for chklen=${chklen}`)
        if (fndlen < 0) {
            // numbers too big - assume last found length is the cycle.
            break;
        }
        // verify
        const same: number = chkstr.localeCompare(steps.slice(fndlen*2, fndlen));
        if (same == 0) {
            foundlen = fndlen;
            break;
        }
        foundlen = fndlen;
    }
    console.log(foundlen);
    const fndb: bigint = BigInt(foundlen);
    const maxb: bigint = 10n**12n;
    const intb: bigint = maxb / fndb;
    const remb: bigint = maxb - (intb * fndb);
    console.log(intb, remb);

    */
}
e220();
