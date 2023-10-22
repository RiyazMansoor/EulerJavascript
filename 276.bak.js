
function recurse_276( triple, MAX_PERIMETER ) {


    if ( triple.a + triple.b + triple.c > MAX_PERIMETER ) return 0 ;

    let count = 1 ;
//     console.log( triple ) ;

    const next_triples = NextTriples( triple ) ; 
    for ( const next_triple of next_triples ) {
        count += recurse_276( next_triple, MAX_PERIMETER ) ;
    }

    return count ;

}


function triangle_count( a, b, max_perimeter ) {
    const c_max = max_perimeter - a - b ;
    const c_count = c_max - b + 1 ; // plus 1 'cos b inclusive
    return ( c_count % 2 == 0 ) ? EvenSumTo( c_count ) : OddSumTo( c_count ) ;
}


/*
    method - count all first using summation and deduct where GCD > 1
           - for GCD > 1 deductions, cache results per GCD
 */
function E276( max_perimeter ) {

    const CACHE = new Map() ;
    const FACTORS = OddLeastFactors( Math.ceil( max_perimeter / 3 ) ) ;

    // for a == 1, there are SUM( 1..(max_perimeter-a-a) ), compute by formula
    let count = triangle_count( 1, 1, max_perimeter ) ;
    console.log( `a=1, count=${count}` ) ;

    const a_max = Math.floor( max_perimeter / 3 ) ;

    for ( let a = 2 ; a <= a_max ; a++ ) {

        count += triangle_count( a, a, max_perimeter ) ;

        const b_max = Math.floor( ( max_perimeter - a ) / 2 ) ;

        for ( let b = a ; b <= b_max ; b++ ) {

            const gcd_a_b = GCD( a, b ) ;
            if ( gcd_a_b == 1 ) continue ;

            const unique_factors = UniqueFactors( FACTORS, gcd_a_b ) ;
            const gcd_key = Array.from( unique_factors ).reduce( ( cum, fac ) => cum * fac, 1 ) ;
            const is_gcd_key_prime = ( FACTORS[Math.floor( gcd_key / 2 )] == gcd_key ) ;

            if ( is_gcd_key_prime ) {
                // do nothing - handled later
            }
            else if ( !CACHE.has( gcd_key ) ) {

//                 console.log( `caching gcd_a_b=${gcd_a_b} gcd_key=${gcd_key}` ) ;

                const sieve = new Array( gcd_key ).fill( false ) ;
                for ( const factor of unique_factors ) {
                    for ( let i = 0 ; i < gcd_key ; i += factor ) {
                        sieve[i] = true ;
                    }
                }

                let cum = 0 ;
                const array = new Array( gcd_key + 1 ).fill( 0 ) ;
                for ( let i = 0 ; i < gcd_key ; i++ ) {
                    if ( sieve[i] ) {
                        cum++ ;
                    }
                    array[i+1] = cum ;
                }

                CACHE.set( gcd_key, array ) ;

            }
            else  {
//                 console.log( `cached gcd_a_b=${gcd_a_b} gcd_key=${gcd_key}` ) ;
            }

            const c_max = Math.floor( max_perimeter - a - b ) ;
            const c_count = c_max - b + 1 ;
            const c_gcd_periods = Math.floor( c_count / gcd_key ) ;
            const c_gcd_rem = c_count % gcd_key ;

            let b_count = 0 ;
            if ( is_gcd_key_prime ) {
                b_count += c_gcd_periods ;
                if ( c_gcd_rem > 0 ) {
                    b_count++ ;
                }
            }
            else {
                let arr = CACHE.get( gcd_key ) ;
                b_count += arr[gcd_key] * c_gcd_periods ;
                b_count += arr[c_gcd_rem] ;
            }
            count -= b_count ;

            if ( a % 6 == 0 )
                console.log( `a=${a}, b=${b}, b_count=${b_count}, c_count=${c_count}, periods=${c_gcd_periods}~${c_gcd_rem} gcd_key=${gcd_key}, count=${count}, cache-size=${CACHE.size}` ) ;

        }

        if ( a % 1000 == 0 ) console.log( `a=${a}, count=${count}, cache-size=${CACHE.size}` ) ;

    }

    return count ;

}


