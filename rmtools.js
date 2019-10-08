
// returns the next 3 primitive pythagorean triples
function NextTriples( triple ) {

    const { a, b, c } = triple ;
    const a2 = 2 * a, b2 = 2 * b, c2 = 2 * c, c3 = 3 * c ;

    return [
        { a: ( a - b2 + c2 ),  b: ( a2 - b + c2 ),  c: ( a2 - b2 + c3 )  }, 
        { a: ( a + b2 + c2 ),  b: ( a2 + b + c2 ),  c: ( a2 + b2 + c3 )  }, 
        { a: ( -a + b2 + c2 ), b: ( -a2 + b + c2 ), c: ( -a2 + b2 + c3 ) }, 
    ] ;

}

// SUM(1..n)
function SumTo( n ) {
    return n * ( n + 1 ) / 2 ;
}
function EvenSumTo( n ) {
    n = Math.floor( n / 2 ) ;
    return 2 * SumTo( n ) ;
}
function OddSumTo( n ) {
    return SumTo( n ) - EvenSumTo( n ) ;
}

function GCD( n1, n2 ) {

    let tmp = 0 ;
    while ( n1 ) {
        tmp = n1 ;
        n1 = n2 % n1 ;
        n2 = tmp ;
    }

    return n2 ;

}


// this block is about prime factors and factorization

// to save space/memory only odd number factors are recorded in array 
function OddLeastFactors( upto_n ) {

    const array_length = Math.floor( upto_n / 2 ) ;
    const odd_least_factors = Array( array_length ).fill( 1 ) ;

    for ( let n1 = 3 ; n1 <= upto_n ; n1 += 2 ) {
        const i1 = Math.floor( n1 / 2 ) ;
        if ( odd_least_factors[i1] == 1 ) {
            odd_least_factors[i1] = n1 ;
            for ( let n2 = n1 * n1 ; n2 <= upto_n ; n2 += 2 * n1 ) {
                const i2 = Math.floor( n2 / 2 )
                if ( odd_least_factors[i2] == 1 ) {
                    odd_least_factors[i2] = n1 ; 
                }
            }
        }
     }

     return odd_least_factors ;

}


function FactorCount( number, factor ) {

    let count = 0 ;
    while ( number % factor == 0 ) {
        count++ ;
        number /= factor ;
    }

    return { count: count, number: number }

}

// assumes n is contained within odd_least_factors
function UniqueFactors( odd_least_factors, number ) {

    const factors = new Set() ;

    const tmp_factor_2 = FactorCount( number, 2 ) ;
    if ( tmp_factor_2.count > 0 ) {
        factors.add( 2 ) ;
        number = tmp_factor_2.number ;
    }

    if ( number > 2 * odd_least_factors.length ) {
        throw `OddLeastFactors size:${2*odd_least_factors.length} < number:${number}` ;
    }

    while ( true ) {
        const index = Math.floor( number/ 2 ) ;
        const factor = odd_least_factors[index] ;
        if ( number <= factor ) break ;
        factors.add( factor ) ;
        const tmp_factor_x = FactorCount( number, factor ) ;
        number = tmp_factor_x.number ;
    }
    if ( number > 1 ) {
        factors.add( number ) ;
    }
    
    return factors ;
    
}


/*
function GCD( ...values ) {

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
*/

export next_triples ;