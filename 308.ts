
import { Integer, Numbers, PRIMES1000, PowerNumber, Prime, PrimeNumbers } from "./common";

namespace E308 {

    const TargetPrimePower: Integer = 104743;

    const IND02: Integer = 0;
    const IND03: Integer = 1;
    const IND05: Integer = 2;
    const IND07: Integer = 3;
    const IND11: Integer = 4;
    const IND13: Integer = 5;
    const IND17: Integer = 6;
    const IND19: Integer = 7;
    // const IND23: Integer = 8;
    // const IND29: Integer = 9;

    const PowerNum: Integer[] = new Array(8).fill(0);

    function PowerNumString(): string {
        let str: string = "";
        for (let i = 0; i < PowerNum.length; i++) {
            str += `${PRIMES1000[i]}^(${PowerNum[i]}) `;
        }
        return str;
    }

    export function stepCount(fracIndex: Integer): void {
        let cnt: Integer = 0;
        while (cnt < 1e3) {
            console.log(`cnt=${cnt} frac=${fracIndex} ${PowerNumString()}`);
            switch (fracIndex) {
                case 0:
                    const pow07: Integer = PowerNum[IND07];
                    const pow13: Integer = PowerNum[IND13];
                    if (pow07 > 0 && pow13 > 0) {
                        if (pow07 <= pow13) {
                            // this counts the steps for the repeated 0-1-0-1 cycles
                            const steps: Integer = pow07;
                            PowerNum[IND02] += steps;
                            PowerNum[IND03] += steps;
                            PowerNum[IND05] -= steps;
                            PowerNum[IND07] -= steps;
                            // frac 9
                            PowerNum[IND11] += 1;
                            PowerNum[IND13] -= 1;
                            fracIndex = 4;
                            cnt += 2 * steps + 1;
                        } else {
                            // this counts the steps for the repeated 0-1-0-1 cycles (plus on 0 execution)
                            const steps: Integer = pow13;
                            PowerNum[IND02] += steps;
                            PowerNum[IND03] += steps;
                            PowerNum[IND05] -= steps;
                            PowerNum[IND07] -= steps;
                            fracIndex = 0;
                            cnt += steps;
                        }
                    } else {
                        PowerNum[IND07] -= 1;
                        PowerNum[IND13] -= 1;
                        PowerNum[IND17] += 1;
                        if (PowerNum[IND03] > 0 && PowerNum[IND17] > 0) {
                            fracIndex = 2;
                        } else if (PowerNum[IND17] > 0) {
                            fracIndex = 8;
                        } else {
                            throw `case 0 :: ${PowerNum}`;
                        }
                        cnt += 1;
                    }
                    break;
                case 2: 
                    {
                        // frac 2
                        PowerNum[IND19] += 1;
                        PowerNum[IND13] -= 1;
                        PowerNum[IND17] -= 1;
                        // cycle of frac 3-6-3-6
                        const steps: Integer = PowerNum[IND02];
                        PowerNum[IND05] += steps;
                        PowerNum[IND02] -= steps;
                        // frac 7
                        PowerNum[IND07] += 1;
                        PowerNum[IND11] += 1;
                        PowerNum[IND19] -= 1;
                        if (PowerNum[IND03] > 0 && PowerNum[IND11] > 0) {
                            fracIndex = 4;
                        } else if (PowerNum[IND11] > 0) {
                            PowerNum[IND11] -= 1;
                            PowerNum[IND13] += 1;
                            fracIndex = 0;
                            cnt += 1;
                        }
                        cnt += steps + 1;
                    }
                    break;
                case 4:
                    {
                        // this counts the steps for the repeated 4-5-4-5 cycles
                        const steps: Integer = PowerNum[IND03];
                        PowerNum[IND03] -= steps;
                        PowerNum[IND07] += steps;
                        // goes to frac 10;
                        PowerNum[IND11] -= 1;
                        PowerNum[IND13] += 1;
                        fracIndex = 0;
                        cnt += 2 * steps + 1;
                    }
                    break;
                case 8:
                    {
                        PowerNum[IND17] -= 1;
                        fracIndex = 11;
                        cnt++;
                        if (PowerNum.slice(1).every(v => v === 0)) {
                            console.log(`cnt=${cnt} power2=${PowerNum[IND02]}`);
                        }
                    }
                    break;
                case 11:
                    {
                        // frac 11
                        const steps11: Integer = PowerNum[IND02];
                        PowerNum[IND02] -= steps11;
                        PowerNum[IND03] += steps11;
                        PowerNum[IND05] += steps11;
                        // frac 12 (conditional)
                        const steps12: Integer = PowerNum[IND07];
                        if (steps12 > 0) {
                            PowerNum[IND07] -= steps12;
                            cnt += steps12;
                        }
                        // frac 13
                        PowerNum[IND05] += 1;
                        PowerNum[IND11] += 1;
                        fracIndex = 4;
                        cnt += steps11 + 1;
                    }
                    break;
                default:
                    throw `error ${cnt} ${PowerNum}`;
            }
        }
    }

    export function run(): void {
        PowerNum[IND02] = 1;
        stepCount(11);
    }

