
// NEED a prime counting function to resolve this problem.

import { Pythagorean  } from "./common";

const MAX_C = parseInt(process.argv[2] ?? "3141592653589793");
const CONTAINER: Pythagorean.Triple[] = [];

function count_triples(triple: Pythagorean.Triple, depth: number = 1): number {

    if (triple.c >= MAX_C) return 0;

    if (depth == 14) {
        CONTAINER.push(triple);
        return 0;
    }

    let cnt: number = 1;
    for (const new_triple of Pythagorean.NextTriples(triple)) {
        cnt += count_triples(new_triple, depth + 1);
    }
    return cnt;

}

console.log(count_triples(Pythagorean.RootTriple));
console.log(CONTAINER.length);




