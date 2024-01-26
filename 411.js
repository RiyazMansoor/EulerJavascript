"use strict";
// answer = 9936352 1.5 hours computation
Object.defineProperty(exports, "__esModule", { value: true });
var N411;
(function (N411) {
    function toStr(p) {
        return `Pos=(${p.xPos},${p.yPos}) Stops=(${p.stops}) MaxStops=(${p.maxStops}) sortIndex=(${p.sortIndex})`;
    }
    function debugPrint(points) {
        console.log(`\npoints=${points.length} ::`);
        points.forEach((p, i) => console.log(`i=${i} ${toStr(p)}`));
    }
    function isEqual(p1, p2) {
        return p1.xPos == p2.xPos && p1.yPos == p2.yPos;
    }
    function createPoint(xPos, yPos) {
        const point = {
            xPos: xPos,
            yPos: yPos,
            stops: -1,
            maxStops: -1,
            sortIndex: -1,
        };
        return point;
    }
    function removeDuplicates(points, index = -1) {
        console.log(`removing dups index=${index}`);
        points.sort((p1, p2) => p1.xPos - p2.xPos || p1.yPos - p2.yPos);
        const newPoints = points.filter((p, i) => i + 1 == points.length || !isEqual(p, points[i + 1]));
        points.length = 0;
        return newPoints;
    }
    function generatePoints(N) {
        let points = [createPoint(0, 0), createPoint(1, 1)];
        let prevPoint = points[1];
        for (let i = 1; i <= 2 * N; i++) {
            const point = createPoint((2 * prevPoint.xPos) % N, (3 * prevPoint.yPos) % N);
            points.push(point);
            prevPoint = point;
            if (i % 1e6 === 0) {
                points = removeDuplicates(points, i);
            }
        }
        points = removeDuplicates(points);
        console.log(`generated N=${N} generated=${2 * N} remaining=${points.length}`);
        // origin is special point
        points[0].stops = 0;
        points[0].maxStops = 0;
        points[0].sortIndex = 0;
        return points;
    }
    function countUnique(nums) {
        nums.sort((a, b) => a - b);
        return nums.filter((v, i) => i == nums.length - 1 || v != nums[i + 1]).length;
    }
    function indexPoints(points) {
        const xs = [];
        const ys = [];
        for (const point of points) {
            xs.push(point.xPos);
            ys.push(point.yPos);
        }
        const xsUnique = countUnique(xs);
        const ysUnique = countUnique(ys);
        xs.length = 0;
        ys.length = 0;
        console.log(`points=${points.length} uniqueX=${xsUnique} uniqueY=${ysUnique}`);
        let axisPoints = [];
        let increment = 0;
        if (xsUnique > xsUnique) {
            axisPoints = Array(ysUnique);
            points.sort((p1, p2) => p1.yPos - p2.yPos || p1.xPos - p2.xPos);
            for (let i = 1; i < points.length; i++) {
                increment = (points[i].yPos == points[i - 1].yPos) ? 0 : 1;
                points[i].sortIndex = points[i - 1].sortIndex + increment;
            }
            points.sort((p1, p2) => p1.xPos - p2.xPos || p1.yPos - p2.yPos);
        }
        else {
            axisPoints = Array(xsUnique);
            points.sort((p1, p2) => p1.xPos - p2.xPos || p1.yPos - p2.yPos);
            for (let i = 1; i < points.length; i++) {
                increment = (points[i].xPos == points[i - 1].xPos) ? 0 : 1;
                points[i].sortIndex = points[i - 1].sortIndex + increment;
            }
            points.sort((p1, p2) => p1.yPos - p2.yPos || p1.xPos - p2.xPos);
        }
        // debugPrint(points);
        console.log(`indexed=${points.length}`);
        return { points: axisPoints, maxIndex: -1 };
    }
    function addPoint(point, axisPoints) {
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
                if (points[i].maxStops >= point.maxStops)
                    break;
                points[i].maxStops = point.maxStops;
            }
        }
        axisPoints.points[point.sortIndex] = point;
        axisPoints.maxIndex = Math.max(axisPoints.maxIndex, point.sortIndex);
        // debugPrint(axisPoints.points);
    }
    function computeMaxStations(N) {
        const points = generatePoints(N);
        const axisPoints = indexPoints(points);
        axisPoints.points[0] = points[0];
        axisPoints.maxIndex = 0;
        for (let i = 1; i < points.length; i++) {
            const point = points[i];
            addPoint(point, axisPoints);
            if (i % 100000 == 2499)
                console.log(`index=${i}/${points.length} sortedPoints=${axisPoints.maxIndex}`);
        }
        const maxStops = axisPoints.points[axisPoints.points.length - 1].maxStops;
        points.length = 0;
        axisPoints.points.length = 0;
        return maxStops;
    }
    function run(Ns) {
        const startTime = new Date().getTime();
        let k = 1;
        let cumTotal = 0;
        for (const N of Ns) {
            console.log(`\nStarting k=${k}`);
            const result = computeMaxStations(N);
            cumTotal += result;
            const endTime = new Date().getTime();
            console.log(`k=${k} N=${N} resultN=${result} resultCum=${cumTotal} duration=${(endTime - startTime) / 1000} seconds.`);
            k++;
        }
        const endTime = new Date().getMilliseconds();
        console.log(`time elapsed ${(endTime - startTime) / 1000} seconds.`);
        return cumTotal;
    }
    N411.run = run;
})(N411 || (N411 = {}));
console.log(`N=22 Result=${N411.run([22])}`);
console.log(`N=123 Result=${N411.run([123])}`);
console.log(`N=10000 Result=${N411.run([10000])}`);
const Ns = Array(2).fill(0).map((v, i) => (i + 29) ** 5);
console.log(`N=${Ns} Result=${N411.run(Ns)}`);
//# sourceMappingURL=411.js.map