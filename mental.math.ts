
const MIN: number = 4;
function num(max: number): number {
    return Math.floor(Math.random() * max) + MIN;
}

function math(): void {
    let a, b: number;
    for (let i = 1; i < 20; i++) {
        switch (num(4)-MIN) {
            case 0:
                a = num(50); 
                b = num(50); 
                console.log(`${a} + ${b} = ? ${a+b}`);
                break;
            case 1:
                a = num(80); 
                b = num(60);
                while (b > a) b = num(60); 
                console.log(`${a} - ${b} = ? ${a-b}`);
                break;
            case 2:
                a = num(9); 
                b = num(9);
                console.log(`${a} * ${b} = ? ${a*b}`);
                break;
            case 3:
                a = num(9); 
                b = num(9);
                console.log(`${a*b} / ${b} = ? ${a}`);
                break;
        }
    }
}

math();
