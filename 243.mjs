
function E243() {

    const numer = new Map( [ [ 11, 1 ], [ 1409, 1 ] ] ) ;
    const denom = new Map( [ [  2, 3 ], [   13, 1 ], [ 911, 1] ] ) ;
    
    const limit = 15499 / 94744 ;

    const pfs = new PrimeFactors( 1e4 ) ;
    const primes = Array.from( pfs.PrimesSet ) ;

    const sieve = new BitSieve( 0, 1e9 ) ;

    const options = [] ;
    for ( let i = 8 ; i < 10 ; i += 1 ) {
        options.push( primes.slice( 0, i ) ) ;
    }
    options.push( [2, 3, 5, 7, 11, 13, 17, 23] ) ;
    options.push( [2, 3, 5, 7, 11, 13, 19, 23] ) ;
    options.push( [2, 3, 5, 7, 11, 17, 19, 23] ) ;

    for ( const this_slice of options ) {

        const d = this_slice.reduce( ( p, v ) => p * v, 1 ) ;

        sieve.Clear() ;
        sieve.SetByIterable( this_slice ) ;

        const n = d - ( sieve.CountTo( d ) ) ;

        console.log( n, d, n/d - limit, this_slice ) ;
         
    }

}