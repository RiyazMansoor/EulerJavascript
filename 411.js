"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
var E411;
(function (E411) {
    const ORIGIN = { x: 0, y: 0 };
    function pointStr(p) {
        return `${p.x},${p.y}`;
    }
    function stationPoints(N) {
        const points = [ORIGIN, { x: 1, y: 1 }];
        let lastPoint = points[1];
        for (let i = 1; i <= 2 * N; i++) {
            const point = {
                x: (2 * lastPoint.x) % N,
                y: (3 * lastPoint.y) % N
            };
            points.push(point);
            lastPoint = point;
            // console.log(i, point);
        }
        return uniquePoints(points);
    }
    function uniquePoints(points) {
        points.sort((p1, p2) => p1.x - p2.x);
        return points.filter((p, i) => {
            for (let subi = i + 1; subi < points.length && p.x == points[subi].x; subi++) {
                if (points[subi].y == p.y)
                    return false;
            }
            return true;
        });
    }
    function nextXPointIndex(p, xcoords, xpoints) {
        let index = common_1.Numbers.indexOfSorted(p.x, xcoords);
        // console.log(points);
        // console.log(`find=${pointStr(p)} found=${pointStr(points[index])} index=${index} len=${coords.length}`);
        if (index == xcoords.length)
            return index;
        while (index > 0 && xpoints[index - 1].x == p.x) {
            index--;
        }
        while (xpoints[index].y != p.y) {
            index++;
        }
        // console.log(`X find=${pointStr(p)} found=${pointStr(xpoints[index])}`);
        return index + 1;
    }
    function nextYPointIndex(p, ycoords, ypoints) {
        let index = common_1.Numbers.indexOfSorted(p.y, ycoords);
        if (index == ycoords.length)
            return index;
        while (index > 0 && ypoints[index - 1].y == p.y) {
            index--;
        }
        while (ypoints[index].x != p.x) {
            index++;
        }
        // console.log(`Y find=${pointStr(p)} found=${pointStr(ypoints[index])}`);
        return index + 1;
    }
    function reachableValid(from, to) {
        return (to.x >= from.x && to.y >= from.y);
    }
    function stationPathMax(N) {
        const points = stationPoints(N);
        const pcache = new Map();
        points.forEach(p => pcache.set(pointStr(p), 0));
        const xpoints = points.concat([]).sort((a, b) => a.x - b.x);
        const ypoints = points.concat([]).sort((a, b) => a.y - b.y);
        const xcoords = xpoints.map(p => p.x);
        const ycoords = ypoints.map(p => p.y);
        function findPath(p, stationCount) {
            let maxStationCount = stationCount;
            const xindex = nextXPointIndex(p, xcoords, xpoints);
            if (xindex < xcoords.length) {
                const nextXPoints = [];
                for (let xi = xindex; xi < xpoints.length; xi++) {
                    const tp = xpoints[xi];
                    if (!reachableValid(p, tp))
                        break;
                    const cacheVal = pcache.get(pointStr(tp));
                    if (cacheVal > 0 && cacheVal <= stationCount + 1)
                        continue;
                    const reachable = nextXPoints.some(np => reachableValid(np, tp));
                    if (reachable)
                        break;
                    pcache.set(pointStr(tp), stationCount + 1);
                    nextXPoints.push(tp);
                    console.log(`added from=${pointStr(p)} xtp=${pointStr(tp)} stationCount=${stationCount}`);
                }
                for (const np of nextXPoints) {
                    console.log(`nextXPoint from=${pointStr(p)} to=${pointStr(np)}`);
                    const newStationCount = findPath(np, stationCount + 1);
                    maxStationCount = Math.max(maxStationCount, newStationCount);
                }
            }
            const yindex = nextYPointIndex(p, ycoords, ypoints);
            if (yindex < ycoords.length) {
                const nextYPoints = [];
                for (let yi = yindex; yi < ypoints.length; yi++) {
                    const tp = ypoints[yi];
                    if (!reachableValid(p, tp))
                        break;
                    const cacheVal = pcache.get(pointStr(tp));
                    if (cacheVal > 0 && cacheVal <= stationCount + 1)
                        continue;
                    const reachable = nextYPoints.some(np => reachableValid(np, tp));
                    if (reachable)
                        break;
                    pcache.set(pointStr(tp), stationCount + 1);
                    nextYPoints.push(tp);
                    // console.log(`added ytp = ${pointStr(tp)} stationCount=${stationCount}`);
                }
                for (const np of nextYPoints) {
                    console.log(`nextYPoint from=${pointStr(p)} to=${pointStr(np)}`);
                    const newStationCount = findPath(np, stationCount + 1);
                    maxStationCount = Math.max(maxStationCount, newStationCount);
                }
            }
            return maxStationCount;
        }
        return findPath(ORIGIN, 0);
    }
    function run() {
        const startTime = new Date().getMilliseconds();
        let cnt = stationPathMax(22);
        // const points: Point[] = stationPoints(22);
        // console.log(points.sort( (a,b) => a.x - b.x ));
        // console.log(uniquePoints(points));
        // console.log(stationPathMax(22));
        // console.log(stationPathMax(123));
        // console.log(stationPathMax(10000));
        const endTime = new Date().getMilliseconds();
        console.log(`time elapsed ${(endTime - startTime) / 1000} seconds.`);
        return cnt;
    }
    E411.run = run;
})(E411 || (E411 = {}));
console.log(E411.run());
