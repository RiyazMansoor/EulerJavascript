
import { Integer } from "./common";


namespace E622 {

    function packCycle(packSize: Integer, countMax: Integer = 1e3): Integer {
        const HALF: Integer = packSize / 2;
        const START: Integer = 2;
        let cnt: Integer = 0;
        let position: Integer = START;
        do {
            cnt++;
            if (position <= HALF) {
                position = 2 * position - 1;
            } else {
                position %= HALF;
                position = 2 * position
            }
            console.log(`pack=${packSize} cnt=${cnt} position=${position}`)
        } while (position != START && cnt < countMax);
        return cnt;
    }

    export function run(): Integer {
        const timestart: Integer = new Date().getTime();
        let cnt: Integer = 0;
        // for (let packSize = 4; packSize < 10000; packSize += 2) {
        //     const count: Integer = packCycle(packSize);
        //     console.log(`packSize=${packSize} cnt=${count}`);
        //     // if (count == 8) {
        //     //     console.log(`packSize=${packSize} cnt=${count}`);
        //     //     cnt += packSize;
        //     // }
        // }
        packCycle(62);
        // packCycle(86);
        const timeend: Integer = new Date().getTime();
        console.log(`Complete in ${(timeend - timestart) / 1000} seconds;`);
        return cnt;
    }

}

console.log(E622.run());
