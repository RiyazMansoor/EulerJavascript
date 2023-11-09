
import { assert } from "console";
import { Integer, Numbers } from "./common";

namespace E411 {

    type Point = { x: Integer, y: Integer, index: Integer }
    const ORIGIN: Point = { x: 0, y: 0, index: 0 }

    function pointStr(p: Point): string {
        return `(${p.x},${p.y})`;
    }

    function stationPoints(N: Integer): Point[] {
        const points: Point[] = [ORIGIN, { x: 1, y: 1, index: 1 }];
        let lastPoint: Point = points[1];
        for (let i = 1; i <= 2 * N; i++) {
            const point: Point = {
                x: (2 * lastPoint.x) % N,
                y: (3 * lastPoint.y) % N,
                index: i+1
            }
            points.push(point);
            lastPoint = point;
            // console.log(i, point);
        }
        return uniquePoints(points);
    }

    function uniquePoints(points: Point[]): Point[] {
        points.sort((p1, p2) => p1.x - p2.x);
        return points.filter((p, i) => {
            for (let subi = i + 1; subi < points.length && p.x == points[subi].x; subi++) {
                if (points[subi].y == p.y) return false;
            }
            return true;
        });
    }

    function nextXPointIndex(p: Point, xcoords: Integer[], xpoints: Point[]): Integer {
        let index: Integer = Numbers.indexOfSorted(p.x, xcoords);
        // console.log(points);
        // console.log(`find=${pointStr(p)} found=${pointStr(points[index])} index=${index} len=${coords.length}`);
        if (index == xcoords.length) return index;
        while (index > 0 && xpoints[index - 1].x == p.x) {
            index--;
        }
        while (xpoints[index].y != p.y) {
            index++;
        }
        // console.log(`X find=${pointStr(p)} found=${pointStr(xpoints[index])}`);
        return index + 1;
    }

    function nextYPointIndex(p: Point, ycoords: Integer[], ypoints: Point[]): Integer {
        let index: Integer = Numbers.indexOfSorted(p.y, ycoords);
        if (index == ycoords.length) return index;
        while (index > 0 && ypoints[index - 1].y == p.y) {
            index--;
        }
        while (ypoints[index].x != p.x) {
            index++;
        }
        // console.log(`Y find=${pointStr(p)} found=${pointStr(ypoints[index])}`);
        return index + 1;
    }

    function reachableValid(from: Point, to: Point): boolean {
        return (to.x >= from.x && to.y >= from.y);
    }

    function stationPathMax(N: Integer): Integer {
        const points: Point[] = stationPoints(N);
        const pcache: Map<string, Integer> = new Map();
        points.forEach(p => pcache.set(pointStr(p), 0));
        const xpoints: Point[] = points.concat([]).sort((a, b) => a.x - b.x);
        const ypoints: Point[] = points.concat([]).sort((a, b) => a.y - b.y);
        const xcoords: Integer[] = xpoints.map(p => p.x);
        const ycoords: Integer[] = ypoints.map(p => p.y);
        function findPath(p: Point, stationCount: Integer, path: string[]): Integer {
            console.log(`path:: stationCount=${stationCount}`, path);
            let maxStationCount: Integer = stationCount;
            const xindex: Integer = nextXPointIndex(p, xcoords, xpoints);
            if (xindex < xcoords.length) {
                const nextXPoints: Point[] = [];
                for (let xi = xindex; xi < xpoints.length; xi++) {
                    const tp: Point = xpoints[xi];
                    if (!reachableValid(p, tp)) break;
                    const cacheVal: Integer = pcache.get(pointStr(tp)) as Integer;
                    // if (cacheVal > 0 && cacheVal <= stationCount + 1) continue;
                    const reachable: boolean = nextXPoints.some(np => reachableValid(np, tp));
                    if (reachable) break;
                    // pcache.set(pointStr(tp), stationCount + 1);
                    nextXPoints.push(tp);
                    console.log(`added from=${pointStr(p)} xtp=${pointStr(tp)} stationCount=${stationCount}`);
                }
                for (const np of nextXPoints) {
                    console.log(`nextXPoint from=${pointStr(p)} to=${pointStr(np)}`);
                    const newStationCount: Integer = findPath(np, stationCount + 1, path.concat([pointStr(np)]));
                    maxStationCount = Math.max(maxStationCount, newStationCount);
                }
            }
            const yindex: Integer = nextYPointIndex(p, ycoords, ypoints);
            if (yindex < ycoords.length) {
                const nextYPoints: Point[] = [];
                for (let yi = yindex; yi < ypoints.length; yi++) {
                    const tp: Point = ypoints[yi];
                    if (!reachableValid(p, tp)) break;
                    const cacheVal: Integer = pcache.get(pointStr(tp)) as Integer;
                    // if (cacheVal > 0 && cacheVal <= stationCount + 1) continue;
                    const reachable: boolean = nextYPoints.some(np => reachableValid(np, tp));
                    if (reachable) break;
                    // pcache.set(pointStr(tp), stationCount + 1);
                    nextYPoints.push(tp);
                    // console.log(`added ytp = ${pointStr(tp)} stationCount=${stationCount}`);
                }
                for (const np of nextYPoints) {
                    console.log(`nextYPoint from=${pointStr(p)} to=${pointStr(np)}`);
                    const newStationCount: Integer = findPath(np, stationCount + 1, path.concat([pointStr(np)]));
                    maxStationCount = Math.max(maxStationCount, newStationCount);
                }
            }
            return maxStationCount;
        }
        return findPath(ORIGIN, 0, []);
    }

    const ARG2: Integer = parseInt(process.argv[2] ?? "22");

    export function run(): Integer {
        const startTime = new Date().getMilliseconds();
        let cnt: Integer = stationPathMax(ARG2);
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

}

console.log(E411.run())