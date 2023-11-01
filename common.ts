
/**
 * Easier identification of integers.
 */
export type Integer = number;

/**
 * Easier identifying an array of sorted integers.
 */
export type SortedIntegerArray = Integer[];

/**
 * Easier identification of prime number integers.
 */
export type Prime = Integer;

/**
 * Easier identifying an array of sorted prime integers.
 */
export type SortedPrimeArray = Prime[];

/**
 * Primes are used extensively.
 * Hardcoding the initial primes for efficiency.
 */
export const PRIMES1000: Integer[] = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
    101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199,
    211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293,
    307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397,
    401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499,
    503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599,
    601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691,
    701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797,
    809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887,
    907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997
];


/**
 * This namespace provides functions of general use.
 * 1) Math functions NOT provided in the Math library.
 * 2) Array functions not provided for in Array.
 */
export namespace Numbers {

    /**
     * Returns the mathemtical GCD or HCF of the supplied integers.
     * @nums array of integers
     * @return Greatest Common Divisor of @nums
     */
    export function GCD(...nums: Integer[]): Integer {
        function gcd(n1: Integer, n2: Integer): Integer {
            while (n1) {
                [n1, n2] = [n2 % n1, n1];
            }
            return n2;
        }
        let lastGCD: Integer = nums[0];
        for (let i = 1; i < nums.length && lastGCD > 1; i++) {
            lastGCD = gcd(lastGCD, nums[i]);
        }
        return lastGCD;
    }

    /**
     * Returns the mathemtical LCM of the supplied integers.
     * @nums array of integers
     * @return Lowest Common Multiple of @nums
     */
    export function LCM(...nums: Integer[]): Integer {
        let lastLCM: Integer = nums[0];
        for (let i = 1; i < nums.length; i++) {
            lastLCM = lastLCM * nums[i] / GCD(lastLCM, nums[i]);
        }
        return lastLCM;
    }

    /**
     * Ascending sorts an array of <b>Integer</b> numbers.
     * @param nums array of integers
     * @returns array sorted in ascending order
     */
    export function SortAsc(nums: Integer[]): SortedIntegerArray {
        return nums.sort((a, b) => a - b);
    }

    /**
     * Descending sorts an array of <b>Integer</b> numbers.
     * @param nums array of integers
     * @returns array sorted in descending order
     */
    export function SortDsc(nums: Integer[]): SortedIntegerArray {
        return nums.sort((a, b) => b - a);
    }

    /**
     * Returns the product of an array of <b>Integer</b> numbers.
     * @param nums array of integers
     * @returns product of array numbers
     */
    export function Product(nums: Integer[]): Integer {
        return nums.reduce((pv, cv) => pv * cv, 1);
    }

    /**
     * Returns the sum of an array of <b>Integer</b> numbers.
     * @param nums array of integers
     * @returns sum of array numbers
     */
    export function Sum(nums: Integer[]): Integer {
        return nums.reduce((pv, cv) => pv + cv, 0);
    }

    /**
     * Returns the index of the <b>target</b> within the array.
     * @param nums array of ascending sorted integers
     * @param target number to find
     * @returns index of <b>target</b> or negative if not found
     */
    export function binarySearch(nums: SortedIntegerArray, target: Integer): Integer {
        let l_index: number = 0;
        let r_index: number = nums.length - 1;
        // if this condition failes, number not found, return -1
        while (l_index <= r_index) {
            const m_index: number = Math.floor((l_index + r_index) / 2);
            // return index if number found
            if (nums[m_index] === target) {
                return m_index;
            }
            // if number not found, move pointers
            if (target < nums[m_index]) {
                r_index = m_index - 1;
            } else {
                l_index = m_index + 1;
            }
        }
        return -1;
    }

    /**
     * Returns the transposed double array.
     * @param matrix double array to transpose
     * @returns transposed double array
     */
    export function Transpose(matrix: Integer[][]): Integer[][] {
        let result = new Array(matrix[0].length).fill(0).map(() => new Array(matrix.length).fill(0));
        for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < result[0].length; j++) {
                result[i][j] = matrix[j][i];
            }
        }
        return result;
    }

    /**
     * Returns the factorial of a <b>Integer</b> number.
     * @param num number to calculate factorial
     * @returns factorial of <b>num</b>
     */
    export function Factorial(num: Integer): bigint {
        let result: bigint = 1n;
        for (let i = 2; i <= num; i++) {
            result *= BigInt(i);
        }
        return result;
    }

    /**
     * Frequence map of number occurence.
     */
    export type FrequencyMap = Map<Integer, Integer>;

    /**
     * Returns the frequence of occurence.
     * @param nums array of integers
     * @returns frequence of occurrence
     */
    export function Frequency(nums: Integer[]): FrequencyMap {
        const freq: FrequencyMap = new Map();
        nums.forEach(val => freq.set(val, (freq.has(val) ? freq.get(val) as Integer : 0) + 1));
        return freq;
    }

    /**
     * Returns the number of unique permutations for <b>nums</b> array.
     * That is, repeated elements in <b>nums</b> are discounted.
     * @param nums array of integers
     * @returns returns the number of unique permutations
     */
    export function Permutations(nums: Integer[]): bigint {
        // count repetitions
        const freq: FrequencyMap = Frequency(nums);
        const repeats: Integer[] = Array.from(freq.values()).filter(val => val > 1);
        let result: bigint = Factorial(nums.length);
        repeats.forEach(val => result /= Factorial(val));
        return result;
    }

}


