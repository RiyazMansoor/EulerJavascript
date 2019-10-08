
// 1e3 -> 126       -> 123     , 107
// 1e4 -> 1238      -> 1253    , 1081 
// 1e5 -> 12517     -> 12512   , 11018 | 25028
// 1e6              -> 124935  , 110239
// 1e7              -> 1249539 , 1103061
// 75e6             -> 9374344 , 8274650
// 75e6             -> count:4687177 count_perimeter=4137330
function E224( perimeter ) {

    const c_len = Math.floor( perimeter / 2 ) ;
    const pfs = new PrimeFactors( c_len + 10 ) ;

    // http://mathworld.wolfram.com/SumofSquaresFunction.html

    let count = 0 ; 

    loop_c :
    for ( let c = 3 ; c <= c_len ; c += 2 ) {
        
        const factors = pfs.Multiply( c+1, c-1 ) ;
        const powers4k1 = [] ;
        let power2 = 0 ;

        for ( const [ base, power ] of factors.entries() ) {
            switch ( base % 4 ) {
                case 1 :
                    powers4k1.push( power ) ;
                    break ;
                case 2 :
                    power2 = power ;
                    break ;
                case 3 :
                    if ( power % 2 === 1 ) {
                        continue loop_c ;
                    }
            }
        }

        const B = powers4k1.reduce( ( p, v ) => p * ( v + 1 ), 1 ) ;
        if ( B === 1 ) {
            count++ ;
        }
        else if ( B % 2 === 0 ) {
            count += B / 2 ;
        }
        else {
            count += ( B + ( ( power2 % 2 === 0 ) ? -1 : 1 ) ) / 2 ;
        }

        count -= prune_perimeter( c, perimeter ) ;

        if ( ( c-1 ) % 100000 === 0 ) console.log( "c =", c, count ) ;

    }

    return count ;

}

function prune_perimeter( c, perimeter ) {
     
    const r_sq = c*c - 1 ;
    const r = Math.sqrt( r_sq ) ;

    let a_start = Math.floor( r / Math.SQRT2 ) ;
    if ( a_start % 2 === 1 ) {
        a_start++ ;
    }

    let count = 0, b ;

    for ( let a = a_start ; a < r ; a += 2 ) {
        
        b = Math.sqrt( r_sq - a*a ) ;
//         console.log( `ALL  a:${a} b:${b} c:${c} r2=${r_sq} a_start=${a_start} perimeter=${a+b+c}` ) ;
        
        if ( a + b + c <= perimeter ) break ;

        if ( ( b === Math.floor( b ) ) && ( a + b + c > perimeter ) ) {
            count++ ;
//             console.log( `a:${a} b:${b} c:${c} r2=${r_sq} a_start=${a_start} perimeter=${a+b+c}` ) ;
        }

    }

    return count ;

}

//     const rt2 = Math.sqrt( 2 ) ;

//     let r_sq, r, a_start, b_sq, b, c_count, c_count_perimeter ;

//     for ( let c = 3 ; c < c_len ; c += 2 ) {

//         if ( c_sieve[c] ) continue ;

//         r_sq = sqs[c] - 1 ;
//         r = Math.sqrt( r_sq ) ;

//         a_start = Math.floor( r / rt2 ) ;
//         if ( a_start % 2 === 1 ) {
//             a_start++ ;
//         }

//         c_count = 0 ;
//         c_count_perimeter = 0 ;

//         for ( let a = a_start ; a < r ; a += 2 ) {
//             b_sq = r_sq - sqs[a] ;
//             b = Math.sqrt( b_sq ) ;
//             if ( b === Math.floor( b ) ) {
//                 c_count++;
//                 if ( a + b + c < perimeter ) {
//                     c_count_perimeter++ ;
//                 }
// //                 console.log( `a:${a} b:${b} c:${c} r2=${r_sq} r:${r.toFixed(4)} a_start=${a_start} perimeter=${a+b+c}` ) ;
//             }
//         }

//         count += c_count ;
//         count_perimeter += c_count_perimeter ;    

//         if ( ( c-1 ) % 100000 === 0 ) console.log( "c =", c, count, count_perimeter ) ;

//     }

//     console.log( `count:${count} count_perimeter=${count_perimeter}` ) ;
//     return count_perimeter ;

// }


/*

function match_evn( array, pos, c_sq ) {

    let count = 0 ;
    let compare = c_sq - 2 * array[pos], l_pos = pos, h_pos = pos ;

    if ( compare === 0 ) {
        count++ ;
//         console.log( c_sq, pos, pos ) ;
        l_pos -=2 ;
        h_pos +=2 ;
    }
    else if ( compare > 0 ) {
        h_pos += 2 ;
    }
    else {
        l_pos -= 2 ;
    }

    count += match_search( array, l_pos, h_pos, c_sq ) ;

    return count ;

}

function match_odd( array, l_pos, h_pos, c_sq ) {

    return match_search( array, l_pos, h_pos, c_sq ) ;

}

function match_search( array, l_pos, h_pos, c_sq ) {

    let count = 0 ;
    let compare = 0 ;
    
    while ( l_pos > 1 && h_pos < array.length && array[h_pos] < c_sq ) {
    
        compare = c_sq - array[l_pos] - array[h_pos] ;
        if ( compare === 0 ) {
//             console.log( c_sq, l_pos, h_pos ) ;
            count++ ;
            l_pos -=2 ;
            h_pos +=2 ;
        }
        else if ( compare > 0 ) {
            h_pos +=2 ;
        } 
        else {
            l_pos -=2 ;
        }
    
    }
    
    return count ;

}

function binary_search( array, target ) {

    if ( target > array[array.length-1] ) {
        return array.length ;
    }

    let start = 0, end = array.length - 1;
    let index = Math.floor( ( end - start ) / 2 ) + start ;
    
    while ( start < end ) {

        var value = array[index];

        if ( value === target ) {
            break;
        }
        
        if ( target < value ) {
            end = index;
        }
        else {
            start = index + 1;
        }

        index = Math.floor( ( end - start ) / 2 ) + start ;

    }
    
    return index;

}

*/
