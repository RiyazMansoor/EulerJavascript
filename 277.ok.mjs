
// use modulo build up from back to front

function Next( num ) {
    const result = { next: 0, dir: "" } ;
    switch ( num % 3 ) {
        case 0 :
            result.next = num / 3 ;
            result.dir = "D" ;
            break ;
        case 1 :
            result.next = ( 4 * num + 2 ) / 3 ;
            result.dir = "U" ;
            break ;
        case 2 :
            result.next = ( 2 * num - 1 ) / 3 ;
            result.dir = "d" ;
            break ;
    }
    return result ;
}

// safe limit 2251799813685248

function E277( start ) {

    const target = "UDDDUdddDDUDDddDdDddDDUDDdUUDd"
    const step = 3 ** 4 ;
    if ( !start ) {
        start = Math.ceil( 1e15 / step ) * step ;
    }

    const safe_limit = 2**51 ; // cos multiplying by 4
    for ( let i = 1000000000000188  ; i < safe_limit ; i += 243 ) {

        if ( ( i - 2 ) % 3 === 1 ) {
//             console.log( i, "upto 4" ) ;
            const pos5 = i / step ;
            if ( pos5 % 3 === 1 ) {
                console.log( i, "upto 5")
            }
//             console.log( i, pos5, pos5%3 ) ;
        }
        if ( i > ( start + 1e3 ) ) break ;
    }

    return 0 ;

    let num = limit, result, path = "" ;
    while ( num > 1 ) {
        result = Next( num ) ;
        path += result.dir ;
        num = result.next ;
        console.log( num )
    }
    return path ;
}

// solution 1125977393124310
function TTT() {

    const path = "UDDDUdddDDUDDddDdDddDDUDDdUUDd".split( "" ) ;
    const CONSTANTS = { path: path }

    const safe_limit = 1e15 + 1e15 ;

    console.log( "hello ")
    // 1011593430849505         
    for ( let i = 1e15+11593430849505  ; i < safe_limit ; i += 22876792454961 ) {
        const instance = { depth:0, startNum:i, currNum:i }
        const result = recurse( instance, CONSTANTS ) ;
        if ( result > 20 )console.log( `${i}`, result ) ;
        if ( result > 1e15 ) return i ;
//         console.log( i, p1, p1%81, (p1/81)%3) ;
    }

}

function recurse( instance, CONSTANTS ) {

    const { depth, startNum, currNum } = instance ;
    const { path } = CONSTANTS ;

    if ( depth == path.length ) {
        return startNum ;
    }

    const new_instance = { depth: depth+1, startNum: startNum, currNum: currNum }

    switch ( currNum % 3 ) {
        case 0 :
            if ( path[depth] != "D" ) return depth ;
            new_instance.currNum = currNum / 3 ;
            return recurse( new_instance, CONSTANTS ) ;        
            break ;
        case 1 :
            if ( path[depth] != "U" ) return depth ;
            new_instance.currNum = ( 4*currNum + 2 ) / 3 ;
            return recurse( new_instance, CONSTANTS ) ;        
            break ;
        case 2 :
            if ( path[depth] != "d" ) return depth ;
            new_instance.currNum = ( 2*currNum - 1 ) / 3 ;
            return recurse( new_instance, CONSTANTS ) ;        
            break ;
    }

}
