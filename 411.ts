

import { Integer } from "./common";


type Point = { 
    x: Integer, 
    y: Integer, 
    next: Point[], 
    value: Integer 
}

const ORIGIN: Point = { x: 0, y: 0, next: [], value: 0 }

function resetValue(points: Point[]): void {
    points.forEach( p => p.value = -1 );
}

function toStr(p: Point): string {
    return `(${p.x},${p.y})`;
}

function toStrWithNext(p: Point): string {
    const nextPoints: string = p.next.reduce( (pv, cv) => `${pv}${toStr(cv)}|`, "" );
    return `${toStr(p)}==>|${nextPoints}`;
}

function isEqual(p1: Point, p2: Point): boolean {
    return p1.x == p2.x && p1.y == p2.y;
}

function removeDuplicates(points: Point[]): Point[] {
    points.sort( (p1, p2) => p2.x - p1.x || p2.y - p1.y );
    return points.filter( (p, i) => i + 1 == points.length || !isEqual(p, points[i + 1]) );
}

function generatePoints(N: Integer): Point[] {
    let points: Point[] = [ ORIGIN, { x: 1, y: 1, next: [], value: 0 } ];
    let prevPoint: Point = points[1];
    for (let i = 1; i <= 2 * N; i++) {
        const point: Point = {
            x: (2 * prevPoint.x) % N,
            y: (3 * prevPoint.y) % N,
            next: [],
            value: -1
        }
        points.push(point);
        prevPoint = point;
    }
    points = removeDuplicates(points);
    console.log(`generated 2N=${2*N} points, removed duplicates rem=${points.length}`);
    return points;
}

function reachable(from: Point, to: Point): boolean {
    return to.x >= from.x && to.y >= from.y;
}

function insertedAlready(newPoint: Point, curPoints: Point[]): boolean {
    const len: Integer = curPoints.length;
    const duplicated: boolean = (len > 0) && isEqual(curPoints[len-1], newPoint);
    return duplicated;
}

function nextReachablePointsTraversed(fromPoint: Point, newPoint: Point): boolean {
    return fromPoint.next.filter( p => p.value == newPoint.value ).length > 0;
}

function nextReachablePoints(fromPoint: Point, newPoint: Point): Point[] {
    const points: Point[] = fromPoint.next.filter( p => p.value != newPoint.value && reachable(p, newPoint) );
    points.forEach( p => p.value = newPoint.value );
    return points;
}

function nextUnreachablePoints(fromPoint: Point, newPoint: Point): Point[] {
    const points: Point[] = fromPoint.next.filter( p => p.value != newPoint.value && reachable(newPoint, p) );
    points.forEach( p => p.value = newPoint.value );
    return points;
}

// function nextPoints(fromPoint: Point, tag: string): Point[] {
//     const points: Point[] = fromPoint.next.filter( p => p.tag != tag );
//     points.forEach( p => p.tag = tag );
//     return points;
// }

function insert(fromPoint: Point, newPoint: Point): void {
    let nxtReachablePoints: Point[] = nextReachablePoints(fromPoint, newPoint);
    // single branch - loop
    while (nxtReachablePoints.length === 1) {
        const nxtPoint: Point = nxtReachablePoints[0];
        nxtReachablePoints = nextReachablePoints(nxtPoint, newPoint);
        fromPoint = nxtPoint;
    }
    // multi branch - recurse
    let HasPath: boolean = nextReachablePointsTraversed(fromPoint, newPoint);
    for (const nxtReachablePoint of nxtReachablePoints) {
        if (isEqual(nxtReachablePoint, newPoint)) continue;
        if (reachable(nxtReachablePoint, newPoint)) {
            HasPath = true;
            insert(nxtReachablePoint, newPoint);
        }
    }
    // if (!HasPath) {
        for (const nxtUnreachablePoint of nextUnreachablePoints(fromPoint, newPoint)) {
            if (isEqual(nxtUnreachablePoint, newPoint)) continue;
            if (reachable(newPoint, nxtUnreachablePoint)) {
                HasPath = true;
                newPoint.next.push(nxtUnreachablePoint);
                fromPoint.next[fromPoint.next.indexOf(nxtUnreachablePoint)] = newPoint;
                return;
            }
        }
    // }
    // here we add as a sibling to .next (can be empty)
    if (!HasPath && !insertedAlready(newPoint, fromPoint.next)) { 
        fromPoint.next.push(newPoint);
    }
}

