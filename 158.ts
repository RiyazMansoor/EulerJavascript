
import { Integer } from "./common";

namespace E158 {

    const ALPHABETS: Integer = 27; // 1 indexed

    function countAllFixedLength(pos: Integer, trekked:Integer[], LENGTH: Integer): Integer {
        if (pos == LENGTH) {
            return 1;
        }
        let cnt: Integer = 0;
        const startVal: Integer = 1 + (trekked[trekked.length - 1] ?? 0);
        for (let num = startVal; num < ALPHABETS; num++) {
            cnt += countAllFixedLength(pos + 1, trekked.concat([num]), LENGTH);
        }
        return cnt;
    }

    function trek(pos: Integer, trekked: Integer[], trekMax: Integer): Integer {
        if (pos == trekMax) {

        }
    }

    export function run(): void {

    }

}

E158.run();
