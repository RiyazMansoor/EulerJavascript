
type Integer = number;

type Point = {
    xPos: Integer,
    yPos: Integer,
    xIndex: Integer,
    yIndex: Integer,
    nextPoints: Point[],
    aWeight: Integer,
}

function toStr(p: Point): string {
    return `Pos(${p.xPos},${p.yPos}) Index(${p.xIndex},${p.yIndex}) Next(${p.nextPoints.length}) Weight(${p.aWeight})`;
}

function toStrWithNext(p: Point): string {
    const nextPoints: string = p.nextPoints.reduce((pv, cv) => `${pv}${toStr(cv)}|`, "");
    return `${toStr(p)} <==> |${nextPoints}`;
}

function printPoints(points: Point[]): void {
    points.forEach( p => console.log(toStrWithNext(p)) );
    console.log(`...`);
}

function isEqual(p1: Point, p2: Point): boolean {
    return p1.xPos == p2.xPos && p1.yPos == p2.yPos;
}

function preparePoints(points: Point[]): Point[] {
    // remove duplicates and yIndex by y|x sort order
    points.sort( (p1, p2) => p1.yPos - p2.yPos || p1.xPos - p2.xPos );
    points = points.filter( (p, i) => i + 1 == points.length || !isEqual(p, points[i + 1]) );
    points.forEach( (p, i) => p.yIndex = i );
    // xIndex by x/y sort order => this is the main list of points to use
    points.sort( (p1, p2) => p1.xPos - p2.xPos || p1.yPos - p2.yPos );
    points.forEach( (p, i) => p.xIndex = i );
    return points;
}

function isReachable(from: Point, to: Point): boolean {
    return to.xPos >= from.xPos && to.yPos >= from.yPos;
}

// function descendPoints(fromPoint: Point, newPoint: Point): Point[] {
//     const points: Point[] = fromPoint.nextPoints.filter(p => p.aWeight != newPoint.aWeight && isReachable(newPoint, p));
//     points.forEach(p => p.aWeight = newPoint.aWeight);
//     return points;
// }

function resetPointValues(points: Point[]): void {
    points.forEach(p => p.aWeight = -1);
}

function createPoint(xPos: Integer, yPos: Integer): Point {
    const point: Point = {
        xPos: xPos,
        yPos: yPos,
        xIndex: 0, 
        yIndex: 0,
        nextPoints: [],
        aWeight: -1
    }
    return point;
}

function generatePoints(N: Integer): Point[] {
    let points: Point[] = [ createPoint(0, 0), createPoint(1, 1) ];
    let prevPoint: Point = points[1];
    for (let i = 1; i <= 2*N; i++) {
        const point: Point = createPoint((2 * prevPoint.xPos) % N, (3 * prevPoint.yPos) % N);
        points.push(point);
        prevPoint = point;
    }
    points = preparePoints(points);
    console.log(`generated count=${2*N} points, after removing duplicates count=${points.length}`);
    // printPoints(points);
    return points;
}

