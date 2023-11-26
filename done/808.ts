import { Integer, Numbers, PrimeNumbers } from "../common";

const PRIMES: Integer[] = new PrimeNumbers(1e8).toArray();

function digits(num: Integer): Integer[] {
    const digits: Integer[] = [];
    while (num > 0) {
        digits.push(num % 10);
        num = Math.floor(num / 10);
    }
    return digits;
}

function isPalindrom(digits: Integer[]): boolean {
    const chklen: Integer = Math.floor(digits.length / 2);
    for (let s = 0, e = digits.length - 1; s < chklen; s++, e--) {
        if (digits[s] !== digits[e]) return false;
    }
    return true;
}

function reverse(digits: Integer[]): Integer {
    return digits.reverse().reduce( (pv, cv, i) => pv + cv * 10**i, 0 );
}

function run(): void {
    let cnt: Set<Integer> = new Set(), sum: Integer = 0;
    for (const prime of PRIMES) {
        const p2: Integer = prime**2;
        const ds: Integer[] = digits(p2);
        if (isPalindrom(ds)) continue;
        const rv: Integer = reverse(ds);
        if (rv % 2 === 0) continue;
        if (rv < p2) continue;
        const srrv: Integer = Math.floor(Math.sqrt(rv));
        if (srrv**2 != rv) continue;
        const index = Numbers.binarySearch(PRIMES, srrv);
        if (index < 0) continue;
        cnt.add(prime).add(srrv);
        sum += p2 + rv;
        console.log(prime, prime**2, rv, srrv);
        if (cnt.size == 50) break;
    }
    console.log(sum, cnt.size);
}

run();