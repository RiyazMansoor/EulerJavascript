"use strict";
var E419;
(function (E419) {
    function countToken(token) {
        const abc = {
            c1: 0,
            c2: 0,
            c3: 0
        };
        for (const char of token) {
            switch (char) {
                case "1":
                    abc.c1++;
                    break;
                case "2":
                    abc.c2++;
                    break;
                case "3":
                    abc.c3++;
                    break;
                default: throw `error char "${char}"`;
            }
        }
        return abc;
    }
    function nextToken(token) {
        let result = "";
        let start = 0;
        while (start < token.length) {
            const charVal = parseInt(token.charAt(start));
            let charPos = start + 1;
            while (charVal == parseInt(token.charAt(charPos))) {
                charPos++;
            }
            const charLen = charPos - start;
            result += charLen.toString() + charVal.toString();
            start += charLen;
        }
        return result;
    }
    // to check algorithm against n=40
    function runBrute() {
        let token = "1";
        for (let i = 0; i < 40; i++) {
            const count = countToken(token);
            console.log(`${i + 1} ${count.c1} ${count.c2} ${count.c3} ${token.slice(0, 30)}`);
            token = nextToken(token);
        }
    }
    E419.runBrute = runBrute;
})(E419 || (E419 = {}));
E419.runBrute();
