"use strict";
// answer 694687
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
var E504;
(function (E504) {
    const M = parseInt(process.argv[2] ?? "4");
    const Matrix = Array(M + 1).fill(null).map(() => Array(M + 1));
    // calculates boundary lattice points and area for the triangle (0,0) (0, y) (x, 0)
    function populate(x, y) {
        let bpts = 0;
        // boundary point count
        const mhcf = common_1.Numbers.GCD(y, x);
        const denom = x / mhcf; // denominator of reduce m in y = mx + c
        for (let xval = 1; xval < x; xval++) {
            if (xval % denom === 0)
                bpts++;
        }
        bpts++; // add one end point on axis
        // area
        const area = x * y / 2;
        // populate matrix
        Matrix[x][y] = { area: area, bpts: bpts };
    }
    function calculate(xE, yS, xW, yN) {
        const t1 = Matrix[xE][yN];
        const t2 = Matrix[xW][yN];
        const t3 = Matrix[xW][yS];
        const t4 = Matrix[xE][yS];
        const area = t1.area + t2.area + t3.area + t4.area;
        const bpts = t1.bpts + t2.bpts + t3.bpts + t4.bpts;
        return area + 1 - bpts / 2;
    }
    function run() {
        const timestart = new Date().getTime();
        // for one quadrant - populates the area and boundary pints on (x,0)(0,y) line
        for (let x = 1; x <= M; x++) {
            for (let y = 1; y <= M; y++) {
                populate(x, y);
            }
        }
        let timeend = new Date().getTime();
        console.log(`Completed populating matrix ${(timeend - timestart) / 1000} seconds;`);
        // calculate for 4 quadrants
        let cnt = 0;
        for (let xE = 1; xE <= M; xE++) {
            for (let yS = 1; yS <= M; yS++) {
                for (let xW = 1; xW <= M; xW++) {
                    for (let yN = 1; yN <= M; yN++) {
                        const pointCount = calculate(xE, yS, xW, yN);
                        const root = Math.floor(Math.sqrt(pointCount));
                        if (root * root == pointCount)
                            cnt++;
                    }
                }
            }
        }
        timeend = new Date().getTime();
        console.log(`Complete in ${(timeend - timestart) / 1000} seconds;`);
        return cnt;
    }
    E504.run = run;
})(E504 || (E504 = {}));
console.log(E504.run());
