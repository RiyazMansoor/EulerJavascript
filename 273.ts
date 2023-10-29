
// answer 2032447591196869022

import { PRIMES1000, Integer, ComplexNumber, Set } from "./common"


namespace E273 {

    const Primes: Integer[] = PRIMES1000.filter( val => val < 150 && (val - 1) % 4 === 0);

    type AB = {
        a: Integer,
        b: Integer,
    }

    const PrimitiveABs: Map<Integer, AB> = new Map();

    function sums(num: Integer): void {
        for (let a = 1; true; a++) {
            const b: Integer = Math.floor(Math.sqrt(num - a * a));
            if (b < a) break;
            if (a * a + b * b == num) {
                PrimitiveABs.set(num, { a: a, b: b } );
                // console.log(`num=${num} a=${a} b=${b}`);
            }
        }
    }

    // (a^2 + b^2)(c^2 + d^2) = (ac + bd)^2 + (ad - bc)^2
    function decompose(...primes: Integer[]): AB {
        const ab1: AB = PrimitiveABs.get(primes[0]) as AB;
        const ab2: AB = PrimitiveABs.get(primes[1]) as AB;
        const a: Integer = ab1.a * ab2.a + ab1.b * ab2.b;
        const b: Integer = Math.abs(ab1.a * ab2.b - ab1.b * ab2.a);
        return { a: a, b: b }
    }

    function minAbsVal(complex: ComplexNumber): bigint {
        const absA: bigint = complex.realValue() * (complex.realValue() < 0 ? -1n : 1n);
        const absB: bigint = complex.imaginaryValue() * (complex.imaginaryValue() < 0 ? -1n : 1n);
        return absA < absB ? absA : absB;
    }

    const cacheComplexes: ComplexNumber[] = [];

    function find(product: ComplexNumber, pos: Integer, complexes: ComplexNumber[]): bigint {
        // console.log(`pos=${pos} product=${product.toString()}`);
        if (pos == complexes.length) {
            cacheComplexes.push(product);
            // console.log(product);
            return minAbsVal(product);
        }
        let cnt: bigint = 0n;
        const posCN: ComplexNumber = complexes[pos].clone();
        cnt += find(product.clone().multiply(posCN), pos + 1, complexes);
        if (pos > 0) {
            const negCN: ComplexNumber = complexes[pos].clone().conjugate();
            cnt += find(product.clone().multiply(negCN), pos + 1, complexes);
        }
        return cnt;
    }

    export function run(): bigint {
        Primes.forEach( val => sums(val) );
        const complexes: ComplexNumber[] = Primes.map( val => PrimitiveABs.get(val) ).map( ab => new ComplexNumber(BigInt(ab?.a as number), BigInt(ab?.b as number)) );
        let cnt: bigint = complexes.reduce( (pv, cv) => pv += minAbsVal(cv), 0n );
        const combos: Integer[][] = Set.Powerset(Primes).filter( set => set.length > 1 );
        const unitCN: ComplexNumber = new ComplexNumber(1n, 0n);
        for (const combo of combos) {
            cnt += find(unitCN.clone(), 0, combo.map( prime => PrimitiveABs.get(prime) as AB ).map( ab => new ComplexNumber( BigInt(ab.a as number), BigInt(ab.b as number) ) ) );
            console.log(`cnt=${cnt} combo=${combo}`);
        }
        return cnt;
    }

}

console.log(E273.run());


