


function E224( max_perimeter ) {

    if ( !max_perimeter ) {
        max_perimeter = 1000 ;
    }

    const squares = new Array( Math.floor( max_perimeter / 2 ) ) ;
    const squares_map = {} ;
    for ( let i = 0 ; i < squares.length ; i++ ) {
        const square = i * i ;
        squares[i] = square ;
        squares_map[ square ] = i ;
    }

    const a_max = Math.ceil( max_perimeter / 3 ) ;

    let count = 0 ;

    for ( let a = 2 ; a < a_max ; a += 2 ) {
        
        let b_max = Math.ceil( ( max_perimeter - a ) / 2 ) ;
//         if ( 2 * a < b_max ) b_max = 2 * a ;
//         const iters = Math.ceil( ( b_max - a ) / 4 ) ;
//         console.log( ` a = ${a}, b_max = ${b_max}, iters = ${iters} `) ;
        
        for ( let b = a ; b < b_max ; b += 4 ) {

            const c2 = squares[a] + squares[b]  + 1 ;

            const c = NumUtil.BinaryInsert( squares, c2 ) ;
            if ( b >= c ) break ;
//             if ( a + b + c >= max_perimeter ) break ;

//            const c = squares_map[c2] ;
//            if ( !c ) continue ;
            
            
            if ( squares[c] == c2 && a + b + c < max_perimeter ) {
//                 console.log( `match a=${a}, b=${b}, c=${c} | a2=${squares[a]}, b2=${squares[b]}, c2=${c2}` ) ;
                count++ ;
            }

        }

    }


/*
    for ( let c = 3 ; c < max_perimeter / 2 ; c += 2 ) {

        const c2 = c * c ;
        const hypot = c2 - 1 ;
        const mid = NumUtil.BinaryInsert( squares, hypot / 2 ) ;

        let a = mid, b = mid ;
        if ( mid % 2 == 1 ) {
            a-- ;
            b-- ;
        }        

        let a2_b2 = squares[a] + squares[b] ;

        while ( b < c && a > 0 ) {
        
            if ( a2_b2 == hypot ) {
                 console.log( `match a=${a}, b=${b}, c=${c} | a2=${squares[a]}, b2=${squares[b]}, c2=${c2}`, mid-a, b-mid ) ;
                count++ ;
                break ;
            }
        
            if ( a2_b2 > hypot ) {
                a -= 2 ;
            } 
            else {
                b += 2 ;
            }

            a2_b2 = squares[a] + squares[b] ;
            
//             // optimization
//             if ( a2_b2 > hypot ) {
//                 a -= 2 ;
//             } 
//             else {
//                 b += 2 ;
//             }
        
//             a2_b2 = squares[a] + squares[b] ;

        }

        console.log( `XXXXX a=${a}, b=${b}, c=${c} | a2=${squares[a]}, b2=${squares[b]}, c2=${c2}`, mid-a, b-mid ) ;
    
    }
*/

    return count ;

}