// wrong answer = 50355244
// wrong answer = 2341578
// answer = 2325629

import { Float, Integer } from "./common";

const PMNUMBER: Integer = 524287;
const USERMAX: Integer = 1e6;


function* makeCall() {
    const history: Integer[] = []
    for (let k = 1; k <= 55; k++) {
        const val: Integer = (100003 - 200003*k + 300007*(k**3)) % USERMAX;
        history.push(val);
        yield val;
    }
    while (true) {
        const val: Integer = (history[0] + history[31]) % USERMAX;
        history.push(val);
        history.shift();
        yield val;
    }
}

type Phone = Integer;

type Person = {
    phone: Phone,
    circle: Set<Phone>,
}

function newPerson(phone: Phone): Person {
    return {
        phone: phone,
        circle: new Set(),
    }
}

const Persons: Person[] = Array(1e6).fill(0).map( (v, i) => newPerson(i) );

const FriendCircles: Set<Set<Phone>> = new Set();

function addCallers(callerPerson: Person, calledPerson: Person): void {
    const callerSet: Set<Phone> = callerPerson.circle;
    const calledSet: Set<Phone> = calledPerson.circle;
    if (callerSet == calledSet) {
        // nothing to do here
    } else if (!callerSet.size && !calledSet.size) {
        callerSet.add(callerPerson.phone).add(calledPerson.phone);
        callerPerson.circle = callerSet
        calledPerson.circle = callerSet;
        FriendCircles.add(callerSet);
    } else if (!callerSet.size) {
        calledSet.add(callerPerson.phone);
        callerPerson.circle = calledSet;
    } else if (!calledSet.size) {
        callerSet.add(calledPerson.phone);
        calledPerson.circle = callerSet;
    } else {
        let bigSet: Set<Phone> = callerSet, smallSet: Set<Phone> = calledSet;
        if (bigSet.size < smallSet.size) {
            [ bigSet, smallSet ] = [ smallSet, bigSet ]; 
        }
        smallSet.forEach( phone => {
            bigSet.add(phone);
            Persons[phone].circle = bigSet;
        } );
        smallSet.clear();
        FriendCircles.delete(smallSet);
    }
}

function run(): void {
    const callGen = makeCall();
    // let activeUsers: Integer = 0;
    let callCount: Integer = 0;
    let percent: Float = 0;
    while (percent < 0.990000) {
        const callerId: Integer = Number(callGen.next().value);
        const calleeId: Integer = Number(callGen.next().value);
        if (callerId == calleeId) continue;
        const callerPerson: Person = Persons[callerId];
        const calleePerson: Person = Persons[calleeId];
        callCount++;
        if (callerId==PMNUMBER || calleeId==PMNUMBER) {
            console.log(`PM found :: callCount=${callCount} percent=${percent.toFixed(6)}`);
        }
        addCallers(callerPerson, calleePerson);
        percent = Persons[PMNUMBER].circle.size / USERMAX;
        if (callCount % 1e5 === 0) console.log(`callCount=${callCount} percent=${percent.toFixed(6)} circles=${FriendCircles.size}`);
    }
    console.log(`callCount=${callCount} percent=${percent.toFixed(6)} circles=${FriendCircles.size}`);
}

run();