    const primes: PrimeNumbers = new PrimeNumbers(1000);

    const numers: Integer[] = [17, 78, 19, 23, 29, 77, 95, 77, 1, 11, 13, 15, 1, 55];
    const denoms: Integer[] = [91, 85, 51, 38, 33, 29, 23, 19, 17, 13, 11, 2, 7, 1];

    const facNumers: Prime[][] = numers.map(n => primes.factorise(n));
    const facDenoms: Prime[][] = denoms.map(n => primes.factorise(n));


    export function brute(): void {
        const paths: Map<Integer, Set<Integer>> = new Map();
        for (let i = 0; i < numers.length; i++) {
            paths.set(i, new Set());
        }
        const pn: PowerNumber = new PowerNumber(2, 1);
        let lastInd: Integer = -1;
        let cnt: Integer = 0;
        while (cnt < 1e8) {
            for (let ind = 0; ind < denoms.length; ind++) {
                if (pn.divisibleBases(facDenoms[ind])) {
                    pn.mulBases(facNumers[ind]);
                    pn.divBases(facDenoms[ind]);
                    // console.log(cnt, lastInd, ind, facNumers[ind], facDenoms[ind], pn.toString());
                    if (lastInd > -1) {
                        (paths.get(lastInd) as Set<Integer>).add(ind);
                    }
                    lastInd = ind;
                    break;
                }
            }
            cnt++;
        }
        for (let i = 0; i < 14; i++) {
            console.log(`${i} ${Numbers.SortAsc(Array.from((paths.get(i) as Set<Integer>)))}`);
        }
    }




    const f2PN: PowerNumber = new PowerNumber().mul(3, -1).mul(17, -1).mul(2, -1).mul(23, 1).mul(7, 1).mul(11, 1).mul(19, -1);

    export function wheel(pownum: PowerNumber, frac: Integer): void {
        const startTime = new Date().getMilliseconds();
        let cnt: Integer = 0
        while (cnt < 3e9) {
            cnt++;
            // console.log(cnt-1,frac,pownum);
            switch (frac) {
                case 0:
                    pownum.mulBases(facNumers[frac]).divBases(facDenoms[frac]);
                    frac = [1, 2, 8].find(f => pownum.divisibleBases(facDenoms[f])) as Integer;
                    break;
                case 1:
                    pownum.mulBases(facNumers[frac]).divBases(facDenoms[frac]);
                    frac = [0, 9].find(f => pownum.divisibleBases(facDenoms[f])) as Integer;
                    break;
                case 2:
                    const diffPow: Integer = pownum.getPower(2) - 1;
                    f2PN.mul(2, -diffPow).mul(5, diffPow);
                    pownum.multiply(f2PN);
                    cnt += 3 + 2 * diffPow;
                    frac = [4, 10].find(f => pownum.divisibleBases(facDenoms[f])) as Integer;
                    break;
                // case 3:
                //     frac = 6;
                //     break;
                case 4:
                    pownum.mulBases(facNumers[frac]).divBases(facDenoms[frac]);
                    frac = 5;
                    break;
                case 5:
                    pownum.mulBases(facNumers[frac]).divBases(facDenoms[frac]);
                    frac = [4, 10].find(f => pownum.divisibleBases(facDenoms[f])) as Integer;
                    break;
                // case 6:
                //     frac = [3,7].find( f => pownum.divisibleBases(facDenoms[f]) ) as Integer;
                //     break;
                // case 7:
                //     frac = [4,10].find( f => pownum.divisibleBases(facDenoms[f]) ) as Integer;
                //     break;
                case 8:
                    pownum.mulBases(facNumers[frac]).divBases(facDenoms[frac]);
                    frac = 11;
                    // check if 2 power reached
                    // console.log(cnt-1, frac, pownum);
                    let twopower: boolean = true;
                    const powernums: Map<Prime, Integer> = pownum.pairs();
                    for (const [base, power] of powernums) {
                        // console.log(base, power);
                        if (base < 3) continue;
                        if (power != 0) {
                            twopower = false;
                            break;
                        }
                    }
                    if (twopower) {
                        const secs: number = (new Date().getMilliseconds() - startTime) / 1000;
                        console.log(`2power=${powernums.get(2)} cnt=${cnt} time=${secs} secconds`)
                    }
                    break;
                case 9:
                    pownum.mulBases(facNumers[frac]).divBases(facDenoms[frac]);
                    frac = 4;
                    break;
                case 10:
                    pownum.mulBases(facNumers[frac]).divBases(facDenoms[frac]);
                    frac = 0;
                    break;
                case 11:
                    pownum.mulBases(facNumers[frac]).divBases(facDenoms[frac]);
                    frac = [11, 12, 13].find(f => pownum.divisibleBases(facDenoms[f])) as Integer;
                    break;
                case 12:
                    pownum.mulBases(facNumers[frac]).divBases(facDenoms[frac]);
                    frac = [12, 13].find(f => pownum.divisibleBases(facDenoms[f])) as Integer;
                    break;
                case 13:
                    pownum.mulBases(facNumers[frac]).divBases(facDenoms[frac]);
                    frac = 4;
                    break;
                default:
            }
        }
    }


}

E308.run();