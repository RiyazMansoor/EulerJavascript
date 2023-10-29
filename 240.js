"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
var E240;
(function (E240) {
    const DiceCount = parseInt(process.argv[2] ?? "5");
    const FaceCount = parseInt(process.argv[3] ?? "6");
    const HighCount = parseInt(process.argv[4] ?? "3");
    const SumTarget = parseInt(process.argv[5] ?? "15");
    const solutions = [];
    function find(diceSum, dicePos, diceNums) {
        const prevDiceVal = diceNums[dicePos - 1];
        if (dicePos == DiceCount - 1) {
            const solution = SumTarget - diceSum;
            if (prevDiceVal <= solution && solution <= FaceCount) {
                const dices = diceNums.concat(solution);
                // solutions.push(dices);
                const permutations = common_1.Numbers.Permutations(dices);
                // console.log(permutations, dices);
                return permutations;
            }
            return 0n;
        }
        let cnt = 0n;
        for (let thisDiceVal = prevDiceVal; thisDiceVal <= FaceCount; thisDiceVal++) {
            const newDiceSum = (dicePos >= DiceCount - HighCount) ? diceSum + thisDiceVal : 0;
            if (newDiceSum > SumTarget)
                continue;
            cnt += find(newDiceSum, dicePos + 1, diceNums.concat(thisDiceVal));
        }
        return cnt;
    }
    function run() {
        console.log(`Params :: DiceCount=${DiceCount} FaceCount=${FaceCount} HighCount=${HighCount} SumTarget=${SumTarget}`);
        let solutionCount = 0n;
        for (let i = 1; i <= FaceCount; i++) {
            const diceNums = [i];
            const result = find(0, 1, diceNums);
            solutionCount += result;
            // console.log(result);
        }
        // console.log(solutions);
        return solutionCount;
    }
    E240.run = run;
})(E240 || (E240 = {}));
console.log(E240.run());
