"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DragonLevel = parseInt(process.argv[2] ?? "10");
const BreakCount = parseInt(process.argv[3] ?? "500");
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
    ypos: 0,
    count: 0,
    direction: DIR.N,
};
const CacheStore = new Map();
function foward() {
    switch (POS.direction) {
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
    if (POS.count == BreakCount) {
        console.log(`${POS.xpos},${POS.ypos}`);
    }
}
function left() {
    switch (POS.direction) {
        case DIR.N:
            POS.direction = DIR.W;
            break;
        case DIR.E:
            POS.direction = DIR.N;
            break;
        case DIR.S:
            POS.direction = DIR.E;
            break;
        case DIR.W:
            POS.direction = DIR.S;
            break;
        default:
            throw "bad direction";
    }
}
function right() {
    switch (POS.direction) {
        case DIR.N:
            POS.direction = DIR.E;
            break;
        case DIR.E:
            POS.direction = DIR.S;
            break;
        case DIR.S:
            POS.direction = DIR.W;
            break;
        case DIR.W:
            POS.direction = DIR.N;
            break;
        default:
            throw "bad direction";
    }
}
function stepper(depth, spath) {
    // check cache
    let cpos = CacheStore.get(spath)?.get(POS.direction)?.get(depth);
    if (cpos && (POS.count + cpos.count) < BreakCount) {
        console.log(`path=${spath} dir=${cpos.direction} depth=${depth} count=${cpos.count}`);
        POS.xpos += cpos.xpos;
        POS.ypos += cpos.ypos;
        POS.count += cpos.count;
        POS.direction = cpos.direction;
        return;
    }
    // prepare for caching
    cpos = { ...POS };
    const startdir = cpos.direction;
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
        if (POS.count >= BreakCount)
            break;
    }
    if (!CacheStore.get(spath)?.get(startdir)?.get(depth)) {
        cpos.xpos = POS.xpos - cpos.xpos;
        cpos.ypos = POS.ypos - cpos.ypos;
        cpos.count = POS.count - cpos.count;
        cpos.direction = POS.direction;
        CacheStore.get(spath)?.get(startdir)?.set(depth, cpos);
    }
}
function e220() {
    const amap = new Map();
    amap.set(DIR.N, new Map());
    amap.set(DIR.E, new Map());
    amap.set(DIR.S, new Map());
    amap.set(DIR.W, new Map());
    CacheStore.set(StrPath.A, amap);
    const bmap = new Map();
    bmap.set(DIR.N, new Map());
    bmap.set(DIR.E, new Map());
    bmap.set(DIR.S, new Map());
    bmap.set(DIR.W, new Map());
    CacheStore.set(StrPath.A, bmap);
    POS.direction = DIR.N;
    foward();
    stepper(DragonLevel, StrPath.A);
    console.log(`walked`);
    console.log(POS);
}
e220();
//# sourceMappingURL=220.js.map