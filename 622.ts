
import { Integer } from "./common";


namespace E622 {

    function packCycle(packSize: Integer): Integer {
        const HALF: Integer = packSize / 2;
        const START: Integer = 2;
        let cnt: Integer = 0;
        let position: Integer = START;
        do {
            cnt++;
            if (position < HALF) {
                position = 2 * position - 1;
            } else {
                position %= HALF;
                position = 2 * position
            }
            console.log(`pack=${packSize} cnt=${cnt} position=${position}`)
        } while (position != START);
        return cnt;
    }

    export function run(): Integer {
        const timestart: Integer = new Date().getTime();
        let cnt: Integer = 0;
        packCycle(52);
        packCycle(86);
        const timeend: Integer = new Date().getTime();
        console.log(`Complete in ${(timeend-timestart)/1000} seconds;`);
        return cnt;
    }

}

console.log(E622.run());
