"use strict";
// answer 2032447591196869022
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
var E273;
(function (E273) {
    const Primes = common_1.PRIMES1000.filter(val => val < 150 && (val - 1) % 4 === 0);
    const PrimitiveABs = new Map();
    function sums(num) {
        for (let a = 1; true; a++) {
            const b = Math.floor(Math.sqrt(num - a * a));
            if (b < a)
                break;
            if (a * a + b * b == num) {
                PrimitiveABs.set(num, { a: a, b: b });
                // console.log(`num=${num} a=${a} b=${b}`);
            }
        }
    }
    // (a^2 + b^2)(c^2 + d^2) = (ac + bd)^2 + (ad - bc)^2
    function decompose(...primes) {
        const ab1 = PrimitiveABs.get(primes[0]);
        const ab2 = PrimitiveABs.get(primes[1]);
        const a = ab1.a * ab2.a + ab1.b * ab2.b;
        const b = Math.abs(ab1.a * ab2.b - ab1.b * ab2.a);
        return { a: a, b: b };
    }
    function minAbsVal(complex) {
        const absA = complex.realValue() * (complex.realValue() < 0 ? -1n : 1n);
        const absB = complex.imaginaryValue() * (complex.imaginaryValue() < 0 ? -1n : 1n);
        return absA < absB ? absA : absB;
    }
    const cacheComplexes = [];
    function find(product, pos, complexes) {
        // console.log(`pos=${pos} product=${product.toString()}`);
        if (pos == complexes.length) {
            cacheComplexes.push(product);
            // console.log(product);
            return minAbsVal(product);
        }
        let cnt = 0n;
        const posCN = complexes[pos].clone();
        cnt += find(product.clone().multiply(posCN), pos + 1, complexes);
        if (pos > 0) {
            const negCN = complexes[pos].clone().conjugate();
            cnt += find(product.clone().multiply(negCN), pos + 1, complexes);
        }
        return cnt;
    }
    function run() {
        Primes.forEach(val => sums(val));
        const complexes = Primes.map(val => PrimitiveABs.get(val)).map(ab => new common_1.ComplexNumber(BigInt(ab?.a), BigInt(ab?.b)));
        let cnt = complexes.reduce((pv, cv) => pv += minAbsVal(cv), 0n);
        const combos = common_1.Set.Powerset(Primes).filter(set => set.length > 1);
        const unitCN = new common_1.ComplexNumber(1n, 0n);
        for (const combo of combos) {
            cnt += find(unitCN.clone(), 0, combo.map(prime => PrimitiveABs.get(prime)).map(ab => new common_1.ComplexNumber(BigInt(ab.a), BigInt(ab.b))));
            console.log(`cnt=${cnt} combo=${combo}`);
        }
        return cnt;
    }
    E273.run = run;
})(E273 || (E273 = {}));
console.log(E273.run());