function boxInsert(point: Point, points: Point[], yIndex: Integer[]): void {
    // console.log(`boxInsert :: ${toStrWithNext(point)}`);
    let xpoint: Point;
    let xmaxIndex: Integer = -1;
    for (let xi = point.xIndex-1; xi > -1; xi--) {
        xpoint = points[xi];
        if (xpoint.yPos <= point.yPos) {
            xmaxIndex = xpoint.xIndex;
            break;
        }
    }
    const xmaxYPos: Integer = points[xmaxIndex].yPos;
    let xminIndex: Integer = 0;
    for (let yindex = point.yIndex-1; yindex > -1; yindex--) {
        xpoint = points[yIndex[yindex]];
        if (xpoint.xIndex > xmaxIndex || xpoint.yPos > point.yPos || xpoint.yPos < xmaxYPos) continue;
        xminIndex = xpoint.xIndex;
        break;
    }
    const candidatePoints: Point[] = [];
    for (let xi = xminIndex; xi <= xmaxIndex; xi++) {
        xpoint = points[xi];
        if (xpoint.yPos <= point.yPos && xpoint.yPos >= xmaxYPos) {
            candidatePoints.push(xpoint);
        }
    }
    const fromPoints: Point[] = candidatePoints.filter( (p, i) => i+1 == candidatePoints.length || !isReachable(p, candidatePoints[i+1]) )
    fromPoints.forEach( p => p.nextPoints.push(point) );
    // if (xmaxIndex - xminIndex > 10000) {
    //     console.log(`BIG froms :: xmin=${xminIndex} xmax=${xmaxIndex} xlen=${xmaxIndex-xminIndex+1} candidatePts=${candidatePoints.length} fromPts=${fromPoints.length}`);
    // }
    // const fromPoints: Point[] = [];
    // for (let xi = 0; xi < candidatePoints.length; xi++) {
    //     xpoint = candidatePoints[xi];
    //     let reachable: boolean = false;
    //     for (let xi2 = xi+1; xi2 < candidatePoints.length; xi2++) {
    //         if (isReachable(xpoint, candidatePoints[xi2])) {
    //             reachable = true;
    //             break;
    //         }
    //     }
    //     if (!reachable) {
    //         fromPoints.push(xpoint);
    //     }
    // }
    // const fromPoints: Point[] = points.slice(xminIndex, xmaxIndex+1)
    //                                   .filter( p => p.yPos <= point.yPos && p.yPos >= points[xmaxIndex].yPos )
    //                                   .filter( (p, i, a) => a.slice(i+1).every( p2 => !isReachable(p, p2) ) );
    // for (const fromPoint of fromPoints) {
    //     let hasPath: boolean = false;
    //     for (const index in fromPoint.nextPoints) {
    //         const nextPoint: Point = fromPoint.nextPoints[index];
    //         if (isEqual(point, nextPoint)) {
    //             hasPath = true;
    //             continue;
    //         }
    //         if (isReachable(point, nextPoint)) {
    //             point.nextPoints.push(nextPoint);
    //             fromPoint.nextPoints[index] = point;
    //             hasPath = true;
    //         }
    //     }
    //     if (!hasPath) {
    //         fromPoint.nextPoints.push(point);
    //     }
    // }
}
/*
function insertPoint(fromPoint: Point, newPoint: Point): void {
    let nextFromPoints: Point[] = descendPoints(fromPoint, newPoint);
    // single branch - loop
    // while (nextFromPoints.length === 1) {
    //     const nextFromPoint: Point = nextFromPoints[0];
    //     nextFromPoints = descendPoints(nextFromPoint, newPoint);
    //     fromPoint = nextFromPoint;
    // }
    // multi branch - recurse
    let HasPath: boolean = false;
    for (const nextFromPoint of nextFromPoints) {
        if (isReachable(nextFromPoint, newPoint)) {
            // here we descend into the path and ensure no other action occurs.
            insertPoint(nextFromPoint, newPoint);
            HasPath = true;
        } else {
            // here we break the chain and insert into the middle
            let index: Integer = fromPoint.nextPoints.indexOf(newPoint);
            if (index < 0) {
                fromPoint.nextPoints[fromPoint.nextPoints.indexOf(nextFromPoint)] = newPoint;
            } else {
                fromPoint.nextPoints.splice(fromPoint.nextPoints.indexOf(nextFromPoint), 1);
            }
            newPoint.nextPoints.push(nextFromPoint);
            HasPath = true;
        }
    }
    // here we add as an endpoint
    if (!HasPath && !fromPoint.nextPoints.some( p => p.aWeight == newPoint.aWeight )) {
        fromPoint.nextPoints.push(newPoint);
    }
}
*/

function countFrom(fromPoint: Point): void {
    let currentMax: Integer = 0;
    for (const nxtPoint of fromPoint.nextPoints) {
        if (nxtPoint.aWeight < 0) {
            countFrom(nxtPoint);
        }
        currentMax = Math.max(currentMax, nxtPoint.aWeight + 1);
    }
    fromPoint.aWeight = currentMax;
}

function countMax(points: Point[]): Integer {
    resetPointValues(points);
    const STEP: Integer = 100;
    for (let i = points.length - STEP; i > 0; i -= STEP) {
        countFrom(points[i]);
    }
    countFrom(points[0]);
    return points[0].aWeight;
}


function computeMaxStations(N: Integer): Integer {
    const points: Point[] = generatePoints(N);
    const yIndex: Integer[] = Array(points.length);
    points.forEach( (p, i) => yIndex[p.yIndex] = p.xIndex );
    for (let i = 1; i < points.length; i++) {
        const point: Point = points[i];
        boxInsert(point, points, yIndex);
        // printPoints(points.slice(0, i+1));
        if (i % 10000 == 2499) console.log(`index=${i} point :: ${toStrWithNext(point)}`);
    }
    const maxStations: Integer = countMax(points);
    // points.forEach( p => console.log(toStrWithNext(p)) );
    return maxStations;
}

function run(Ns: Integer[]): Integer {
    const startTime = new Date().getMilliseconds();
    let k: Integer = 1;
    let cumTotal: Integer = 0;
    for (const N of Ns) {
        const result: Integer = computeMaxStations(N);
        cumTotal += result;
        const endTime = new Date().getMilliseconds();
        console.log(`k=${k} N=${N} resultN=${result} resultCum=${cumTotal} time elapsed ${(endTime - startTime) / 1000} seconds.`);
        k++;
    }
    const endTime = new Date().getMilliseconds();
    console.log(`time elapsed ${(endTime - startTime) / 1000} seconds.`);
    return cumTotal;
}

function runTest(): void {
    console.log(`N=22 Result=${run([22])}`);
    console.log(`N=123 Result=${run([123])}`);
    console.log(`N=10000 Result=${run([10000])}`);
}
function runReal(): void {
    const Ns: Integer[] = Array(30).fill(0).map( (v, i) => (i+1)**5 );
    console.log(`N=${Ns} Result=${run(Ns)}`);
}
function runArg(): void {
    console.log(`N=${ARG2} Result=${run([ARG2])}`);
}

const ARG2: Integer = parseInt(process.argv[2] ?? "22");


// console.log(runTest());
// console.log(runReal());
runArg();

