
// answer 1918080160

import { Integer } from "./common";

namespace E191 {

    const Attendance: string[] = [ "O", "A", "L" ];

    const CACHELATE: Map<Integer, Integer> = new Map();
    const CACHETIME: Map<Integer, Integer> = new Map();
    
    const DAYS: Integer = parseInt(process.argv[2] ?? "4");

    function find(pos: Integer, path: string[], islate: boolean): Integer {
        if (pos === DAYS) {
            // console.log(path);
            return 1;
        }
        const lastDayO: boolean = path[path.length - 1] == "O";
        if (lastDayO) {
            if (islate && CACHELATE.has(pos)) {
                return CACHELATE.get(pos) as Integer;
            }
            if (!islate && CACHETIME.has(pos)) {
                return CACHETIME.get(pos) as Integer;
            }
        }
        const attendance: string[] = [ "O" ];
        if (path.length < 2 || !path.slice(-2).every( el => el  == "A" )) {
            attendance.push("A");
        }
        if (!islate) attendance.push("L");
        let cnt: Integer = 0;
        for (const attended of attendance) {
            const newIsLate: boolean = (islate || attended == "L");
            const newPath = path.concat([attended]);
            cnt += find(pos + 1, newPath, newIsLate);
        }
        if (lastDayO) {
            if (islate) {
                CACHELATE.set(pos, cnt);
            }
            if (!islate) {
                CACHETIME.set(pos, cnt);
            }
        }
        return cnt;
    }
 
    export function run(): Integer {
        const timestart: Integer = new Date().getTime();
        let cnt: Integer = 0;
        cnt = find(0, [], false);
        const timeend: Integer = new Date().getTime();
        console.log(`Complete in ${(timeend-timestart)/1000} seconds;`);
        return cnt;
    }

}

console.log(E191.run());
