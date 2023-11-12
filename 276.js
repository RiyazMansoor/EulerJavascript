"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const MAX_PERIMETER = parseInt(process.argv[2] ?? "100");
function scanner() {
    let cnt = MAX_PERIMETER * (MAX_PERIMETER + 1) / 2;
    const MAX_A = Math.ceil(MAX_PERIMETER / 3);
    const MAX_B = MAX_PERIMETER - 1;
    for (let a = 2; a < MAX_A; a++) {
        for (let b = a; b < MAX_B; b++) {
        }
    }
    return cnt;
}
console.log(new common_1.PrimeNumbers(1e6).toArray().length);
//# sourceMappingURL=276.js.map