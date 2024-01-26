
import { Integer, Prime, PrimeNumbers } from "./common";

const FibNums: Integer[] = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368];

const Primes: Prime[] = new PrimeNumbers(1e5).toArray();

type PNum = {
    prime: Prime,
    power: Integer,
}


/*
// Check if possible subset with 
// given sum is possible or not
function subsetSum(a, n, sum) {

    // If the sum is zero it means 
    // we got our expected sum
    if (sum == 0)
        return 1;

    if (n <= 0)
        return 0;

    // If the value is not -1 it means it 
    // already call the function 
    // with the same value.
    // it will save our from the repetition.
    if (tab[n - 1][sum] != -1)
        return tab[n - 1][sum];

    // If the value of a[n-1] is
    // greater than the sum.
    // we call for the next value
    if (a[n - 1] > sum)
        return tab[n - 1][sum] = subsetSum(a, n - 1, sum);
    else {

        // Here we do two calls because we 
        // don't know which value is 
        // full-fill our criteria
        // that's why we doing two calls
        return tab[n - 1][sum] = subsetSum(a, n - 1, sum) ||
            subsetSum(a, n - 1, sum - a[n - 1]);
    }
}

// Driver Code

// Storing the value -1 to the matrix
let tab = Array(2000).fill().map(() => Array(2000).fill(-1));

let n = 5;
let a = [1, 5, 3, 7, 4];
let sum = 12;

if (subsetSum(a, n, sum)) {
    document.write("YES" + "<br>");
}
else {
    document.write("NO" + "<br>");
}

// This code is contributed by Potta Lokesh
*/

function run(): void {
    let sum: Integer = 2 + 2 + 3;
    for (const fibnum of FibNums.slice(3)) {

    }
    console.log(`answer=${sum}`);
}
