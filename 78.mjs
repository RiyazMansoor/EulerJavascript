

function partition( sum, largest, cache ) {

    if ( largest === 0 ) return 0 ;
    if ( sum === 0 )     return 1 ;
    if ( sum < 0 )       return 0 ;

    const key = sum + "," + largest ;
    let cache_result = cache.get( key ) ;
    if ( cache_result ) return cache_result ;

    cache_result = partition( sum, largest - 1, cache ) + partition( sum - largest, largest, cache ) ;
    cache_result %= 1e9 ;
    cache.set( key, cache_result ) ;
    return cache_result ;
     
}

function E78( limit ) {

    const cache = new Map() ;

    for ( let size = 1 ; size < limit ; size++ ) {
        const result = partition( size, size, cache ) ;
//         if ( size % 1e1 === 0 ) 
        console.log( size, result, cache.size ) ;
        if ( !Number.isSafeInteger( result ) ) {
            console.log( "unsafe at size = ", size ) ;
        }
        if ( result % 1e6 === 0 ) {
            return size ;
        }
    }

    return -1 ;

} 