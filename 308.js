"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
var E308;
(function (E308) {
    const TargetPrimePower = 104743;
    const primes = new common_1.PrimeNumbers(1000);
    const numers = [17, 78, 19, 23, 29, 77, 95, 77, 1, 11, 13, 15, 1, 55];
    const denoms = [91, 85, 51, 38, 33, 29, 23, 19, 17, 13, 11, 2, 7, 1];
    const facNumers = numers.map(n => primes.factorise(n));
    const facDenoms = denoms.map(n => primes.factorise(n));
    function brute() {
        const paths = new Map();
        for (let i = 0; i < numers.length; i++) {
            paths.set(i, new Set());
        }
        const pn = new common_1.PowerNumber(2, 1);
        let lastInd = -1;
        let cnt = 0;
        while (cnt < 1e8) {
            for (let ind = 0; ind < denoms.length; ind++) {
                if (pn.divisibleBases(facDenoms[ind])) {
                    pn.mulBases(facNumers[ind]);
                    pn.divBases(facDenoms[ind]);
                    // console.log(cnt, lastInd, ind, facNumers[ind], facDenoms[ind], pn.toString());
                    if (lastInd > -1) {
                        paths.get(lastInd).add(ind);
                    }
                    lastInd = ind;
                    break;
                }
            }
            cnt++;
        }
        for (let i = 0; i < 14; i++) {
            console.log(`${i} ${common_1.Numbers.SortAsc(Array.from(paths.get(i)))}`);
        }
    }
    E308.brute = brute;
    /**
     *  0 => 1,2,8
        1 => 0,9
        2 => 3
        3 => 6
        4 => 5
        5 => 4,10
        6 => 3,7
        7 => 4,10
        8 => 11
        9 => 4
        10 => 0
        11 => 11,12,13
        12 => 12,13
        13 => 4

        3^-1 17^-1 2^-1 23^+1
for n in 2^n
2^(-n) 5^(+n)
7^+1  11^+1  19^-1
     */
    const f2PN = new common_1.PowerNumber().mul(3, -1).mul(17, -1).mul(2, -1).mul(23, 1).mul(7, 1).mul(11, 1).mul(19, -1);
    function wheel(pownum, frac) {
        const startTime = new Date().getMilliseconds();
        let cnt = 0;
        while (cnt < 3e9) {
            cnt++;
            // console.log(cnt-1,frac,pownum);
            switch (frac) {
                case 0:
                    pownum.mulBases(facNumers[frac]).divBases(facDenoms[frac]);
                    frac = [1, 2, 8].find(f => pownum.divisibleBases(facDenoms[f]));
                    break;
                case 1:
                    pownum.mulBases(facNumers[frac]).divBases(facDenoms[frac]);
                    frac = [0, 9].find(f => pownum.divisibleBases(facDenoms[f]));
                    break;
                case 2:
                    const diffPow = pownum.getPower(2) - 1;
                    f2PN.mul(2, -diffPow).mul(5, diffPow);
                    pownum.multiply(f2PN);
                    cnt += 3 + 2 * diffPow;
                    frac = [4, 10].find(f => pownum.divisibleBases(facDenoms[f]));
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
                    frac = [4, 10].find(f => pownum.divisibleBases(facDenoms[f]));
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
                    let twopower = true;
                    const powernums = pownum.pairs();
                    for (const [base, power] of powernums) {
                        // console.log(base, power);
                        if (base < 3)
                            continue;
                        if (power != 0) {
                            twopower = false;
                            break;
                        }
                    }
                    if (twopower) {
                        const secs = (new Date().getMilliseconds() - startTime) / 1000;
                        console.log(`2power=${powernums.get(2)} cnt=${cnt} time=${secs} secconds`);
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
                    frac = [11, 12, 13].find(f => pownum.divisibleBases(facDenoms[f]));
                    break;
                case 12:
                    pownum.mulBases(facNumers[frac]).divBases(facDenoms[frac]);
                    frac = [12, 13].find(f => pownum.divisibleBases(facDenoms[f]));
                    break;
                case 13:
                    pownum.mulBases(facNumers[frac]).divBases(facDenoms[frac]);
                    frac = 4;
                    break;
                default:
            }
        }
    }
    E308.wheel = wheel;
    function run() {
        for (let i = 0; i < numers.length; i++) {
            console.log(`(${facNumers[i]})/(${facDenoms[i]})`);
        }
        wheel(new common_1.PowerNumber(2, 1), 11);
    }
    E308.run = run;
})(E308 || (E308 = {}));
E308.run();
