
import { Integer, Numbers, Util } from "./../common";

namespace E83 {

    const sampleMatrix: Integer[][] = [
        [131, 673, 234, 103, 18],
        [201, 96, 342, 965, 150],
        [630, 803, 746, 422, 111],
        [537, 699, 497, 121, 956],
        [805, 732, 524, 37, 331],
    ];

    const arg2: string = process.argv[2];
    const matrix: Integer[][] = !arg2 ? sampleMatrix : Util.csvToIntMatrix(Util.readFile("./assets/0083_matrix.txt"));
    const minsum: Integer[][] = new Array(matrix.length).fill(0).map( v => new Array(matrix[0].length).fill(1e12));

    const MaxIndex: Integer = matrix.length - 1;

    type Pos = {
        x: Integer,
        y: Integer,
    }

    function stepped(pos: Pos, positions: Pos[]): boolean {
        return positions.findIndex(tpos => tpos.x == pos.x && tpos.y == pos.y) >= 0;
    }

    function stepOptions(sum: Integer, pos: Pos, travelled: Pos[]): Pos[] {
        let options: Pos[] = [];
        if (pos.x > 0) {
            const apos: Pos = { x: pos.x - 1, y: pos.y }
            if (!stepped(apos, travelled)) options.push(apos);
        }
        if (pos.x < MaxIndex) {
            const apos: Pos = { x: pos.x + 1, y: pos.y }
            if (!stepped(apos, travelled)) options.push(apos);
        }
        if (pos.y > 0) {
            const apos: Pos = { x: pos.x, y: pos.y - 1 }
            if (!stepped(apos, travelled)) options.push(apos);
        }
        if (pos.y < MaxIndex) {
            const apos: Pos = { x: pos.x, y: pos.y + 1 }
            if (!stepped(apos, travelled)) options.push(apos);
        }
        options = options.filter( apos => !stepped(apos, travelled) && sum <= minsum[apos.x][apos.y] )
        if (options.length > 1) {
            options.sort( (a, b) => matrix[a.x][a.y] - matrix[b.x][b.y] );
        }
        return options;
    }

    let MinSum: Integer = 1e12;

    function find(sum: Integer, pos: Pos, travelled: Pos[]): void {
        if (pos.x == MaxIndex && pos.y == MaxIndex) {
            console.log(`End Reached :: len=${travelled.length} sum=${sum} min=${MinSum}`);
            if (sum < MinSum) MinSum = sum;
            return;
        }
        if (MinSum < sum) return;
        const options: Pos[] = stepOptions(sum, pos, travelled);
        if (!options.length) return;
        for (const npos of options) {
            minsum[pos.x][pos.y] = sum;
            const nsum: Integer = matrix[npos.x][npos.y] + sum;
            find(nsum, npos, travelled.concat([npos]));
        }
    }

    export function run(): Integer {
        // compute a MinSum
        const transposed: Integer[][] = Numbers.Transpose(matrix);
        const min1: Integer = Numbers.Sum(matrix[0]) + Numbers.Sum(transposed[MaxIndex]);
        const min2: Integer = Numbers.Sum(matrix[MaxIndex]) + Numbers.Sum(transposed[0]);
        MinSum = Math.min(min1, min2);
        // find min path
        const startPos: Pos = { x: 0, y: 0 };
        const startSum: Integer = matrix[startPos.x][startPos.y];
        const startTravelled: Pos[] = [startPos];
        find(startSum, startPos, startTravelled);
        return MinSum;
    }
}

console.log(E83.run());
