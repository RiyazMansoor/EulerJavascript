
// https://oeis.org/A027862
function E291( limit ) {

    let count = 0 ;

    for ( let n = 1 ; true ; n++ ) {

        const prime = n**2 + (n+1)**2 ;

        if ( prime > limit ) break ;

        const lf = LeastFactor( prime ) ;
//         if ( lf < prime && lf%4 !== 1 ) console.log( n, prime, lf, lf%4 ) ;
        if ( lf === prime ) {
            count++ ;
//             console.log( n, prime, "isprime" ) ;
        }
        if ( n % 1e5 === 0 ) console.log( n, count ) ;
    }

    return count ;

    /*
    for ( let x = 2 ; x < xlim ; x++ ) {
        for ( let y = 1 ; y < x ; y++ ) {
            const numer = x**4 - y**4 ;
            const denom = x**3 + y**3 ;
            if ( numer % denom === 0 ) {
                console.log( x, y, numer, denom, numer/denom ) ;
            }
        }
    }
    */
}

function LeastPrimeFactor( num ) {

    if ( num % 5 === 0 ) return 5 ;

    const sqrt_num = Math.floor( Math.sqrt( num ) ) ;
    const steps = [ 6, 10, 22 ] ;

    for ( let jump = 7 ; jump <= sqrt_num ; jump += 30 ) {
        for ( const step of steps ) {
            const factor = jump + step ;
            if ( num % factor === 0 ) {
                return factor ;
            }
        }
    }

    return num ;

}
