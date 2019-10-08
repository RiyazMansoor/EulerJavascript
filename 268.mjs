

function E268( limit ) {

    const primes = [ 2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97 ] ;
    const CONSTANTS = { PRIMES: primes, PRIME_COUNT_MIN:4, LIMIT: limit, CACHE: new Set() } ;

    const instance = { product: 1, position: 0, prime_count: 0, chain: [] } ;

    return recurse( instance, CONSTANTS ) ;

}


function recurse( instance, CONSTANTS ) {

    const { PRIMES, LIMIT, PRIME_COUNT_MIN, CACHE } = CONSTANTS ;
    const { product, position, prime_count, chain } = instance ;

    if ( product >= LIMIT ) {
        return 0 ;
    }

    if ( PRIMES.length - position + prime_count < PRIME_COUNT_MIN ) {
        return 0 ;
    }
    
    if ( prime_count === PRIME_COUNT_MIN && !CACHE.has( product ) ) {
        const this_count = Math.floor( LIMIT / product ) ;
        console.log( `product:${product}, count=${this_count}, prime_count=${prime_count}, position=${position}, chain=${chain} ` ) ;
        CACHE.add( product ) ;
        return this_count ;
    }

    if ( position == PRIMES.length ) {
        return 0 ;
    }

    const this_prime = PRIMES[position] ;

    if ( product * this_prime > LIMIT ) {
        return 0 ;
    }

    let count = 0 ;

    const new_instance_0 = { product: product, position: position+1, prime_count: prime_count, chain: chain }
    count += recurse( new_instance_0, CONSTANTS ) ;
    
    const new_instance_1 = { product: product*this_prime, position: position+1, prime_count: prime_count+1, chain: chain.concat( [this_prime] ) }
    count += recurse( new_instance_1, CONSTANTS ) ;
   
    return count ;

}


function E268B( limit ) {

    const primes = [ 2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97 ] ;
    const CONSTANTS = { PRIMES: primes, PRIME_COUNT_MIN:4, LIMIT: limit, CACHE: new Set() } ;

    const instance = { product: 1, position: 0, prime_count: 0, chain: new Map() } ;

    return recurseB( instance, CONSTANTS ) ;

}

function recurseB( instance, CONSTANTS ) {

    const { PRIMES, LIMIT, PRIME_COUNT_MIN, CACHE } = CONSTANTS ;
    const { product, position, prime_count, chain } = instance ;

    if ( product >= LIMIT ) {
        return 0 ;
    }

    if ( PRIMES.length - position + prime_count < PRIME_COUNT_MIN ) {
        return 0 ;
    }
    
    const new_prime = PRIMES[position] ;

    const rem_spots = PRIME_COUNT_MIN - prime_count ;
    if ( rem_spots > 0 && product * new_prime**rem_spots > LIMIT ) {
        return 0 ;
    }

    let count = 0 ;

    if ( position === PRIMES.length ) {
        return count ;
    }

    let new_product = product ;
    let new_chain = new Map( chain ) ;

    for ( let p = 0 ; new_product < LIMIT ; p++ ) {

        if ( rem_spots <= 0 || ( rem_spots === 1 && p > 0 ) ) { 
            count++ ;
            console.log( `product:${product}, prime_count=${prime_count}, position=${position}, chain=${chain.toString()} `, chain ) ;
        }

        const new_prime_count = prime_count + ( ( p == 0 ) ? 0 : 1 ) ;
        new_chain.set( new_prime, p ) ;

        const new_instance = { product: new_product, position: position+1, prime_count: new_prime_count, chain: new_chain }
        
        count += recurseB( new_instance, CONSTANTS ) ;
        new_product *= new_prime ;

    }
   
    return count ;

}