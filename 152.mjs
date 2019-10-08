

function LeastFactor( uptoN ) {
    const array = new Uint32Array( uptoN ).fill( 2 ) ;
    array[0] = 0 ;
    array[1] = 1 ;
    for ( let i = 3 ; i < uptoN ; i += 2 ) {
        for ( let j = i ; j < uptoN ; j += 2*i ) {
            if ( array[j] === 2 ) {
                array[j] = i ;
            }
        }
    }
    return array ;
}

function FactorMap( leastFactor, num ) {

    const factorMap = new Map() ;

    while ( leastFactor[num] !== num ) {
        const factor = leastFactor[num] ;
        let count = 0 ;
        while ( leastFactor[num] === factor ) {
            num /= factor ;
            count++ ;
        }
        factorMap.set( factor, count ) ;
    }

    if ( num > 1 ) {
        if ( !factorMap.has( num ) ) {
            factorMap.set( num, 1 ) ;
        }
        else {
            factorMap.set( num, 1 + factorMap.get( num ) ) ;
        }
    }

    return factorMap ;

} 

function MultiplyMap( m1, m2 ) {

    const m = new Map( m1 ) ;
    
    for ( const [ m2k, m2v ] of m2.entries() ) {
        if ( m.has( m2k ) ) {
            m.set( m2k, m2v + m.get( m2k ) ) ;
        }
        else {
            m.set( m2k, m2v ) ;
        }
    }
    
    return m ;

}


function InverseBigFrac( bigDen ) {
    return { numer:1n, denom:bigDen }
}

function AddBigFrac( bf1, bf2 ) {
    return { numer: ( bf1.numer * bf2.denom + bf2.numer * bf1.denom ), denom: ( bf1.denom * bf2.denom ) }
}

function CompareHalf( bigFrac ) {
    const diff = bigFrac.numer * 2n - bigFrac.denom ;
    return ( diff > 0n ) ? 1 : ( ( diff < 0n ) ? -1 : 0 ) ;
}

function E152( limit ) {

    const frac0 = { numer:0n, denom:1n } ;

    const bigFracs = [ ] ;
    const tailSums = [ frac0 ] ;
    const hasHalfs = [ ] ;
    for ( let i = limit ; i > 1 ; i-- ) {
        const bigI = BigInt( i ) ;
        bigFracs.push( InverseBigFrac( bigI * bigI ) ) ;
        tailSums.push( AddBigFrac( bigFracs[bigFracs.length-1], tailSums[tailSums.length-1] ) ) ;
        hasHalfs.push( CompareHalf( tailSums[tailSums.length-1] ) ) ;
    }
    bigFracs.push( undefined, undefined ) ;
    tailSums.push( undefined, undefined ) ;
    hasHalfs.push( undefined, undefined ) ;
    bigFracs.reverse() ;
    tailSums.reverse() ; tailSums.pop() ;
    hasHalfs.reverse() ;
    
//     console.log( bigFracs, tailSums, hasHalfs ) ;

    const initOptions = [] ;
    for ( const [ i, v ] of hasHalfs.entries() ) {
        if ( v === 1 ) initOptions.push( i ) ;
    }

    const primes = [ 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97 ] ;
    const primes_set = new Set() ;
    primes.forEach( el => primes_set.add( el ) ) ;

    return recurse( { options: initOptions, sum: frac0, chain: [] }, { FRACS: bigFracs, TAILSUMS: tailSums, PRIMES: primes_set, CACHE: new Map() } ) ;

}

function recurse( instance, CONSTANTS ) {

    const { options, sum, chain } = instance ;
    const { FRACS, TAILSUMS, PRIMES, CACHE } = CONSTANTS ;

    const cache_count = CACHE.get( sum ) ;
    if ( cache_count ) {
        console.log( 'cache hit ', cache_count, chain ) ;
        return cache_count ;
    }

    if ( chain.length === 5 ) console.log( chain.toString() ) ;

    let count = 0 ;

    for ( const option of options ) {

        const new_sum = AddBigFrac( sum, FRACS[option] ) ;
        const diff = CompareHalf( new_sum ) ;

        if ( diff === 1 ) {
            // do nothing.
        }
        else if ( diff === 0 ) {
            count++ ;
            console.log( chain.concat( [ option ] ) ) ;
        }
        else {
            const new_options = [] ;
            for ( let i = option + 1 ; i < TAILSUMS.length ; i++ ) {
                if ( CompareHalf( AddBigFrac( new_sum, TAILSUMS[i] ) ) < 0 ) {
                    break ;
                }
                // if a prime past
//                 if ( i >= TAILSUMS.length / 2 && PRIMES.has( i ) > 0 ) {
//                     continue ;
//                 }
                new_options.push( i ) ;
            } 
            if ( new_options.length > 0 ) {
                const new_chain = chain.slice() ;
                new_chain.push( option ) ;
                const count_of_sum = recurse( { options: new_options, sum: new_sum, chain: new_chain }, CONSTANTS ) ;
                CACHE.set( sum, count_of_sum ) ;
                count += count_of_sum ;
            }
        }
    
    }  

    return count ;

}