

import { Integer } from "./common";


type Point = { x: Integer, y: Integer, next: Point[], value: Integer, visited: string }

const ORIGIN: Point = { x: 0, y: 0, next: [], value: 0, visited: "" }

function unvisitPoints(points: Point[]): void {
    points.forEach( p => p.visited = "" );
}

function toStr(p: Point): string {
    return `(${p.x},${p.y})[${p.value}]`;
}

function toStrWithNext(p: Point): string {
    const nextPoints: string = p.next.reduce( (pv, cv) => `${pv}${toStr(cv)}|`, "" );
    return `${toStr(p)}==>|${nextPoints}`;
}

function equalPoints(p1: Point, p2: Point): boolean {
    return p1.x == p2.x && p1.y == p2.y;
}

function removeDuplicates(points: Point[]): Point[] {
    points.sort( (p1, p2) => p1.x - p2.x || p1.y - p2.y );
    return points.filter( (p, i) => i + 1 == points.length || !equalPoints(p, points[i + 1]) );
}

function generatePoints(N: Integer): Point[] {
    const points: Point[] = [ ORIGIN, { x: 1, y: 1, next: [], value: 1, visited: "" } ];
    let prevPoint: Point = points[1];
    for (let i = 1; i <= 2 * N; i++) {
        const point: Point = {
            x: (2 * prevPoint.x) % N,
            y: (3 * prevPoint.y) % N,
            next: [],
            value: 1,
            visited: ""
        }
        points.push(point);
        prevPoint = point;
    }
    return removeDuplicates(points);
}

function reachable(from: Point, to: Point): boolean {
    return to.x >= from.x && to.y >= from.y;
}

function hasDuplicate(point: Point, points: Point[]): boolean {
    const len: Integer = points.length;
    const duplicated: boolean = (len > 0) && (points[len-1] == point);
    return duplicated;
}

function insert(from: Point, to: Point, newPoint: Point): boolean {
    if (equalPoints(newPoint, to)) return false;
    const visitedTag: string = toStr(newPoint);
    if (reachable(to, newPoint)) {
        if (to.visited != visitedTag) {
            // recurse further into path
            to.visited = visitedTag;
            insertAt(to, newPoint);
        }
        return true;
    } 
    if (reachable(newPoint, to)) {
        // insert point here;
        newPoint.next.push(to);
        from.next[from.next.indexOf(to)] = newPoint;
        return true;
    }
    return false;
}

function insertAt(from: Point, newPoint: Point): void {
    const visitedTag: string = toStr(newPoint);
    // single branch will stack (avoid recursion limit)
    while (from.next.length === 1) {
        
    }
    // multi branch must recurse
    let HasPath: boolean = false;
    for (const to of from.next) {
        HasPath = insert(from, to, newPoint) || HasPath;
    }
    // here we add as a sibling to .next (can be empty)
    if (!HasPath && !hasDuplicate(newPoint, from.next)) { 
        from.next.push(newPoint);
    }
}

function insertPoint(from: Point, newPoint: Point): void {
    const visitedTag: string = toStr(newPoint);
    // single branch will stack (avoid recursion limit)
    
    // multi branch must recurse
    let HasPath: boolean = false;
    for (const to of from.next) {
        if (equalPoints(newPoint, to)) {
            continue;
        } 
        if (reachable(to, newPoint)) {
            HasPath = true;
            if (to.visited == visitedTag) continue;
            // recurse further into path
            to.visited = visitedTag;
            insertPoint(to, newPoint);
            continue;
        } 
        if (reachable(newPoint, to)) {
            // insert point here;
            HasPath = true;
            newPoint.next.push(to);
            from.next[from.next.indexOf(to)] = newPoint;
            continue;
        }
    }
    // here we add as a sibling to .next (can be empty)
    if (!HasPath && !hasDuplicate(newPoint, from.next)) { 
        from.next.push(newPoint);
    }
}

function telescopePoints(start: Point): void {
    // console.log(`start=${toStrWithNext(start)}`)
    if (start.next.length === 0) return;
    if (start.next.length === 1) {
        let cnt: Integer = 0;
        let nextArray: Point[] = start.next;
        while (nextArray.length === 1) {
            cnt++;
            nextArray = nextArray[0].next;
        }
        start.value += cnt;
        start.next = nextArray;
        if (start.next.length === 0) return;
    }

    for (const point of start.next) {
        if (point.visited == "yes") continue;
        point.visited = "yes";
        // console.log(`point=${toStrWithNext(point)}`)
        telescopePoints(point);
    }
}

const CountVisited: string = "PCV";
function count(start: Point): Integer {
    // console.log(`start=${toStrWithNext(start)}`);
    if (start.visited == CountVisited) return 0;
    start.visited = CountVisited;
    if (start.next.length == 0) return 1;
    // counter
    let cnt: Integer = 0;
    // single chains - avoid recursion limit
    while (start.next.length === 1 && start.next[0].visited != CountVisited) {
        start = start.next[0];
        start.visited = CountVisited;
        cnt++;
    }
    if (start.next.length === 0 || start.next[0].visited == CountVisited) return cnt;
    cnt++; // current start point
    // multi branch trees
    for (const point of start.next) {
        if (point.visited == CountVisited) continue;
        cnt += count(point);
        point.visited = CountVisited;
    }
    return cnt;
}

const CACHE: Map<string, Integer> = new Map();
function getCache(p: Point): Integer {
    const key: string = toStr(p);
    let cacheVal: Integer = (CACHE.get(key) ?? 0);
    if (!cacheVal) {
        cacheVal = maxPoints(p);
        CACHE.set(key, cacheVal);
    }
    return cacheVal;
}

function maxPoints(start: Point): Integer {
    if (start.next.length === 0) return start.value;
    let max: Integer = 0;
    for (const point of start.next) {
        const pmax: Integer = getCache(point);
        // console.log(`point=${toStrWithNext(point)} stations=${pmax}`);
        max = Math.max(max, pmax);
    }
    return max + start.value;
}

const ARG2: Integer = parseInt(process.argv[2] ?? "22");

export function run(): Integer {
    const startTime = new Date().getMilliseconds();
    const points: Point[] = generatePoints(ARG2);
    console.log(`point count = ${points.length}`);
    points.slice(1).forEach((p, i) => {
        insertPoint(ORIGIN, p);
        if (i % 500 == 0) console.log(`index=${i} point :: ${toStrWithNext(p)}`);
        // console.log(pointToStr(p));
        // points.forEach(p => console.log(pointToStr(p)));    
    });
    unvisitPoints(points);
    console.log("inserted");
    // points.forEach(p => console.log(toStrWithNext(p)));
    telescopePoints(ORIGIN);
    // points.forEach(p => console.log(toStrWithNext(p)));
    console.log(`telescoped origin=${count(ORIGIN)}`);
    unvisitPoints(points);
    let cnt: Integer = maxPoints(ORIGIN);
    const endTime = new Date().getMilliseconds();
    console.log(`time elapsed ${(endTime - startTime) / 1000} seconds.`);
    return cnt;
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