
import { Integer, Numbers } from "./common";

namespace E240 {

    const DiceCount: Integer = parseInt(process.argv[2] ?? "5");
    const FaceCount: Integer = parseInt(process.argv[3] ?? "6");
    const HighCount: Integer = parseInt(process.argv[4] ?? "3");
    const SumTarget: Integer = parseInt(process.argv[5] ?? "15");

    const solutions: Integer[][] = [];

    function find(diceSum: Integer, dicePos: Integer, diceNums: Integer[]): bigint {
        const prevDiceVal: Integer = diceNums[dicePos - 1];
        if (dicePos == DiceCount - 1) {
            const solution: Integer = SumTarget - diceSum;
            if (prevDiceVal <= solution && solution <= FaceCount) {
                const dices = diceNums.concat(solution);
                // solutions.push(dices);
                const permutations: bigint = Numbers.Permutations(dices);
                // console.log(permutations, dices);
                return permutations;
            }
            return 0n;
        }
        let cnt: bigint = 0n;
        for (let thisDiceVal = prevDiceVal; thisDiceVal <= FaceCount; thisDiceVal++) {
            const newDiceSum: Integer = (dicePos >= DiceCount - HighCount) ? diceSum + thisDiceVal : 0;
            if (newDiceSum > SumTarget) continue;
            cnt += find(newDiceSum, dicePos + 1, diceNums.concat(thisDiceVal))
        }
        return cnt;
    }

    export function run(): bigint {
        console.log(`Params :: DiceCount=${DiceCount} FaceCount=${FaceCount} HighCount=${HighCount} SumTarget=${SumTarget}`);
        let solutionCount: bigint = 0n;
        for (let i = 1; i <= FaceCount; i++) {
            const diceNums: Integer[] = [i];
            const result: bigint = find(0, 1, diceNums);
            solutionCount += result;
            // console.log(result);

        }
        // console.log(solutions);
        return solutionCount;
    }

}

console.log(E240.run());