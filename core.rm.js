

class Numbers {

    constructor( upto_num ) {

        const least_factors = Array( upto_num+1 ).fill( 2 ) ;
        least_factors[0] = 0 ;
        least_factors[1] = 1 ;

        for ( let i = 3 ; i <= upto_num ; i += 2 ) {
            if ( least_factors[i] == 2 ) {
                least_factors[i] = i ;
                for ( let j = i * i ; j <= upto_num ; j += 2 * i) {
                    if ( least_factors[j] == 2 ) least_factors[j] = i ; 
                }
            }
         }

         this.LeastFactors = least_factors ;

    }

    PrimeFactorsOf( num ) {

        const map = {} ;

        while ( this.LeastFactors[num] < num ) {
            const factor = this.LeastFactors[num] ;
            Numbers.MultiplyNum( map, factor ) ;
            num /= factor ;
        }
        Numbers.MultiplyNum( map, num ) ;
       
        return map ;

    }

    Primes() {

        const primes = [] ;
        for ( let i = 2 ; i < this.LeastFactors.length ; i++ ) {
            if ( this.LeastFactors[i] == i ) primes.push ( i ) ;
        }

        return primes ;

    }

    static MultiplyNum( map, base, power = 1) {

        if ( map[base] ) power += map[base] ;
        map[base] = power ;
        
        return map ;
    
    }

    static MultiplyMap( map, map2 ) {
    
        const bases2 = Object.keys( map2 ) ;
        for ( let bi in bases2 ) {
            const base = bases2[bi] ;
            let power = map2[base] ;
            if ( map[base] ) power += map[base] ;
            map[base] = power ;
        }
    
        return map ;
    }

    static GCD( ...values ) {

        if ( values.length == 1 ) return values[0] ;

        const gcd = function( n1, n2 ) {
            
            let tmp = 0 ;
            while ( n1 ) {
                tmp = n1 ;
                n1 = n2 % n1 ;
                n2 = tmp ;
            }

            return n2 ;
            
        }

        let gcd_value = gcd( values[0], values[1] ) ;

        for ( let i = 2 ; i < values.length ; i++ ) {
            gcd_value = gcd( gcd_value, values[i] ) ;
            if ( gcd_value == 1 ) return 1 ; 
        }

        return gcd_value ;

    }


}
