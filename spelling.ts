
type Integer = number;

const SPELLING: string[][] = [];

const fs = require("fs");
const data: string = fs.readFileSync("./assets/spelling.csv", 'utf8') ;
for (const rowdata of data.split("\n")) {
    if (rowdata.length === 0) continue;
    SPELLING.push(rowdata.split("|"));
}

function nextWordIndex(): Integer {
    return Math.floor(Math.random() * 100);
}

const readline = require("readline");
const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(questionText: string) {
    return new Promise((resolve, reject) => {
        readlineInterface.question(`\n${questionText.trim()} ?  `, (input: string) => resolve(input) );
    });
}

async function askWord() {
    let total: Integer = 0, correct: Integer = 0;
    while (true) {
        total++;
        const wordIndex: Integer = nextWordIndex();
        const spelling: string = await ask(SPELLING[wordIndex][2]) as string;
        if (spelling.toLowerCase().trim() == SPELLING[wordIndex][1].toLowerCase().trim()) {
            correct++;
            console.log(`  >> Correct :) :: ${correct}/${total}`);
        } else {
            console.log(`  !! Wrong. Correct spelling is "${SPELLING[wordIndex][1]}" :: ${correct}/${total}`);
        }
    }
}

askWord();

