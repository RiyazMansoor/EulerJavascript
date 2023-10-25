
export type Integer = number;
export type SortedIntegerArray = Integer[];


export namespace Numbers {

    export function GCD(n1: Integer, n2: Integer): Integer {
        while ( n1 ) {
            [n1, n2] = [n2 % n1, n1];
        }
        return n2;
    }


    export function LCM(n1: Integer, n2: Integer): Integer {
        return n1 * n2 / GCD(n1, n2);
    }

    export function SortAsc(nums: Integer[]): SortedIntegerArray {
        return nums.sort( (a, b) => a - b );
    }

    export function SortDsc(nums: Integer[]): SortedIntegerArray {
        return nums.sort( (a, b) => b - a );
    }

    export function Product(nums: Integer[]): Integer {
        return nums.reduce( (pv, cv) => pv * cv, 1 );
    }

    export function Sum(nums: Integer[]): Integer {
        return nums.reduce( (pv, cv) => pv + cv, 0 );
    }

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

}



export namespace Pythagorean {

    export type Triple = {
        a: number,
        b: number,
        c: number
    }
    
    export const RootTriple: Triple = {
        a: 3,
        b: 4,
        c: 5
    }
    
    // returns the next 3 primitive pythagorean triples
    export function NextTriples(triple: Triple): Triple[] {
        const { a, b, c } = triple ;
        const a2 = 2 * a, b2 = 2 * b, c2 = 2 * c, c3 = 3 * c ;
        return [
            { a: (  a - b2 + c2 ), b: (  a2 - b + c2 ), c: (  a2 - b2 + c3 ) }, 
            { a: (  a + b2 + c2 ), b: (  a2 + b + c2 ), c: (  a2 + b2 + c3 ) }, 
            { a: ( -a + b2 + c2 ), b: ( -a2 + b + c2 ), c: ( -a2 + b2 + c3 ) }, 
        ] ;
    }
    
    
}

export class PrimeNumbers {

    private primes: SortedIntegerArray;

    constructor(uptoN: Integer) {
        const hard_primes = [ 3,5,7,11,13,17,19,23,29,31,37,41,43,47 ] ;
        const primes_lst = [] ;
        // used to save memory to generate a greater number of primes
        const block = 64 ;
        const array_length = Math.ceil( uptoN / block ) ;
        const sieve = new Uint32Array( array_length ) ;
        // first pass goes through hard coded set of primes
        for ( const prime of hard_primes ) {
            const i1 = Math.floor( prime / block ) ;
            const i1_rem_mask = 1 << ( Math.floor( ( prime % block ) / 2 ) ) ;
            if ( ( sieve[i1] & i1_rem_mask ) === 0 ) {
                for ( let n2 = prime * prime ; n2 < uptoN ; n2 += 2 * prime ) {
                    const i2 = Math.floor( n2 / block ) ;
                    const i2_rem_mask = 1 << ( Math.floor( ( n2 % block ) / 2 ) ) ;
                    if ( ( sieve[i2] & i2_rem_mask ) === 0 ) {
                        sieve[i2] |= i2_rem_mask ;
                    }
                }
            }
        }
        // second pass goes through every odd number
        const largest_hard_prime = hard_primes[hard_primes.length-1] ;
        for ( let n1 = largest_hard_prime + 2 ; n1 < uptoN ; n1 += 2 ) {
            const i1 = Math.floor( n1 / block ) ;
            const i1_rem_mask = 1 << ( Math.floor( ( n1 % block ) / 2 ) ) ;
            if ( ( sieve[i1] & i1_rem_mask ) === 0 ) {
                primes_lst.push( n1 ) ;
                for ( let n2 = n1 * n1 ; n2 <= uptoN ; n2 += 2 * n1 ) {
                    const i2 = Math.floor( n2 / block ) ;
                    const i2_rem_mask = 1 << ( Math.floor( ( n2 % block ) / 2 ) ) ;
                    if ( ( sieve[i2] & i2_rem_mask ) === 0 ) {
                        sieve[i2] |= i2_rem_mask ;
                    }
                }
            }
        }
        this.primes = [ 2, ...hard_primes ].concat(primes_lst);
    }

    nThPrime(nthPrime: Integer): Integer {
        return this.primes[nthPrime];
    }

    indexOf(candidatePrime: Integer): Integer {
        return Numbers.binarySearch(this.primes, candidatePrime);
    }

    isPrime(candidatePrime: Integer): boolean {
        return (this.indexOf(candidatePrime) >= 0);
    }

    toArray(): SortedIntegerArray {
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