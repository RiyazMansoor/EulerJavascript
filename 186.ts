// wrong answer = 50355244

import { Integer } from "./common";

const PMNUMBER: Integer = 524287;

function rand(): Integer {
    return Math.floor(Math.random() * 1e9);
}

function* makeCall() {
    const history: Integer[] = []
    for (let k = 1; k < 56; k++) {
        const val: Integer = (100003 - 200003*k + 300007*(k**3)) % 1e6;
        history.push(val);
        yield val;
    }
    while (true) {
        const val: Integer = (history[0] + history[30]) % 1e6;
        history.push(val);
        history.shift();
        yield val;
    }
}

type Person = {
    phone: Integer,
    friends: Set<Integer>,
    pmlinked: boolean,
    visitedId: Integer,
    created: boolean
}

function newPerson(phone: Integer): Person {
    return {
        phone: phone,
        friends: new Set(),
        pmlinked: false,
        visitedId: 0,
        created: false
    }
}

const Persons: Person[] = Array(1e6).fill(0).map( (v, i) => newPerson(i) );

function countFriends(): Integer {
    return Persons.reduce( (pv, cv) => pv + (cv.pmlinked ? 1 : 0), 0 );
}

function pmNonFriends(person: Person, thisVisit: Integer): Person[] {
    const nonFriends: Person[] = Array.from(person.friends).map( id => Persons[id] ).filter( p => !p.pmlinked && p.visitedId != thisVisit );
    nonFriends.forEach( p => p.visitedId = thisVisit);
    return nonFriends;
}

function addPmFriends(person: Person, thisVisit: Integer): Integer {
    const rootPersons: Person[] = [];
    let friends: Person[] = pmNonFriends(person, thisVisit);
    while (friends.length > 0) {
        rootPersons.push(person);
        person = friends[0];
        friends = pmNonFriends(person, thisVisit);
    }
    // if (rootPersons.length > 100) console.log(`primary chain length = ${rootPersons.length}`)
    let cnt: Integer = 0;
    while (rootPersons.length > 0) {
        cnt += addPmFriendsRecursively(rootPersons.pop()!, thisVisit);
    }
    return cnt;
}

function addPmFriendsRecursively(person: Person, thisVisit: Integer): Integer {
    person.pmlinked = true;
    let cnt: Integer = 1;
    let friends: Person[] = pmNonFriends(person, thisVisit);
    while (friends.length === 1) {
        cnt++;
        const friend = friends[0];
        friend.pmlinked = true;
        friends = pmNonFriends(friend, thisVisit);
    }
    if (cnt > 1) console.log(`stacked length=${cnt}`);
    for (const friend of friends) {
        const newFriends: Integer = addPmFriendsRecursively(friend, thisVisit);
        cnt += newFriends;
    }
    return cnt;
}

function run(): void {
    Persons[PMNUMBER].created = true;
    Persons[PMNUMBER].pmlinked = true;
    let callCount: Integer = 0, pplCount: Integer = 1, pmFriendsCount: Integer = 1;
    const callGen = makeCall();
    let percent: number = 0;
    while (percent < 0.9900000) {
        if (percent > 0.98999) {
            console.log(`calls=${callCount} friends=${pmFriendsCount} percent=${percent}`);
        }
        if (callCount %1e6 == 0) {
            const frdCount2: Integer = countFriends();
            console.log(`calls=${callCount} people=${pplCount} friends=${pmFriendsCount}/${frdCount2} percent=${percent}`);
        }
        const callerId: Integer = Number(callGen.next().value);
        const calleeId: Integer = Number(callGen.next().value);
        if (callerId == calleeId) continue;
        // console.log(callerId, Persons[callerId]);
        callCount++;
        let callerPerson: Person = Persons[callerId];
        if (!callerPerson.created) {
            callerPerson.created = true;
            pplCount++;
        }
        let calleePerson: Person = Persons[calleeId];
        if (!calleePerson.created) {
            calleePerson.created = true;
            pplCount++;
        }
        // step 0 - state freeze
        const isCallerFriend = callerPerson.pmlinked;
        const isCalleeFriend = calleePerson.pmlinked;
        // step 1 
        if (isCallerFriend && isCalleeFriend) continue;
        // step 2
        if (isCallerFriend) {
            pmFriendsCount += addPmFriends(calleePerson, rand());
        }
        if (isCalleeFriend) {
            pmFriendsCount += addPmFriends(callerPerson, rand());
        }
        callerPerson.friends.add(calleeId);
        calleePerson.friends.add(callerId);
        percent = pmFriendsCount / pplCount;
    }
    console.log(callCount, pmFriendsCount);
}

run();
