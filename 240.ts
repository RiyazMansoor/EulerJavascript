
import { Integer } from "./common";

namespace E240 {

    const DiceCount: Integer = parseInt(process.argv[2] ?? "5");
    const FaceCount: Integer = parseInt(process.argv[3] ?? "6");
    const SumTarget: Integer = parseInt(process.argv[4] ?? "15");

    const solutions: Integer[][] = [];

    function find(diceSum: Integer, dicePos: Integer, diceNums: Integer[]): Integer {
        const prevDiceVal: Integer = diceNums[dicePos - 1];
        if (dicePos == DiceCount - 1) {
            const solution: Integer = SumTarget - diceSum;
            if (prevDiceVal <= solution && solution <= FaceCount) {
                // console.log(prevDiceVal, solution, FaceCount);
                solutions.push(diceNums.concat(solution));
                return 1;
            }
            return 0;
        }
        let cnt: Integer = 0;
        for (let thisDiceVal = prevDiceVal; thisDiceVal <= FaceCount; thisDiceVal++) {
            const newDiceSum: Integer = diceSum + thisDiceVal;
            if (newDiceSum > SumTarget) continue;
            cnt += find(diceSum + thisDiceVal, dicePos + 1, diceNums.concat(thisDiceVal))
        }
        return cnt;
    }

    export function run(): Integer {
        console.log(`Params :: DiceCount=${DiceCount} FaceCount=${FaceCount} SumTarget=${SumTarget}`);
        let solutionCount: Integer = 0;
        for (let i = 1; i <= FaceCount; i++) {
            const diceNums: Integer[] = [i];
            const result: Integer = find(1, 1, diceNums);
            solutionCount += result;
            console.log(result);
    
        }
        console.log(solutions);
        return solutionCount;
    }

}

console.log(E240.run());