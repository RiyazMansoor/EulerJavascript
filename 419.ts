
namespace E419 {

    type Token = string;

    type Count = {
        c1: number,
        c2: number,
        c3: number
    }

    function countToken(token: Token): Count {
        const abc: Count = {
            c1: 0,
            c2: 0,
            c3: 0
        }
        for (const char of token) {
            switch (char) {
                case "1": abc.c1++; break;
                case "2": abc.c2++; break;
                case "3": abc.c3++; break;
                default: throw `error char "${char}"`
            }
        }
        return abc;
    }

    function nextToken(token: Token): Token {
        let result: Token = "";
        let start: number = 0;
        while (start < token.length) {
            const charVal: number = parseInt(token.charAt(start));
            let charPos: number = start + 1;
            while (charVal == parseInt(token.charAt(charPos))) {
                charPos++;
            }
            const charLen: number = charPos - start;
            result += charLen.toString() + charVal.toString();
            start += charLen;
        }
        return result;
    }

    // to check algorithm against n=40
    export function runBrute(): void {
        let token: Token = "1";
        for (let i = 0; i < 40; i++) {
            const count: Count = countToken(token);
            console.log(`${i + 1} ${count.c1} ${count.c2} ${count.c3} ${token.slice(0, 30)}`);
            token = nextToken(token);
        }
    }

}

E419.runBrute();