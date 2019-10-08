

/*
    following was enough to determine this is 
    https://oeis.org/A011900
      => 	a(n) = 6*a(n-1) - a(n-2) - 2 with a(0) = 1, a(1) = 3
 */
function E100( startValue, resultCount ) {

    if ( !startValue || startValue < 5 ) {
        startValue = 5 ;
    }
    if ( !resultCount || resultCount < 0 ) {
        resultCount = 1 ;
    }

    for ( let totalCaps = startValue ; resultCount > 0 ; totalCaps++ ) {
        const znum = totalCaps * ( totalCaps - 1 ) / 2 ;
        const candidateRedCaps = Math.ceil( Math.sqrt( znum ) ) ;
        if ( candidateRedCaps * ( candidateRedCaps - 1 ) == znum ) {
            console.log( `red:${candidateRedCaps} blue:${totalCaps-candidateRedCaps} total:${totalCaps}` ) ;
            resultCount-- ;
        } 
    }

}