/**
 * This namespace provides types, constants and functions relating to the Pythagorean Theorem.
 */
export namespace Pythagorean {

    /**
     * Type definitions for a pythagorean triple.
     */
    export type Triple = {
        a: Integer,
        b: Integer,
        c: Integer
    }

    /**
     * Root triple for all pythagorean triples.
     */
    export const RootTriple: Triple = {
        a: 3,
        b: 4,
        c: 5
    }

    /**
     * Returns the next 3 triples to the supplied <b>triple</b>.
     * @param triple pythagorean triple
     * @returns returns the next 3 triples
     */
    export function NextTriples(triple: Triple): Triple[] {
        const { a, b, c } = triple;
        const a2 = 2 * a, b2 = 2 * b, c2 = 2 * c, c3 = 3 * c;
        return [
            { a: (a - b2 + c2), b: (a2 - b + c2), c: (a2 - b2 + c3) },
            { a: (a + b2 + c2), b: (a2 + b + c2), c: (a2 + b2 + c3) },
            { a: (-a + b2 + c2), b: (-a2 + b + c2), c: (-a2 + b2 + c3) },
        ];
    }

}

/**
 * This namespace provides types, constants and functions relating to <b>Set</b> operations.
 */
export namespace Set {

    /**
     * Returns the powerset of supplied array.
     * TODO: type firming for Integer
     * @param nums array of integers
     * @returns powerset of <b>nums</b>
     */
    export function Powerset(nums: any[]): any[][] {
        return nums.reduce((a, v) => a.concat(a.map((r: any) => [v].concat(r))), [[]]);
    }

}

export namespace Util {

    const fs = require('fs');

    export function readFile(filename: string): string {
        return fs.readFileSync(filename, 'utf8');
    }

    export function csvToStrMatrix(csv: string): string[][] {
        return csv.split("\n").map(line => line.split(",").map(data => data.trim()));
    }

    export function csvToIntMatrix(csv: string): Integer[][] {
        return csv.split("\n").map(line => line.split(",").map(data => parseInt(data.trim())));
    }

}

export class PrimeNumbers {

    private primes: SortedPrimeArray;

    constructor(uptoN: Integer) {
        // const hard_primes = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
        const primes_lst = [];
        // used to save memory to generate a greater number of primes
        const block = 64;
        const array_length = Math.ceil(uptoN / block);
        const sieve = new Uint32Array(array_length);
        // first pass goes through hard coded set of primes
        for (const prime of PRIMES1000.slice(1)) {
            const i1 = Math.floor(prime / block);
            const i1_rem_mask = 1 << (Math.floor((prime % block) / 2));
            if ((sieve[i1] & i1_rem_mask) === 0) {
                for (let n2 = prime * prime; n2 < uptoN; n2 += 2 * prime) {
                    const i2 = Math.floor(n2 / block);
                    const i2_rem_mask = 1 << (Math.floor((n2 % block) / 2));
                    if ((sieve[i2] & i2_rem_mask) === 0) {
                        sieve[i2] |= i2_rem_mask;
                    }
                }
            }
        }
        // second pass goes through every odd number
        const largest_hard_prime = PRIMES1000[PRIMES1000.length - 1];
        for (let n1 = largest_hard_prime + 2; n1 < uptoN; n1 += 2) {
            const i1 = Math.floor(n1 / block);
            const i1_rem_mask = 1 << (Math.floor((n1 % block) / 2));
            if ((sieve[i1] & i1_rem_mask) === 0) {
                primes_lst.push(n1);
                for (let n2 = n1 * n1; n2 <= uptoN; n2 += 2 * n1) {
                    const i2 = Math.floor(n2 / block);
                    const i2_rem_mask = 1 << (Math.floor((n2 % block) / 2));
                    if ((sieve[i2] & i2_rem_mask) === 0) {
                        sieve[i2] |= i2_rem_mask;
                    }
                }
            }
        }
        this.primes = PRIMES1000.concat(primes_lst);
    }

    nThPrime(nthPrime: Integer): Prime {
        return this.primes[nthPrime];
    }

    indexOf(candidatePrime: Prime): Integer {
        return Numbers.binarySearch(this.primes, candidatePrime);
    }

    isPrime(candidatePrime: Integer): boolean {
        return (this.indexOf(candidatePrime) >= 0);
    }

