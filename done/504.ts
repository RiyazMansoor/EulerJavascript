
// answer 694687

import { Integer, Numbers } from "../common";

namespace E504 {

    const M: Integer = parseInt(process.argv[2] ?? "4");

    type Point = { x: Integer, y: Integer }

    type Triangle = { area: number, bpts: Integer }
    const Matrix: Triangle[][] = Array(M+1).fill(null).map(() => Array(M+1));

    // calculates boundary lattice points and area for the triangle (0,0) (0, y) (x, 0)
    function populate(x: Integer, y: Integer): void {
        let bpts: Integer = 0;
        // boundary point count
        const mhcf: Integer = Numbers.GCD(y, x);
        const denom: Integer = x / mhcf; // denominator of reduce m in y = mx + c
        for (let xval = 1; xval < x; xval++) {
            if (xval % denom === 0) bpts++;
        }
        bpts++; // add one end point on axis
        // area
        const area: number = x * y / 2;
        // populate matrix
        Matrix[x][y] = { area: area, bpts: bpts }
    }

    function calculate(xE: Integer, yS: Integer, xW: Integer, yN: Integer): Integer {
        const t1: Triangle = Matrix[xE][yN];
        const t2: Triangle = Matrix[xW][yN];
        const t3: Triangle = Matrix[xW][yS];
        const t4: Triangle = Matrix[xE][yS];
        const area: number = t1.area + t2.area + t3.area + t4.area;
        const bpts: Integer = t1.bpts + t2.bpts + t3.bpts + t4.bpts;
        return area + 1 - bpts/2;
    }

    export function run(): Integer {
        const timestart: Integer = new Date().getTime();
        // for one quadrant - populates the area and boundary pints on (x,0)(0,y) line
        for (let x = 1; x <= M; x++) {
            for (let y = 1; y <= M; y++) {
                populate(x, y);
            }
        }
        let timeend: Integer = new Date().getTime();
        console.log(`Completed populating matrix ${(timeend-timestart)/1000} seconds;`);
        // calculate for 4 quadrants
        let cnt: Integer = 0;
        for (let xE = 1; xE <= M; xE++) {
            for (let yS = 1; yS <= M; yS++) {
                for (let xW = 1; xW <= M; xW++) {
                    for (let yN = 1; yN <= M; yN++) {
                        const pointCount: Integer = calculate(xE, yS, xW, yN);
                        const root: Integer = Math.floor(Math.sqrt(pointCount));
                        if (root * root == pointCount) cnt++;
                    }
                }
            }
        }
        timeend = new Date().getTime();
        console.log(`Complete in ${(timeend-timestart)/1000} seconds;`);
        return cnt;
    }

}

console.log(E504.run());

