
function E347( limit ) {

    let primes = Array.from( new PrimeFactors( limit ).PrimesSet ) ;

    let p1, p2, prod, sum = 0 ;

    for ( let i = 0 ; i < primes.length ; i++ ) {

        p1 = primes[i] ;
        for ( let j = i+1; j < primes.length ; j++ ) {

            p2 = primes[j] ;
            prod = p1 * p2 ;

            if ( prod > limit ) {
                break ;
            }

            if ( p1 * prod > limit ) {
                sum += prod ;
            }
            else {
                sum += max_same_factors( p1, p2, limit ) ;
            }

        }
        
    }        

    return sum ;
    
}

function max_same_factors( prime1, prime2, limit ) {
    
    const factors = [ prime1, prime2 ] ;

    let max = prime1 * prime2 ;
    let last_set = new Set(), this_set = new Set( [ max ] ), temp_set ;

    do {
//         console.log( this_set, max ) ;
        temp_set = last_set ;
        last_set = this_set ;
        this_set = temp_set ;
        this_set.clear() ;
        for ( const last_num of last_set ) {
            for ( const factor of factors ) {
                const num = last_num * factor ;
                if ( num <= limit ) {
                    this_set.add( num ) ;
                    if ( max < num ) {
                        max = num ;
                    }
                }
            }
        }
    } while ( this_set.size > 0) ;

//     console.log( prime1, prime2, limit, max ) ;
    return max ;

}
