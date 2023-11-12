"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var E381;
(function (E381) {
    function FactorialModulo(factorial, modulo) {
        let result = 1;
        for (let i = 2; i <= factorial; i++)
            result = (result * i) % modulo;
        return result;
    }
})(E381 || (E381 = {}));
//# sourceMappingURL=381.js.map