
function E521( limit ) {

    const block = 30, block_value = 2*15 + 3*5 + 5*2 ;
    const rem = limit % block - 7 ;
    const lim = limit - rem - 7 ;

    const primes = new Set( [ 2,3,5 ] ) ;

//     const FirstFactor = FirstFactoriser( primes, 3 ) ;

    const steps = [ 0, 4, 6, 10, 12, 16, 22, 24 ] ;

    let sum = 2*3 + 3*1 + 5*1 ;

    for ( let n = 7 ; n < lim ; n += 30 ) {
        
        sum += block_value ;
        
        for ( const step of steps ) {

            const num = n + step ;
            if ( primes.has( num ) ) {
                sum += num ;
                continue ;
            }

            const factors = Factorise( num ).keys() ;
            let lf = factors.next().value ;
            sum += lf ;
            primes.add( lf ) ;
            while ( !( lf = factors.next() ).done ) {
                primes.add( lf.value ) ;
            }

        }
    }

    for ( let n = limit - rem + 1 ; n <= limit ; n++ ) {

        if ( primes.has( n ) ) {
            sum += n ;
            continue ;
        }

        console.log( n, LeastFactor(n)) ;
        sum += LeastFactor( n ) ;

    }

    console.log( primes ) ;

    return sum ;
}

function FirstFactoriser( array, count ) {

    const primes = array ;
    let pos = count ;

    return function( num ) {

        const root = Math.floor( Math.sqrt( num ) ) ;
        
        for ( let i = 0 ; primes[i] <= root ; i++ ) {
            if ( num % primes[i] === 0 ) {
                return primes[i] ;
            }
        }
        
        primes[pos] = num ;
        pos++ ;
        console.log( primes ) ;
        return num ;
    
    }

}