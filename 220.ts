
enum StrPath {
    A = "aRbFR",
    B = "LFaLb"
}

enum DIR { 
    N = "N", 
    E = "E", 
    S = "S", 
    W = "W" 
}

const POS = { 
    xpos: 0, 
    ypos: 1, 
    face: DIR.N,
    count: 1,
    path: "N"
 }

const D: number = parseInt(process.argv[2] ?? "10");

const BreakAt: number = parseInt(process.argv[3] ?? "500");

function foward(): void {
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
            throw "bad direction"
    }
    POS.path += DIR[POS.face];
    POS.count++;
    if (POS.count == BreakAt) {
        console.log(POS);
    }
}

function left(): void {
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
            throw "bad direction"
    }
}

function right(): void {
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
            throw "bad direction"
    }
}

function stepper(depth: number, spath: StrPath) {
    for (const char of spath) { // TODO spath to string ?
        switch (char) {
            case "F": 
                foward();
                break;
            case "a":
                if (depth == 0) {
                    // ignore
                } else {
                    stepper(depth - 1, StrPath.A);
                }
                break;
            case "R":
                right();
                break;
            case "b":
                if (depth == 0) {
                    // ignore
                } else {
                    stepper(depth - 1, StrPath.B);
                }
                break;
            case "L":
                left();
                break;
            default:
                throw "errorX";
        }
        if (POS.count >= BreakAt) break;
    }
}

function e220() {
    stepper(D, StrPath.A);
}

e220();