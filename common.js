"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PowerNumber = exports.ComplexNumber = exports.Fraction = exports.PrimeNumbers = exports.Util = exports.Set = exports.Pythagorean = exports.Numbers = exports.PRIMES1000 = void 0;
/**
 * Primes are used extensively.
 * Hardcoding the initial primes for efficiency.
 */
exports.PRIMES1000 = [
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
var Numbers;
(function (Numbers) {
    /**
     * Returns the mathemtical GCD or HCF of the supplied integers.
     * @nums array of integers
     * @return Greatest Common Divisor of @nums
     */
    function GCD(...nums) {
        function gcd(n1, n2) {
            while (n1) {
                [n1, n2] = [n2 % n1, n1];
            }
            return n2;
        }
        let lastGCD = nums[0];
        for (let i = 1; i < nums.length && lastGCD > 1; i++) {
            lastGCD = gcd(lastGCD, nums[i]);
        }
        return lastGCD;
    }
    Numbers.GCD = GCD;
    /**
     * Returns the mathemtical LCM of the supplied integers.
     * @nums array of integers
     * @return Lowest Common Multiple of @nums
     */
    function LCM(...nums) {
        let lastLCM = nums[0];
        for (let i = 1; i < nums.length; i++) {
            lastLCM = lastLCM * nums[i] / GCD(lastLCM, nums[i]);
        }
        return lastLCM;
    }
    Numbers.LCM = LCM;
    /**
     * Ascending sorts an array of <b>Integer</b> numbers.
     * @param nums array of integers
     * @returns array sorted in ascending order
     */
    function SortAsc(nums) {
        return nums.sort((a, b) => a - b);
    }
    Numbers.SortAsc = SortAsc;
    /**
     * Descending sorts an array of <b>Integer</b> numbers.
     * @param nums array of integers
     * @returns array sorted in descending order
     */
    function SortDsc(nums) {
        return nums.sort((a, b) => b - a);
    }
    Numbers.SortDsc = SortDsc;
    /**
     * Returns the product of an array of <b>Integer</b> numbers.
     * @param nums array of integers
     * @returns product of array numbers
     */
    function Product(nums) {
        return nums.reduce((pv, cv) => pv * cv, 1);
    }
    Numbers.Product = Product;
    /**
     * Returns the sum of an array of <b>Integer</b> numbers.
     * @param nums array of integers
     * @returns sum of array numbers
     */
    function Sum(nums) {
        return nums.reduce((pv, cv) => pv + cv, 0);
    }
    Numbers.Sum = Sum;
    /**
     * Returns the index of the <b>target</b> within the array.
     * @param nums array of ascending sorted integers
     * @param target number to find
     * @returns index of <b>target</b> or negative if not found
     */
    function binarySearch(nums, target) {
        let l_index = 0;
        let r_index = nums.length - 1;
        // if this condition failes, number not found, return -1
        while (l_index <= r_index) {
            const m_index = Math.floor((l_index + r_index) / 2);
            // return index if number found
            if (nums[m_index] === target) {
                return m_index;
            }
            // if number not found, move pointers
            if (target < nums[m_index]) {
                r_index = m_index - 1;
            }
            else {
                l_index = m_index + 1;
            }
        }
        return -1;
    }
    Numbers.binarySearch = binarySearch;
    /**
     * https://codybonney.com/leetcode-search-insert-position-solution-using-typescript/
     * Search Insert Position
     * Given a sorted array and a target value, return
     * the index if the target is found. If not, return
     * the index where it would be if it were inserted in order.
     *
     * Time Complexity: O(log(n))
     * Space Complexity: O(1)
     *
     * searchInsert([1,3,5,6], 5) // 2
     * searchInsert([1,3,5,6], 0) // 0
     */
    function indexOfSorted(target, nums) {
        let l_index = 0;
        let r_index = nums.length - 1;
        // complete a binary search
        while (l_index <= r_index) {
            // set pivot point half way between left and right
            const m_index = Math.floor((l_index + r_index) / 2);
            // found target
            if (nums[m_index] === target) {
                return m_index;
            }
            // eliminate search space on the right
            else if (nums[m_index] > target) {
                r_index = m_index - 1;
            }
            // eliminate search space on the left
            else {
                l_index = m_index + 1;
            }
        }
        return l_index;
    }
    Numbers.indexOfSorted = indexOfSorted;
    /**
     * Returns the transposed double array.
     * @param matrix double array to transpose
     * @returns transposed double array
     */
    function Transpose(matrix) {
        let result = new Array(matrix[0].length).fill(0).map(() => new Array(matrix.length).fill(0));
        for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < result[0].length; j++) {
                result[i][j] = matrix[j][i];
            }
        }
        return result;
    }
    Numbers.Transpose = Transpose;
    /**
     * Returns the factorial of a <b>Integer</b> number.
     * @param num number to calculate factorial
     * @returns factorial of <b>num</b>
     */
    function Factorial(num, cutoff = 2) {
        let result = 1n;
        for (let i = cutoff; i <= num; i++) {
            result *= BigInt(i);
        }
        return result;
    }
    Numbers.Factorial = Factorial;
    /**
     * Returns the frequence of occurence.
     * @param nums array of integers
     * @returns frequence of occurrence
     */
    function Frequency(nums) {
        const freq = new Map();
        nums.forEach(val => freq.set(val, (freq.has(val) ? freq.get(val) : 0) + 1));
        return freq;
    }
    Numbers.Frequency = Frequency;
    /**
     * Returns the number of unique permutations for <b>nums</b> array.
     * That is, repeated elements in <b>nums</b> are discounted.
     * @param nums array of integers
     * @returns returns the number of unique permutations
     */
    function Permutations(nums) {
        // count repetitions
        const freq = Frequency(nums);
        const repeats = Numbers.SortAsc(Array.from(freq.values()).filter(val => val > 1));
        const max = repeats.pop() ?? 1;
        let result = Factorial(nums.length, max + 1);
        repeats.forEach(val => result /= Factorial(val));
        return result;
    }
    Numbers.Permutations = Permutations;
})(Numbers || (exports.Numbers = Numbers = {}));
/**
 * This namespace provides types, constants and functions relating to the Pythagorean Theorem.
 */
