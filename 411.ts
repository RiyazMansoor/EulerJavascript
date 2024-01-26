
// answer = 9936352 1.5 hours computation


namespace N411 {

    type Integer = number;

    type Point = {
        xPos: Integer,
        yPos: Integer,
        stops: Integer,
        maxStops: Integer,
        sortIndex: Integer,
    }

    type AxisPoints = {
        points: Point[],
        maxIndex: Integer,
    }

    function toStr(p: Point): string {
        return `Pos=(${p.xPos},${p.yPos}) Stops=(${p.stops}) MaxStops=(${p.maxStops}) sortIndex=(${p.sortIndex})`;
    }

    function debugPrint(points: Point[]): void {
        console.log(`\npoints=${points.length} ::`);
        points.forEach( (p, i) => console.log(`i=${i} ${toStr(p)}`) );
    }

    function isEqual(p1: Point, p2: Point): boolean {
        return p1.xPos == p2.xPos && p1.yPos == p2.yPos;
    }

    function createPoint(xPos: Integer, yPos: Integer): Point {
        const point: Point = {
            xPos: xPos,
            yPos: yPos,
            stops: -1,
            maxStops: -1,
            sortIndex: -1,
        }
        return point;
    }

    function removeDuplicates(points: Point[], index: Integer = -1): Point[] {
        console.log(`removing dups index=${index}`);
        points.sort( (p1, p2) => p1.xPos - p2.xPos || p1.yPos - p2.yPos );
        const newPoints: Point[] = points.filter( (p, i) => i + 1 == points.length || !isEqual(p, points[i + 1]) );
        points.length = 0;
        return newPoints;
    }

    function generatePoints(N: Integer): Point[] {
        let points: Point[] = [ createPoint(0, 0), createPoint(1, 1) ];
        let prevPoint: Point = points[1];
        for (let i = 1; i <= 2*N; i++) {
            const point: Point = createPoint((2 * prevPoint.xPos) % N, (3 * prevPoint.yPos) % N);
            points.push(point);
            prevPoint = point;
            if (i % 1e6 === 0) {
                points = removeDuplicates(points, i);
            }
        }
        points = removeDuplicates(points);
        console.log(`generated N=${N} generated=${2*N} remaining=${points.length}`);
        // origin is special point
        points[0].stops = 0;
        points[0].maxStops = 0;
        points[0].sortIndex = 0;
        return points;
    }

    function countUnique(nums: Integer[]): Integer {
        nums.sort( (a, b) => a - b );
        return nums.filter( (v, i) => i == nums.length-1 || v != nums[i+1]).length;
    }

    function indexPoints(points: Point[]): AxisPoints {
        const xs: Integer[] = [];
        const ys: Integer[] = [];
        for (const point of points) {
            xs.push(point.xPos);
            ys.push(point.yPos);
        }
        const xsUnique: Integer = countUnique(xs);
        const ysUnique: Integer = countUnique(ys);
        xs.length = 0;
        ys.length = 0;
        console.log(`points=${points.length} uniqueX=${xsUnique} uniqueY=${ysUnique}`);
        let axisPoints: Point[] = [];
        let increment: Integer = 0;
        if (xsUnique > xsUnique) {
            axisPoints = Array(ysUnique);
            points.sort( (p1, p2) => p1.yPos - p2.yPos || p1.xPos - p2.xPos );
            for (let i = 1; i < points.length; i++) {
                increment = (points[i].yPos == points[i-1].yPos) ? 0 : 1;
                points[i].sortIndex = points[i-1].sortIndex + increment;
            }
            points.sort( (p1, p2) => p1.xPos - p2.xPos || p1.yPos - p2.yPos );
        } else {
            axisPoints = Array(xsUnique);
            points.sort( (p1, p2) => p1.xPos - p2.xPos || p1.yPos - p2.yPos );
            for (let i = 1; i < points.length; i++) {
                increment = (points[i].xPos == points[i-1].xPos) ? 0 : 1;
                points[i].sortIndex = points[i-1].sortIndex + increment;
            }
            points.sort( (p1, p2) => p1.yPos - p2.yPos || p1.xPos - p2.xPos );
        }
        // debugPrint(points);
        console.log(`indexed=${points.length}`);
        return { points: axisPoints, maxIndex: -1 };
    }
    
    function addPoint(point: Point, axisPoints: AxisPoints): void {
        const { points, maxIndex } = axisPoints;
        for (let i = point.sortIndex; i >= 0; i--) {
            if (points[i]) {
                point.stops = points[i].maxStops + 1;
                point.maxStops = points[i].maxStops + 1;        
                break;
            }
        }
        for (let i = point.sortIndex + 1; i <= maxIndex; i++) {
            if (points[i]) {
                if (points[i].maxStops >= point.maxStops) break;
                points[i].maxStops = point.maxStops;
            }
        }
        axisPoints.points[point.sortIndex] = point;
        axisPoints.maxIndex = Math.max(axisPoints.maxIndex, point.sortIndex)
        // debugPrint(axisPoints.points);
    }

    function computeMaxStations(N: Integer): Integer {
        const points: Point[] = generatePoints(N);
        const axisPoints: AxisPoints = indexPoints(points);
        axisPoints.points[0] = points[0];
        axisPoints.maxIndex = 0;
        for (let i = 1; i < points.length; i++) {
            const point: Point = points[i];
            addPoint(point, axisPoints);
            if (i % 100000 == 2499) console.log(`index=${i}/${points.length} sortedPoints=${axisPoints.maxIndex}`);
        }
        const maxStops: Integer = axisPoints.points[axisPoints.points.length-1].maxStops;
        points.length = 0;
        axisPoints.points.length = 0;
        return maxStops;
    }

    export function run(Ns: Integer[]): Integer {
        const startTime = new Date().getTime();
        let k: Integer = 1;
        let cumTotal: Integer = 0;
        for (const N of Ns) {
            console.log(`\nStarting k=${k}`);
            const result: Integer = computeMaxStations(N);
            cumTotal += result;
            const endTime = new Date().getTime();
            console.log(`k=${k} N=${N} resultN=${result} resultCum=${cumTotal} duration=${(endTime - startTime) / 1000} seconds.`);
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

const Ns: number[] = Array(2).fill(0).map( (v, i) => (i+29)**5 );
console.log(`N=${Ns} Result=${N411.run(Ns)}`);


    