"use strict";
// NEED a prime counting function to resolve this problem.
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const MAX_C = parseInt(process.argv[2] ?? "3141592653589793");
const CONTAINER = [];
function count_triples(triple, depth = 1) {
    if (triple.c >= MAX_C)
        return 0;
    if (depth == 14) {
        CONTAINER.push(triple);
        return 0;
    }
    let cnt = 1;
    for (const new_triple of common_1.Pythagorean.NextTriples(triple)) {
        cnt += count_triples(new_triple, depth + 1);
    }
    return cnt;
}
console.log(count_triples(common_1.Pythagorean.RootTriple));
console.log(CONTAINER.length);
//# sourceMappingURL=540.js.map