"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimesUpto = exports.LCM = exports.GCD = exports.NextTriples = exports.RootTriple = void 0;
exports.RootTriple = {
    a: 3,
    b: 4,
    c: 5
};
// returns the next 3 primitive pythagorean triples
function NextTriples(triple) {
    const { a, b, c } = triple;
    const a2 = 2 * a, b2 = 2 * b, c2 = 2 * c, c3 = 3 * c;
    return [
        { a: (a - b2 + c2), b: (a2 - b + c2), c: (a2 - b2 + c3) },
        { a: (a + b2 + c2), b: (a2 + b + c2), c: (a2 + b2 + c3) },
        { a: (-a + b2 + c2), b: (-a2 + b + c2), c: (-a2 + b2 + c3) },
    ];
}
exports.NextTriples = NextTriples;
function GCD(n1, n2) {
    while (n1) {
        [n1, n2] = [n2 % n1, n1];
    }
    return n2;
}
exports.GCD = GCD;
function LCM(n1, n2) {
    return n1 * n2 / GCD(n1, n2);
}
exports.LCM = LCM;
function PrimesUpto(upto) {
    const hard_primes = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
    const primes_lst = [];
    // const factors_map = new Map() ;
    const block = 64;
    const array_length = Math.ceil(upto / block);
    const sieve = new Uint32Array(array_length);
    for (const prime of hard_primes) {
        const i1 = Math.floor(prime / block);
        const i1_rem_mask = 1 << (Math.floor((prime % block) / 2));
        if ((sieve[i1] & i1_rem_mask) === 0) {
            for (let n2 = prime * prime; n2 < upto; n2 += 2 * prime) {
                const i2 = Math.floor(n2 / block);
                const i2_rem_mask = 1 << (Math.floor((n2 % block) / 2));
                if ((sieve[i2] & i2_rem_mask) === 0) {
                    sieve[i2] |= i2_rem_mask;
                }
            }
        }
    }
    const largest_hard_prime = hard_primes[hard_primes.length - 1];
    for (let n1 = largest_hard_prime + 2; n1 < upto; n1 += 2) {
        const i1 = Math.floor(n1 / block);
        const i1_rem_mask = 1 << (Math.floor((n1 % block) / 2));
        if ((sieve[i1] & i1_rem_mask) === 0) {
            primes_lst.push(n1);
            for (let n2 = n1 * n1; n2 <= upto; n2 += 2 * n1) {
                const i2 = Math.floor(n2 / block);
                const i2_rem_mask = 1 << (Math.floor((n2 % block) / 2));
                if ((sieve[i2] & i2_rem_mask) === 0) {
                    sieve[i2] |= i2_rem_mask;
                }
            }
        }
    }
    return [2, ...hard_primes].concat(primes_lst);
}
exports.PrimesUpto = PrimesUpto;
