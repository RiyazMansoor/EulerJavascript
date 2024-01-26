
namespace N411 {

    export type Integer = number;

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

    // debug print points
    function printPoints(points: Set<Point>): void {
        points.forEach( p => console.log(toStrWithNext(p)) );
        console.log(`...`);
    }

    function isEqual(p1: Point, p2: Point): boolean {
        return p1.xPos == p2.xPos && p1.yPos == p2.yPos;
    }

    function isReachable(from: Point, to: Point): boolean {
        return to.xPos >= from.xPos && to.yPos >= from.yPos;
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

    const ORIGIN: Point = createPoint(0, 0);

    function generatePoints(N: Integer): Point[] {
        ORIGIN.aWeight = 0;
        let points: Point[] = [ ORIGIN, createPoint(1, 1) ];
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

    const endPoints: Set<Point> = new Set();

    function maxInsert(point: Point): void {
        const pruneEndPoints: Point[] = [];
        let maxWeightMatch: Point = ORIGIN;
        for (const endPoint of endPoints) {
            if (isReachable(endPoint, point)) {
                if (maxWeightMatch.aWeight < endPoint.aWeight) {
                    maxWeightMatch = endPoint;
                }
                pruneEndPoints.push(endPoint);
            }
        }
        if (pruneEndPoints.length > 0) {
            pruneEndPoints.forEach( p => endPoints.delete(p) );
            point.aWeight = maxWeightMatch.aWeight + 1;
            endPoints.add(point);
            // printPoints(endPoints);
        }
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
        let lastPoint: Point = ORIGIN;
        for (let xi = xminIndex; xi <= xmaxIndex; xi++) {
            xpoint = points[xi];
            if (xpoint.yPos <= point.yPos && xpoint.yPos >= xmaxYPos) {
                if (lastPoint.aWeight < xpoint.aWeight) {
                    lastPoint = xpoint;
                }
            }
        }
        // lastPoint.nextPoints.push(point);
        point.aWeight = lastPoint.aWeight + 1;
        let canAddPoint: boolean = true;
        for (const endPoint of endPoints) {
            if (isReachable(point, endPoint)) {
                canAddPoint = false;
            }
        }
        if (canAddPoint) {
            for (const endPoint of endPoints) {
                if (isReachable(endPoint, point)) {
                    endPoints.delete(endPoint)
                }
            }
            endPoints.add(point);
        }
        // console.log(`${toStr(lastPoint)} last point`);
        // printPoints(endPoints);
    }

    function computeMaxStations(N: Integer): Integer {
        const points: Point[] = generatePoints(N);
        const yIndex: Integer[] = Array(points.length);
        points.forEach( p => yIndex[p.yIndex] = p.xIndex );
        for (let i = 1; i < points.length; i++) {
            const point: Point = points[i];
            maxInsert(point);
            if (point.aWeight < 0) boxInsert(point, points, yIndex);
            if (i % 10000 == 2499) console.log(`index=${i}/${points.length} endPoints=${endPoints.size} point :: ${toStrWithNext(point)}`);
        }
        return Array.from(endPoints.values()).reduce( (pv, cPnt) => Math.max(pv, cPnt.aWeight), 0 );
    }

    export function run(Ns: Integer[]): Integer {
        const startTime = new Date().getTime();
        let k: Integer = 1;
        let cumTotal: Integer = 0;
        for (const N of Ns) {
            const result: Integer = computeMaxStations(N);
            cumTotal += result;
            const endTime = new Date().getTime();
            console.log(`k=${k} N=${N} resultN=${result} resultCum=${cumTotal} endPoints=${endPoints.size} duration=${(endTime - startTime) / 1000} seconds.`);
            k++;
        }
        const endTime = new Date().getMilliseconds();
        console.log(`time elapsed ${(endTime - startTime) / 1000} seconds.`);
        return cumTotal;
    }
    
}


console.log(`N=22 Result=${N411.run([22])}`);
console.log(`N=123 Result=${N411.run([123])}`);
console.log(`N=10000 Result=${N411.run([10000])}`);

const Ns: N411.Integer[] = Array(30).fill(0).map( (v, i) => (i+1)**5 );
console.log(`N=${Ns} Result=${N411.run(Ns)}`);


    