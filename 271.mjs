
/*
 * Empirical evidence : prime factors of 'num' never present in solutions
 */
function E271( num ) {

    console.log( ">>>", num, Factorise( num ) ) ;
    
    let sum = 0 ; 
    
    const start = Math.floor( Math.cbrt( num ) ) + 1 ;
    for ( let n = start ; n < num ; n++ ) {
        const cube = n**3 ;
        if ( Number.isSafeInteger( cube ) && cube % num === 1 ) {
            sum += n ;
            console.log( n, Factorise( n ) ) ;
        }
        console.log( n, cube, cube % num ) ;
    }

    return sum ;

}