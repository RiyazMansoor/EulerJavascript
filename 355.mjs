
function E355( limit ) {

    const lfs = new LeastFactors( limit ) ;

    const reductions = new Map() ;

    const results = new Uint32Array( limit+1 ) ;
    results[1] = 1 ;
    results[2] = 3 ;
    results[3] = 6 ;

    for ( let n = 4 ; n < limit ; n++ ) {
        
        const factors = new Set() ;

        for ( let i = n ; i > 0 ; i++ ) {
            const ifactors = lfs.Factors( i ) ;
            if ( i % 2 === 0 ) {

            }
        }
        const coprimes = [ n ] ;
        if ( n % 2 === 0 ) {
            coprimes.push( n )
        }



    }

}