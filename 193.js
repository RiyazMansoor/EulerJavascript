


function recurse( this_value, this_primes, LIMIT ) {

    let this_count = 0 ;

    if ( this_value < LIMIT ) {
//         console.log( this_value ) ;
        this_count++ ;
    }

    for ( const [ pi, prime ] of Object.entries( this_primes ) ) {

        let start_this_count = this_count ;
        if ( this_value == 1 ) console.log( pi, prime, this_count ) ;

        let new_this_value = this_value * prime ;
        if ( new_this_value >= LIMIT ) break ;

        this_count += recurse( new_this_value, this_primes.slice( parseInt( pi ) + 1 ), LIMIT ) ;

        if ( this_value == 1 ) console.log( pi, prime, this_count, this_count - start_this_count ) ;

    }

    return this_count ;

}


function E193( power ) {

    if ( !power ) power = 6 ;
    const power_root = power / 2 ;

    const LIMIT = 2**power ;

    const PrimeGen = new PrimeGenerator( 2**power_root ) ;
    const primes = PrimeGen.Primes() ;
    const primes_len = primes.length ;

    let pi = 0, val = 1 ;
    for ( pi = 0 ; pi < primes.length && val < LIMIT ; pi++ ) {
        val *= primes[pi] ;
    }
    
    console.log( primes_len, primes.slice( primes_len - 10 ), primes.slice( 0, pi-1 ) ) ;

    const count = recurse( 1, primes, LIMIT ) ;

    console.log( count ) ;
}