"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var E240;
(function (E240) {
    const DiceCount = parseInt(process.argv[2] ?? "5");
    const FaceCount = parseInt(process.argv[3] ?? "6");
    const SumTarget = parseInt(process.argv[4] ?? "15");
    const solutions = [];
    function find(diceSum, dicePos, diceNums) {
        const prevDiceVal = diceNums[dicePos - 1];
        if (dicePos == DiceCount - 1) {
            const solution = SumTarget - diceSum;
            if (prevDiceVal <= solution && solution <= FaceCount) {
                // console.log(prevDiceVal, solution, FaceCount);
                solutions.push(diceNums.concat(solution));
                return 1;
            }
            return 0;
        }
        let cnt = 0;
        for (let thisDiceVal = prevDiceVal; thisDiceVal <= FaceCount; thisDiceVal++) {
            cnt += find(diceSum + thisDiceVal, dicePos + 1, diceNums.concat(thisDiceVal));
        }
        return cnt;
    }
    function run() {
        console.log(`Params :: DiceCount=${DiceCount} FaceCount=${FaceCount} SumTarget=${SumTarget}`);
        let solutionCount = 0;
        for (let i = 1; i <= FaceCount; i++) {
            const diceNums = [i];
            const result = find(1, 1, diceNums);
            solutionCount += result;
            console.log(result);
        }
        console.log(solutions);
        return solutionCount;
    }
    E240.run = run;
})(E240 || (E240 = {}));
console.log(E240.run());
