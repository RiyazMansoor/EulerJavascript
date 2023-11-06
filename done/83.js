"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./../common");
var E83;
(function (E83) {
    const sampleMatrix = [
        [131, 673, 234, 103, 18],
        [201, 96, 342, 965, 150],
        [630, 803, 746, 422, 111],
        [537, 699, 497, 121, 956],
        [805, 732, 524, 37, 331],
    ];
    const arg2 = process.argv[2];
    const matrix = !arg2 ? sampleMatrix : common_1.Util.csvToIntMatrix(common_1.Util.readFile("./assets/0083_matrix.txt"));
    const minsum = new Array(matrix.length).fill(0).map(v => new Array(matrix[0].length).fill(1e12));
    const MaxIndex = matrix.length - 1;
    function stepped(pos, positions) {
        return positions.findIndex(tpos => tpos.x == pos.x && tpos.y == pos.y) >= 0;
    }
    function stepOptions(sum, pos, travelled) {
        let options = [];
        if (pos.x > 0) {
            const apos = { x: pos.x - 1, y: pos.y };
            if (!stepped(apos, travelled))
                options.push(apos);
        }
        if (pos.x < MaxIndex) {
            const apos = { x: pos.x + 1, y: pos.y };
            if (!stepped(apos, travelled))
                options.push(apos);
        }
        if (pos.y > 0) {
            const apos = { x: pos.x, y: pos.y - 1 };
            if (!stepped(apos, travelled))
                options.push(apos);
        }
        if (pos.y < MaxIndex) {
            const apos = { x: pos.x, y: pos.y + 1 };
            if (!stepped(apos, travelled))
                options.push(apos);
        }
        options = options.filter(apos => !stepped(apos, travelled) && sum <= minsum[apos.x][apos.y]);
        if (options.length > 1) {
            options.sort((a, b) => matrix[a.x][a.y] - matrix[b.x][b.y]);
        }
        return options;
    }
    let MinSum = 1e12;
    function find(sum, pos, travelled) {
        if (pos.x == MaxIndex && pos.y == MaxIndex) {
            console.log(`End Reached :: len=${travelled.length} sum=${sum} min=${MinSum}`);
            if (sum < MinSum)
                MinSum = sum;
            return;
        }
        if (MinSum < sum)
            return;
        const options = stepOptions(sum, pos, travelled);
        if (!options.length)
            return;
        for (const npos of options) {
            minsum[pos.x][pos.y] = sum;
            const nsum = matrix[npos.x][npos.y] + sum;
            find(nsum, npos, travelled.concat([npos]));
        }
    }
    function run() {
        // compute a MinSum
        const transposed = common_1.Numbers.Transpose(matrix);
        const min1 = common_1.Numbers.Sum(matrix[0]) + common_1.Numbers.Sum(transposed[MaxIndex]);
        const min2 = common_1.Numbers.Sum(matrix[MaxIndex]) + common_1.Numbers.Sum(transposed[0]);
        MinSum = Math.min(min1, min2);
        // find min path
        const startPos = { x: 0, y: 0 };
        const startSum = matrix[startPos.x][startPos.y];
        const startTravelled = [startPos];
        find(startSum, startPos, startTravelled);
        return MinSum;
    }
    E83.run = run;
})(E83 || (E83 = {}));
console.log(E83.run());
