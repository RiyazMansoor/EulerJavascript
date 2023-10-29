import { Integer } from "./common";

namespace E381 {

    function FactorialModulo(factorial: Integer, modulo: Integer): Integer {
        let result: Integer = 1; 
        for (let i = 2; i <= factorial; i++) 
            result = (result * i) % modulo; 
     
        return result; 
    }

      
}