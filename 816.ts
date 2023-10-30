import { Integer } from "./common";

namespace E816 {

    export function findCycle() {
        const START: Integer = 290797;
        const MODULO: Integer = 50515093;
        let result: Integer = START;
        for (let cnt = 2; cnt < 5e6; cnt++) {
            result = (result * result) % MODULO;
            if (result == START) {
                console.log(`cycled cnt=${cnt}`);
                break;
            }
            if (cnt % 100000 == 0) console.log(`cnt=${cnt} ${result}`);
        }
    }

    function distance(p1: Point, p2: Point): number {
        const xdiff: Integer = p1.x - p2.x;
        const ydiff: Integer = p1.y - p2.y;
        return Math.sqrt( xdiff * xdiff + ydiff * ydiff );
    }

    type Point = {
        x: Integer,
        y: Integer
    }

    function getPointsSortedX(num: Integer): Point[] {
        const START: Integer = 290797;
        const MODULO: Integer = 50515093;
        let result: Integer = START;
        result = (result * result) % MODULO;
        const points: Point[] = [ { x: START, y: result } ];
        for (let n = 1; n < num; n++) {
            result = (result * result) % MODULO;
            const xv: Integer = result;
            result = (result * result) % MODULO;
            const yv: Integer = result;
            points.push( { x: xv, y: yv } );
        }
        points.sort( (a, b) => a.x - b.x );
        return points;
    }

    function find(lo: Integer, hi: Integer): number {
        return 0;
    }

}

E816.findCycle();