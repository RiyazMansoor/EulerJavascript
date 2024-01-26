/*
101000  2|1|1
100100  1|3|0
100010  1|3|0

*/

import { Integer } from "./common";

type Seats = boolean[];
type SeatingSignature = string;
type SeatsAvailable = Integer[];

type Seating = {
    seatingSignature: SeatingSignature,
    seatsAvailable: SeatsAvailable,
}

function nextSeatIndexes(seats: Seats): Seating {
    const len: Integer = seats.length - 1;
    // fingerprinting
    const availSpaces: Integer[] = [];
    let availSpaceCnt: Integer = 0;
    // recursing options
    const availSeats1: Integer[] = [];
    const availSeats2: Integer[] = [];
    const availSeats3: Integer[] = [];
    for (let i = 0; i < seats.length; i++) {
        const befSeatAvailable: boolean = (i == 0 || seats[i-1]);
        const aftSeatAvailable: boolean = (i == len || seats[i+1]);
        if (seats[i] && befSeatAvailable && aftSeatAvailable) {
            availSeats1.push(i);
        }
        if (seats[i] && (befSeatAvailable ? !aftSeatAvailable : aftSeatAvailable)) {
            availSeats2.push(i);
        }
        if (seats[i] && !befSeatAvailable && !aftSeatAvailable) {
            availSeats3.push(i);
        }
        // fingerprint
        if (seats[i]) {
            availSpaceCnt++;
        } else {
            if (availSpaceCnt > 0) {
                availSpaces.push(availSpaceCnt);
            }
            availSpaceCnt = 0;
        }
        if (i == len && availSpaceCnt > 0) {
            availSpaces.push(availSpaceCnt);
        }
    }
    let signatures: string[] = [];
    if (seats[len]) {
        signatures.push(`${availSpaces[availSpaces.length-1]}|`);
        availSpaces.pop();
    }
    if (seats[0]) {
        if (availSpaces.length == 0) {
            signatures[0] = `|${signatures[0]}`;
        } else {
            signatures.push(`|${availSpaces[0]}`);
            availSpaces.unshift();
        }
    }
    if (availSpaces.length > 0) {
        signatures.push( availSpaces.sort( (a, b) => b - a).join("-") );
    }
    const signature: string = signatures.join("~");
    const availableSeats: Integer[] = (availSeats1.length > 0 ? availSeats1 : (availSeats2.length > 0 ? availSeats2 : availSeats3));
    // console.log(seats);
    // console.log(signature);
    return {
        seatingSignature: signature,
        seatsAvailable: availableSeats,
    };
}

const CACHE: Map<string, Integer> = new Map();

function find(seats: Seats, depth: Integer = 0): Integer {
    const seating: Seating = nextSeatIndexes(seats);
    if (CACHE.has(seating.seatingSignature)) return CACHE.get(seating.seatingSignature)!;
    // console.log(depth, seats, availableSeats);
    if (seating.seatsAvailable.length == 1) return 1;
    let count: Integer = 0;
    for (const seatIndex of seating.seatsAvailable) {
        const newSeats: Seats = seats.concat([]);
        newSeats[seatIndex] = false;
        count += find(newSeats, depth+1);
    }
    CACHE.set(seating.seatingSignature, count);
    return count;
}

const ARG2: Integer = parseInt(process.argv[2] || "4");

function run(): void {
    const seats: Seats = [];
    for (let i = 0; i < ARG2; i++) {
        seats.push(true);
    }
    console.log(find(seats));
}

run();

/*
Successful 1
function nextSeatIndexes(seats: Seats): Integer[] {
    const availableSeats: Integer[] = [];
    seats.forEach( (seated, index) => {
        if (!seated && (index == 0 || !seats[index-1]) && (index+1 == seats.length || !seats[index+1])) {
            availableSeats.push(index);
        }
    } );
    if (availableSeats.length) return availableSeats;
    seats.forEach( (seated, index) => {
        if (!seated && ((index == 0 || !seats[index-1]) || (index+1 == seats.length || !seats[index+1]))) {
            availableSeats.push(index);
        }
    } );
    if (availableSeats.length) return availableSeats;
    seats.forEach( (seated, index) => {
        if (!seated) {
            availableSeats.push(index);
        }
    } );
    return availableSeats;
}
*/
