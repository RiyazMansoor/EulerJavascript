"use strict";
// answer 1918080160
Object.defineProperty(exports, "__esModule", { value: true });
var E191;
(function (E191) {
    const Attendance = ["O", "A", "L"];
    const CACHELATE = new Map();
    const CACHETIME = new Map();
    const DAYS = parseInt(process.argv[2] ?? "4");
    function find(pos, path, islate) {
        if (pos === DAYS) {
            // console.log(path);
            return 1;
        }
        const lastDayO = path[path.length - 1] == "O";
        if (lastDayO) {
            if (islate && CACHELATE.has(pos)) {
                return CACHELATE.get(pos);
            }
            if (!islate && CACHETIME.has(pos)) {
                return CACHETIME.get(pos);
            }
        }
        const attendance = ["O"];
        if (path.length < 2 || !path.slice(-2).every(el => el == "A")) {
            attendance.push("A");
        }
        if (!islate)
            attendance.push("L");
        let cnt = 0;
        for (const attended of attendance) {
            const newIsLate = (islate || attended == "L");
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
    function run() {
        const timestart = new Date().getTime();
        let cnt = 0;
        cnt = find(0, [], false);
        const timeend = new Date().getTime();
        console.log(`Complete in ${(timeend - timestart) / 1000} seconds;`);
        return cnt;
    }
    E191.run = run;
})(E191 || (E191 = {}));
console.log(E191.run());
//# sourceMappingURL=191.js.map