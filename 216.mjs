
// 1e6      141444      6m22s
function E216( limit ) {
    const log_step = limit / 100 ;
    let count = 0 ;
    for ( let n = 2 ; n <= limit ; n++ ) {
        if ( IsPrime( 2*n*n - 1 ) ) {
            count++ ;
        }
        if ( n % log_step === 0 ) console.log( `n=${n} count=${count}` ) ;
    }
    return count ;
}