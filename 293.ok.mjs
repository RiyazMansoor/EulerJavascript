
function fortunate( index ) {
    for ( let i = index+3 ; true ; i += 2 ) {
        if ( IsPrime( i ) ) {
//             console.log( index, i, i - index ) ;
            return i - index ;
        }
    }
    throw "error" ;
}

function E293( limit ) {

    const primes = [ 2,3,5,7,11,13,17,19,23 ] ;

    let fortunates = new Set() ;

    for ( let i = 1 ; i <= primes.length ; i++ ) {
        const admissibles = SameFactors( primes.slice( 0, i ), limit ) ;
        for ( const admissible of admissibles ) {
            fortunates.add( fortunate( admissible ) ) ;
        }
        console.log( i ) ;
    }

    let sum = 0 ;
    for ( const f of fortunates ) {
        sum += f ;
    }
    return sum ;

}

