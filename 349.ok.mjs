
// http://oeis.org/A255938
// a(n+104) = a(n) + 12 for n > 9976
function E349( steps ) {

    const boundary = 9977n ;
    const space = 10n ** 18n ;
    const segment = 104n ;
    const segments = ( space - boundary ) / segment ;
    const target = space - ( segments * segment ) ; // target === 10024

    let count = segments * 12n ;


    let pos = [ 0, 0 ], dir = "N", step = 1 ;
    let blacks = new Set() ;
    let x = [] ;

    while ( step <= Number( target ) ) {
        const key = pos.toString() + "|" ;
        if ( !blacks.has( key ) ) {
            blacks.add( key ) ;
            switch ( dir ) {
                case "N" : pos[0]-- ; dir = "W" ; break ;
                case "W" : pos[1]-- ; dir = "S" ; break ;
                case "S" : pos[0]++ ; dir = "E" ; break ;
                case "E" : pos[1]++ ; dir = "N" ; break ;
            }
        }
        else {
            blacks.delete( key ) ;
            switch ( dir ) {
                case "N" : pos[0]++ ; dir = "E" ; break ;
                case "W" : pos[1]++ ; dir = "N" ; break ;
                case "S" : pos[0]-- ; dir = "W" ; break ;
                case "E" : pos[1]-- ; dir = "S" ; break ;
            }
        }
        step++ ;
        x.push( blacks.size ) ;
//         console.log( step, key, blacks.size, Array.from( blacks ).toString() ) ;
    }

    console.log( blacks.size, target ) ;
    
    return BigInt( blacks.size ) + count ;

}