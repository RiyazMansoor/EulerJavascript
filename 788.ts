/*

10011


*/

import { Integer } from "./common";

namespace E788 {


    function startWith(digits: Integer): Integer {
        const midplus1: Integer = Math.floor(digits/2 + 1);
        let cnt: Integer = 0;
        for (let d = midplus1; d <= digits; d++) {
            const len: Integer = Math.ceil(d/2);
            
        }
        return cnt;
    }

    export function run(): Integer {
        let sum: Integer = 0;
        return sum;
    }

}

console.log(E788.run());
