
// answer = 20.880613018

import { Integer, Numbers } from "../common";


const ARG2: Integer = parseInt(process.argv[2] ?? "14");

type Point = {
    x: Integer,
    y: Integer
}

function distance(p1: Point, p2: Point): number {
    const xdiff: Integer = p1.x - p2.x;
    const ydiff: Integer = p1.y - p2.y;
    return Math.sqrt(xdiff * xdiff + ydiff * ydiff);
}

function getPoints(num: Integer): Point[] {
    const START: Integer = 290797;
    const MODULO: Integer = 50515093;
    let xval, yval: Integer = (START * START) % MODULO;
    const points: Point[] = [ { x: START, y: yval } ];
    for (let n = 1; n < num; n++) {
        xval = (yval * yval) % MODULO;
        yval = (xval * xval) % MODULO;
        points.push({ x: xval, y: yval });
    }
    points.sort((a, b) => a.x - b.x || a.y - b.y);
    return points;
}

function minimum(points: Point[]): number {
    let min: number = 1e10;
    for (let i = 0; i < points.length; i++) {
        for (let j = i+1; j < points.length; j++) {
            min = Math.min(min, distance(points[i], points[j]));
        }
    }
    return min;
}

function find(xval: Integer, points: Point[]): Integer {
    const nums: Integer[] = points.map( p => p.x );
    return Numbers.indexOfSorted(xval, nums);
}

function run(): string {
    const points: Point[] = getPoints(ARG2);
    const xmin: Integer = points[0].x;
    const xmax: Integer = points[points.length-1].x;
    const xdelta: Integer = Math.floor((xmax - xmin)/200);
    console.log(`xmax=${xmax} xmin=${xmin} xdelta=${xdelta}`);
    let min: number = minimum(points.slice(0, 1000));
    for (let wstart = xmin; wstart < xmax; wstart += xdelta - min - 20) {
        const sttInd: Integer = find(wstart, points);
        const endInd: Integer = find(wstart+xdelta, points);
        console.log(`wstt=${wstart} stt=${sttInd} end=${endInd} min=${min}`);
        min = Math.min(min, minimum(points.slice(sttInd, endInd)));
    }
    return min.toFixed(9);
}

console.log(run());


/*
function findCycle() {
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

findCycle();
*/
