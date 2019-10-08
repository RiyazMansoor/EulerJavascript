
// 1e4 ->  1m12s

function reduce( num, CACHE, PRIMES ) {

    const cache_value = CACHE.get( num ) ;
    if ( cache_value ) {
//         console.log( " > cache > ", num, cache_value ) ;
        return cache_value ;
    }

    for ( const prime of PRIMES ) {

        const denom = num - prime + 1n ;

        if ( denom < prime ) {
            CACHE.set( num, num ) ;
            return num ;            
        }

        if ( denom % prime === 0n ) {
//             console.log( prime ) ;
            const new_num = denom / prime ;
            const result = reduce( new_num, CACHE, PRIMES ) ;   
            CACHE.set( num, result ) ;
            return result ; 
        }

        if ( Math.sqrt( Number( denom ) ) < Number( prime ) ) {
            CACHE.set( num, num ) ;
            return num ; 
        }

    }

//     CACHE.set( num, num ) ;
//     return num ; 
    console.log( " > error > ", num, PRIMES.length, PRIMES[PRIMES.length-1], CACHE.size ) ;
    console.log( CACHE ) ;

/*
    let numer = 1n, denom = num ;
    while ( numer % denom !== 0n || denom > 1n ) {
        const gcd = BigGCD( numer, denom ) ;
        if ( gcd > 1n ) {
            if ( gcd > 950n ) console.log( " > ", gcd, numer, denom, num ) ;
            numer /= gcd ;
            denom /= gcd ;
            break ;
        }
        else {
            numer++ ;
            denom-- ;
        }
    }

    if ( denom === 1n ) {
        CACHE.set( num, numer ) ;
        return numer ;
    }

    if ( numer !== 1n ) {
        console.log( num, numer, denom ) ;
        throw "error" ;
    }

    const reduced_value = reduce( denom, CACHE, PRIMES ) ;
    CACHE.set( num, reduced_value ) ;
    return reduced_value ;
*/
}

function E343_1( limit ) {

    const PRIMES = Array.from( new PrimeFactors( Math.pow( limit, 1 ) * 1.05 ).PrimesSet ).map( p => BigInt( p ) ) ;
    const CACHE = new Map() ;
    const debug = [] ;

    let sum = 0n, big_limit = BigInt( limit ) ;
    for ( let i = 1n ; i <= big_limit ; i++ ) {
        const r = reduce( i**3n, CACHE, PRIMES ) ;
        sum += r ; 
//         debug.push( r ) ;
        if ( Number( i ) % 1e4 === 0 )               console.log( i, r, sum, CACHE.size ) ;
    }

    console.log( debug.toString(), CACHE ) ;
    return sum ;

}

function E343( limit ) {

    // n^3 + 1 = ( n + 1 ) ( n^2 - n + 1 )

    const pfs = new PrimeFactors( limit + 10 ) ;

    let sum = 0 ;

    for ( let i = 1 ; i <= limit ; i++ ) {

        let max_factor = Math.max( ...Array.from( pfs.Factors( i + 1 ).keys() ) ) ;

        let n = i*i - i + 1 ;
        while ( n*n > max_factor ) {
            const lf = LeastFactor( n ) ;
            if ( lf > max_factor ) {
                max_factor = lf ;
            }
            n /= lf ;
        }

        sum += max_factor - 1 ;

        if ( i % 1e5 === 0 ) console.log( i, sum ) ;

    }

    return sum ;

}