    factorise(num: Integer): Prime[] {
        const root: Integer = Math.ceil(Math.sqrt(num));
        const factors: Prime[] = [];
        for (const prime of PRIMES1000) {
            if (prime > root) {
                factors.push(num);
                break;
            }
            while (num % prime === 0) {
                factors.push(prime);
                num /= prime;
            }
            if (num === 1) break;
        }
        return factors;
    }

    toArray(): SortedPrimeArray {
        return this.primes.concat([]);
    }

}

export class Fraction {

    private num: Integer = 1;
    private den: Integer = 1;

    constructor(numerator: Integer, denominator: Integer) {
        this.num = numerator;
        this.den = denominator;
    }

    clone(): Fraction {
        return new Fraction(this.num, this.den);
    }

    reduce(): Fraction {
        const gcd: Integer = Numbers.GCD(this.num, this.den);
        if (gcd > 1) {
            this.num /= gcd;
            this.den /= gcd;
        }
        return this;
    }

    reciprocal(): Fraction {
        [this.num, this.den] = [this.den, this.num];
        return this;
    }

    multiply(fraction: Fraction): Fraction {
        this.num *= fraction.num;
        this.den *= fraction.den;
        return this;
    }

    divide(fraction: Fraction): Fraction {
        this.multiply(fraction.clone().reciprocal());
        return this;
    }

    add(fraction: Fraction): Fraction {
        this.num = this.num * fraction.den + fraction.num * this.den;
        this.den = this.den * fraction.den;
        return this;
    }

    subtract(fraction: Fraction): Fraction {
        this.num = this.num * fraction.den - fraction.num * this.den;
        this.den = this.den * fraction.den;
        return this;
    }

    toString(): string {
        return `(${this.num}/${this.den})`;
    }

}

export class ComplexNumber {

    private real: bigint = 0n;
    private imaginary: bigint = 0n;

    constructor(real: bigint, imaginary: bigint) {
        this.real = real;
        this.imaginary = imaginary;
    }

    realValue(): bigint {
        return this.real;
    }

    imaginaryValue(): bigint {
        return this.imaginary;
    }

    clone(): ComplexNumber {
        return new ComplexNumber(this.real, this.imaginary);
    }

    conjugate(): ComplexNumber {
        this.imaginary *= -1n;
        return this;
    }

    multiply(complex: ComplexNumber): ComplexNumber {
        const tmp: bigint = this.real * complex.real - this.imaginary * complex.imaginary;
        this.imaginary = this.real * complex.imaginary + this.imaginary * complex.real;
        this.real = tmp;
        return this;
    }

    toString() {
        return `(${this.real}${this.imaginary < 0 ? "" : "+"}${this.imaginary}i)`;
    }

}

export class PowerNumber {

    private val: Integer = 1;
    private num: Map<Prime, Integer> = new Map();

    constructor(base: Prime = 1, power: Integer = 1) {
        this.num.set(base, power);
        this.val = Math.pow(base, power);
    }

    clone(): PowerNumber {
        return new PowerNumber().multiply(this);
    }

    multiply(pn: PowerNumber): PowerNumber {
        for (const [base, power] of pn.pairs()) {
            const curPow: Integer = this.num.get(base) ?? 0;
            this.num.set(base, curPow + power);
        }
        this.val *= pn.value();
        return this;
    }

    divide(pn: PowerNumber): PowerNumber {
        for (const [base, power] of pn.pairs()) {
            const curPow: Integer = this.num.get(base) ?? 0;
            this.num.set(base, curPow - power);
        }
        this.val /= pn.value();
        return this;
    }

    mul(base: Prime, power: Integer): PowerNumber {
        const curPow: Integer = this.num.get(base) ?? 0;
        this.num.set(base, curPow + power);
        return this;
    }

    div(base: Prime, power: Integer): PowerNumber {
        const curPow: Integer = this.num.get(base) ?? 0;
        this.num.set(base, curPow - power);
        return this;
    }

    mulBases(bases: Prime[]): PowerNumber {
        for (const base of bases) {
            const curPow: Integer = this.num.get(base) ?? 0;
            this.num.set(base, curPow + 1);
        }
        return this;
    }

    divisibleBases(bases: Prime[]): boolean {
        for (const base of bases) {
            if (base === 1) continue;
            const curPow: Integer = this.num.get(base) ?? 0;
            if (curPow < 1) return false;
        }
        return true;
    }

    divBases(bases: Prime[]): PowerNumber {
        for (const base of bases) {
            const curPow: Integer = this.num.get(base) ?? 0;
            this.num.set(base, curPow - 1);
        }
        return this;
    }

    getPower(base: Prime): Integer {
        return this.num.get(base) as Integer;
    }

    value(): Integer {
        return this.val;
    }

    pairs(): Map<Prime, Integer> {
        return new Map(this.num);
    }

    toString(): string {
        let str: string = "";
        for (const [base, power] of this.num) {
            if (base < 2) continue;
            if (power == 0) continue;
            str += ` ${base}^(${power})`;
        }
        return `( ${this.val} =${str} )`;
    }

}