var Pythagorean;
(function (Pythagorean) {
    /**
     * Root triple for all pythagorean triples.
     */
    Pythagorean.RootTriple = {
        a: 3,
        b: 4,
        c: 5
    };
    /**
     * Returns the next 3 triples to the supplied <b>triple</b>.
     * @param triple pythagorean triple
     * @returns returns the next 3 triples
     */
    function NextTriples(triple) {
        const { a, b, c } = triple;
        const a2 = 2 * a, b2 = 2 * b, c2 = 2 * c, c3 = 3 * c;
        return [
            { a: (a - b2 + c2), b: (a2 - b + c2), c: (a2 - b2 + c3) },
            { a: (a + b2 + c2), b: (a2 + b + c2), c: (a2 + b2 + c3) },
            { a: (-a + b2 + c2), b: (-a2 + b + c2), c: (-a2 + b2 + c3) },
        ];
    }
    Pythagorean.NextTriples = NextTriples;
})(Pythagorean || (exports.Pythagorean = Pythagorean = {}));
/**
 * This namespace provides types, constants and functions relating to <b>Set</b> operations.
 */
var Set;
(function (Set) {
    /**
     * Returns the powerset of supplied array.
     * TODO: type firming for Integer
     * @param nums array of integers
     * @returns powerset of <b>nums</b>
     */
    function Powerset(nums) {
        return nums.reduce((a, v) => a.concat(a.map((r) => [v].concat(r))), [[]]);
    }
    Set.Powerset = Powerset;
    function SetsOfSize(nums, size) {
        const results = [];
        function find(pos, path) {
            if (pos == size) {
                results.push(path);
                return;
            }
        }
        return results;
    }
    Set.SetsOfSize = SetsOfSize;
    function Combinations(supersetSize, subsetSize) {
        const combinations = [];
        const stack = [];
        let index = 0;
        while (true) {
            if (stack.length === subsetSize) {
                combinations.push([...stack]);
                index = stack.pop() + 1;
            }
            if (index >= supersetSize) {
                if (stack.length === 0)
                    break;
                index = stack.pop() + 1;
            }
            else {
                stack.push(index);
                index++;
            }
        }
        return combinations;
    }
    Set.Combinations = Combinations;
})(Set || (exports.Set = Set = {}));
var Util;
(function (Util) {
    const fs = require('fs');
    function readFile(filename) {
        return fs.readFileSync(filename, 'utf8');
    }
    Util.readFile = readFile;
    function csvToStrMatrix(csv) {
        return csv.split("\n").map(line => line.split(",").map(data => data.trim()));
    }
    Util.csvToStrMatrix = csvToStrMatrix;
    function csvToIntMatrix(csv) {
        return csv.split("\n").map(line => line.split(",").map(data => parseInt(data.trim())));
    }
    Util.csvToIntMatrix = csvToIntMatrix;
})(Util || (exports.Util = Util = {}));
class PrimeNumbers {
    primes;
    constructor(uptoN) {
        // const hard_primes = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
        const primes_lst = [];
        // used to save memory to generate a greater number of primes
        const block = 64;
        const array_length = Math.ceil(uptoN / block);
        const sieve = new Uint32Array(array_length);
        // first pass goes through hard coded set of primes
        for (const prime of exports.PRIMES1000.slice(1)) {
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
        const largest_hard_prime = exports.PRIMES1000[exports.PRIMES1000.length - 1];
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
        this.primes = exports.PRIMES1000.concat(primes_lst);
    }
    nThPrime(nthPrime) {
        return this.primes[nthPrime];
    }
    indexOf(candidatePrime) {
        return Numbers.binarySearch(this.primes, candidatePrime);
    }
    isPrime(candidatePrime) {
        return (this.indexOf(candidatePrime) >= 0);
    }
    factorise(num) {
        const root = Math.ceil(Math.sqrt(num));
        const factors = [];
        for (const prime of exports.PRIMES1000) {
            if (prime > root) {
                factors.push(num);
                break;
            }
            while (num % prime === 0) {
                factors.push(prime);
                num /= prime;
            }
            if (num === 1)
                break;
        }
        return factors;
    }
    toArray() {
        return this.primes.concat([]);
    }
}
exports.PrimeNumbers = PrimeNumbers;
class Fraction {
    num = 1;
    den = 1;
    constructor(numerator, denominator) {
        this.num = numerator;
        this.den = denominator;
    }
    clone() {
        return new Fraction(this.num, this.den);
    }
    reduce() {
        const gcd = Numbers.GCD(this.num, this.den);
        if (gcd > 1) {
            this.num /= gcd;
            this.den /= gcd;
        }
        return this;
    }
    reciprocal() {
        [this.num, this.den] = [this.den, this.num];
        return this;
    }
    multiply(fraction) {
        this.num *= fraction.num;
        this.den *= fraction.den;
        return this;
    }
    divide(fraction) {
        this.multiply(fraction.clone().reciprocal());
        return this;
    }
    add(fraction) {
        this.num = this.num * fraction.den + fraction.num * this.den;
        this.den = this.den * fraction.den;
        return this;
    }
    subtract(fraction) {
        this.num = this.num * fraction.den - fraction.num * this.den;
        this.den = this.den * fraction.den;
        return this;
    }
    toString() {
        return `(${this.num}/${this.den})`;
    }
}
exports.Fraction = Fraction;
class ComplexNumber {
    real = 0n;
    imaginary = 0n;
    constructor(real, imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }
    realValue() {
        return this.real;
    }
    imaginaryValue() {
        return this.imaginary;
    }
    clone() {
        return new ComplexNumber(this.real, this.imaginary);
    }
    conjugate() {
        this.imaginary *= -1n;
        return this;
    }
    multiply(complex) {
        const tmp = this.real * complex.real - this.imaginary * complex.imaginary;
        this.imaginary = this.real * complex.imaginary + this.imaginary * complex.real;
        this.real = tmp;
        return this;
    }
    toString() {
        return `(${this.real}${this.imaginary < 0 ? "" : "+"}${this.imaginary}i)`;
    }
}
exports.ComplexNumber = ComplexNumber;
class PowerNumber {
    val = 1;
    num = new Map();
    constructor(base = 1, power = 1) {
        this.num.set(base, power);
        this.val = Math.pow(base, power);
    }
    clone() {
        return new PowerNumber().multiply(this);
    }
    multiply(pn) {
        for (const [base, power] of pn.pairs()) {
            const curPow = this.num.get(base) ?? 0;
            this.num.set(base, curPow + power);
        }
        this.val *= pn.value();
        return this;
    }
    divide(pn) {
        for (const [base, power] of pn.pairs()) {
            const curPow = this.num.get(base) ?? 0;
            this.num.set(base, curPow - power);
        }
        this.val /= pn.value();
        return this;
    }
    mul(base, power) {
        const curPow = this.num.get(base) ?? 0;
        this.num.set(base, curPow + power);
        return this;
    }
    div(base, power) {
        const curPow = this.num.get(base) ?? 0;
        this.num.set(base, curPow - power);
        return this;
    }
    mulBases(bases) {
        for (const base of bases) {
            const curPow = this.num.get(base) ?? 0;
            this.num.set(base, curPow + 1);
        }
        return this;
    }
    divisibleBases(bases) {
        for (const base of bases) {
            if (base === 1)
                continue;
            const curPow = this.num.get(base) ?? 0;
            if (curPow < 1)
                return false;
        }
        return true;
    }
    divBases(bases) {
        for (const base of bases) {
            const curPow = this.num.get(base) ?? 0;
            this.num.set(base, curPow - 1);
        }
        return this;
    }
    getPower(base) {
        return this.num.get(base);
    }
    value() {
        return this.val;
    }
    pairs() {
        return new Map(this.num);
    }
    toString() {
        let str = "";
        for (const [base, power] of this.num) {
            if (base < 2)
                continue;
            if (power == 0)
                continue;
            str += ` ${base}^(${power})`;
        }
        return `( ${this.val} =${str} )`;
    }
}
exports.PowerNumber = PowerNumber;
//# sourceMappingURL=common.js.map