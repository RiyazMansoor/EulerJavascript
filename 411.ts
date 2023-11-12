

import { Integer } from "./common";


type Point = { x: Integer, y: Integer, next: Point[], value: Integer }

const ORIGIN: Point = { x: 0, y: 0, next: [], value: 1 }

function coordToStr(p: Point): string {
    return `(${p.x},${p.y})[${p.value}]`;
}

function pointToStr(p: Point): string {
    const nextPoints: string = p.next.reduce( (pv, cv) => `${pv}${coordToStr(cv)}|`, "" )
    return `${coordToStr(p)} ==> { |${nextPoints} }`;
}

function equalPoints(p1: Point, p2: Point): boolean {
    return p1.x == p2.x && p1.y == p2.y;
}

function uniquePoints(points: Point[]): Point[] {
    points.sort( (p1, p2) => p1.x - p2.x || p1.y - p2.y );
    return points.filter((p, i) => i + 1 == points.length || !equalPoints(p, points[i + 1]) );
}

function stationPoints(N: Integer): Point[] {
    const points: Point[] = [{ x: 1, y: 1, next: [], value: 1 }];
    let prevPoint: Point = points[0];
    for (let i = 1; i <= 2 * N; i++) {
        const point: Point = {
            x: (2 * prevPoint.x) % N,
            y: (3 * prevPoint.y) % N,
            next: [],
            value: 1
        }
        points.push(point);
        prevPoint = point;
    }
    return uniquePoints(points);
}

function reachable(p1: Point, p2: Point): boolean {
    return p2.x >= p1.x && p2.y >= p1.y;
}

function addPoint(searchPoint: Point, newPoint: Point): void {
    // console.log(pointToStr(searchPoint), pointToStr(newPoint));
    // if (searchPoint.next.length === 0) {
    //     searchPoint.next.push(newPoint);
    //     return;
    // }
    let HasPath: boolean = false;
    for (const nextPoint of searchPoint.next) {
        if (equalPoints(newPoint, nextPoint)) {
            continue;
        } else if (reachable(nextPoint, newPoint)) {
            // recurse further into path
            HasPath = true;
            addPoint(nextPoint, newPoint);
        } else if (reachable(newPoint, nextPoint)) {
            // insert point here;
            HasPath = true;
            newPoint.next.push(nextPoint);
            searchPoint.next[searchPoint.next.indexOf(nextPoint)] = newPoint;
        }
    }
    if (!HasPath) {
        searchPoint.next.push(newPoint);
        console.log("fallback",pointToStr(searchPoint), pointToStr(newPoint))
    }
}

function maxPoints(start: Point): Integer {
    if (start.next.length === 0) return 1;
    let max: Integer = 0;
    for (const point of start.next) {
        const pmax: Integer = maxPoints(point) + 1;
        max = Math.max(max, pmax);
    }
    return max;
}

const ARG2: Integer = parseInt(process.argv[2] ?? "22");

export function run(): Integer {
    const startTime = new Date().getMilliseconds();
    const points: Point[] = stationPoints(ARG2);
    // points.forEach(p => console.log(pointToStr(p)))
    points.forEach(p => {
        addPoint(ORIGIN, p);
        console.log(pointToStr(p));
        // points.forEach(p => console.log(pointToStr(p)));    
    });
    points.forEach(p => console.log(pointToStr(p)));
    // let cnt: Integer = maxPoints(ORIGIN) - 1;
    const endTime = new Date().getMilliseconds();
    console.log(`time elapsed ${(endTime - startTime) / 1000} seconds.`);
    return 0;
}

/*
    function generatePaths(points: Point[]): Point[] {
        points.sort( (p1, p2) => p1.x - p2.x || p1.y - p2.y );
        for (let pIndex = 1; pIndex < points.length; pIndex++) {
            const newPoint: Point = points[pIndex];
            for (let pSubIndex = 0; pSubIndex < pIndex; pSubIndex++) {
                const runPoint: Point = points[pSubIndex];
                if (!reachable(runPoint, newPoint)) continue;
                const canRemove: Point[] = Array.from(runPoint.nextPoints).filter( rpNextPoint => reachable(newPoint, rpNextPoint) );
                canRemove.forEach( rpNextPoint => runPoint.nextPoints.delete(rpNextPoint) );
                if (canRemove.length > 0) {
                    runPoint.nextPoints.add(newPoint);
                } else {
                    const canReach: boolean = Array.from(runPoint.nextPoints).some( rpNextPoint => reachable(rpNextPoint, newPoint) );
                    if (!canReach) {
                        runPoint.nextPoints.add(newPoint);
                    }
                }
            }
        }
        points.forEach( p => console.log(pointStr2(p)) );
        console.log(`Generated paths`);
        return points;
    }
    const CACHE: Map<string, Integer> = new Map();
    function getCache(p: Point): Integer {
        let cacheVal: Integer = CACHE.get(pointStr(p)) as Integer;
        if (!cacheVal) {
            cacheVal = findMaxPath(p) + 1;
            CACHE.set(pointStr(p), cacheVal);
        } else {
            console.log(`from cache :: point=${pointStr2(p)} cacheVal=${cacheVal}`);
        }
        return cacheVal;
    }
    function setCache(p: Point, val: Integer): void {
        CACHE.set(pointStr(p), val);
    }

    function findMaxPath(p: Point): Integer {
        let hopMax: Integer = 0;
        for (const np of p.nextPoints) {
            let cacheVal: Integer = getCache(np);
            hopMax = Math.max(hopMax, cacheVal);
        }
        return hopMax;
    }

    const ARG2: Integer = parseInt(process.argv[2] ?? "22");

    export function run(): Integer {
        const startTime = new Date().getMilliseconds();
        const points: Point[] = stationPoints(ARG2);
        generatePaths(points);
        CACHE.clear();
        points.forEach( p => setCache(p, p.nextPoints.size === 0 ? 1 : 0));
        let cnt: Integer = findMaxPath(points[0]);
        console.log(CACHE);
        const endTime = new Date().getMilliseconds();
        console.log(`time elapsed ${(endTime - startTime) / 1000} seconds.`);
        return cnt;
    }
*/


console.log(run())