function verifyInsert(fromPoint: Point, visitedValue: Integer): void {
    // console.log(toStrWithNext(fromPoint));
    let nextPoints: Point[] = fromPoint.next;
    while (nextPoints.length === 1) {
        const nextPoint: Point = nextPoints[0];
        if (!reachable(fromPoint, nextPoint)) {
            throw `A ${toStr(fromPoint)}==>${toStr(nextPoint)}`;
        }
        nextPoint.value = visitedValue;
        fromPoint = nextPoint;
        nextPoints = fromPoint.next;
    }
    for (let i = 0; i < nextPoints.length; i++) {
        for (let j = i + 1; j < nextPoints.length; j++) {
            if (reachable(nextPoints[i], nextPoints[j]) || reachable(nextPoints[j], nextPoints[i])) {
                throw `B ${toStr(fromPoint)}==>[${toStr(nextPoints[i])}<>${toStr(nextPoints[j])}}`;
            }
        }
    }
    for (const nextPoint of nextPoints) {
        // if (nextPoint.tag == tag) continue;
        nextPoint.value = visitedValue;
        verifyInsert(nextPoint, visitedValue);
    }
}

// const CACHE: Map<string, Integer> = new Map();

// function getCacheValue(fromPoint: Point): Integer {
//     let result = CACHE.get(toStr(fromPoint));
//     if (!result) {
//         result = countMax(fromPoint) + 1;
//         CACHE.set(toStr(fromPoint), result)
//     }
//     return result as Integer;
// }

function countMax(fromPoint: Point): Integer {
    let nxtPoints: Point[] = fromPoint.next;
    if (nxtPoints.length === 0) {
        fromPoint.value = 0;
        return 0;
    }
    // single branch - loop
    let cntSingle: Integer = 0;
    while (nxtPoints.length === 1) {
        cntSingle++;
        const nxtPoint: Point = nxtPoints[0];
        nxtPoints = nxtPoint.next;
        fromPoint = nxtPoint;
    }
    if (nxtPoints.length === 0) return cntSingle;
    // multi branch - recurse
    let cntMulti: Integer = 0;
    for (const nxtPoint of nxtPoints) {
        if (nxtPoint.value < 0) {
            nxtPoint.value = countMax(nxtPoint) + 1;
        }
        cntMulti = Math.max(cntMulti, nxtPoint.value);
    }
    return cntMulti + cntSingle;
}


const ARG2: Integer = parseInt(process.argv[2] ?? "22");

function path(N: Integer): Integer {
    const points: Point[] = generatePoints(N);
    points.slice(1).forEach((p, i) => {
        p.value = i;
        insert(ORIGIN, p);
        if (i % 2500 == 0) console.log(`index=${i} point :: ${toStrWithNext(p)}`);
    });
    resetValue(points);
    return countMax(ORIGIN);
}

function run(): Integer {
    const startTime = new Date().getMilliseconds();
    let cnt: Integer = 0;
    for (let k = 1; k <= 30; k++) {
        let N: Integer = k**5;
        const result: Integer = path(N);
        cnt += result;
        console.log(`k=${k} result=${result} cnt=${cnt}`);
    }
    const endTime = new Date().getMilliseconds();
    console.log(`time elapsed ${(endTime - startTime) / 1000} seconds.`);
    return cnt;
}

function test(): void {
    console.log(`N=22 Result=${path(22)}`);
    console.log(`N=122 Result=${path(123)}`);
    console.log(`N=10000 Result=${path(10000)}`);
}

console.log(test())