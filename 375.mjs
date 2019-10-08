
function* Random() {
    let state = 290797 ;
    yield state ;
    while ( true ) {
        state = ( state ** 2 ) % 50515093 ;
        yield state ;
    }
} 

function E375( limit ) {

    const RepeatStartIndex = 6308948 ;  // prem testing, repeats from S1 (not S0)

    const Cycle = new Uint32Array( RepeatStartIndex ) ;
    const Minimums = new Uint32Array( RepeatStartIndex ) ;

    const rand = Random() ;
    rand.next().value ;                 // pass over S(0) as per spec

    for ( let i = 0 ; i < RepeatStartIndex ; i++ ) {
        Cycle[i] = rand.next().value ;
    }

    console.log( Cycle[0], rand.next().value ) ; // this is a check that the period starts here
//     console.log( Cycle.slice( 0, limit ) ) ;

    let result = 0, minimum = 1e9, minimums_sum = 0 ;

    for ( let i = limit - 1 ; i >= 0 ; i-- ) {
        minimum = Math.min( minimum, Cycle[i] ) ;
        Minimums[i] = minimum ;
        minimums_sum += minimum ;
    }
    minimums_sum -= ( Minimums[limit] || 0 ) ;

    for ( let j = limit - 1 ; j >= 0 ; j-- ) {
        minimum = 1e9 ;
        minimums_sum -= ( Minimums[j+1] || 0 ) ; // chop off last element from previous iteration
        for ( let i = j ; i >= 0 ; i-- ) {
            minimum = Math.min( minimum, Cycle[i] ) ;
//             console.log( j, i, Cycle[i], Minimums[i], minimum ) ;
            if ( Minimums[i] !== minimum ) {
                minimums_sum += minimum - Minimums[i] ;
                Minimums[i] = minimum ;
            }
            else {
//                 console.log( "Met", j, i ) ;
                result += minimums_sum ;
                break ;
            }
//             console.log( j, i, Cycle[i], Minimums[i], minimum ) ;
//             console.log( Minimums.slice( 0, i ) ) ;
        }
        let min2 = 1e9, min_sum = 0 ;
        for ( let i = j ; i >= 0 ; i-- ) {
            min2 = Math.min( Cycle[i], min2 ) ;
            min_sum += min2 ;
        }        
        if ( min_sum !== minimums_sum ) {
            console.log( j, minimums_sum, min_sum ) ;
        }
//         console.log( "C", Cycle.slice( 0, j+1 ) ) ;
//         console.log( "M", Minimums.slice( 0, j+1 ) ) ;
        // debug
//         let mins_sum = 0 ;
//         for ( let x = 0 ; x <= j ; x++ ) {
//             mins_sum += Cycle.slice( x, j+1 ).reduce( ( min, cur ) => min < cur ? min : cur, 1e10 ) ;
//         }
//         if ( minimums_sum !== mins_sum ) {
//             console.log( j, minimums_sum, mins_sum ) ;
//         }
//         console.log( j, minimums_sum, Minimums.slice( 0, j+1 ).reduce( ( tot, curr ) => tot + curr, 0 ), Minimums.slice( 0, j+1 ) ) ;
//         result += Minimums.slice( 0, j+1 ).reduce( ( total, curr ) => total + curr, 0 ) ;
    }

    return result ;

//     const ctrl = [ 629527 , ]
//     const cache = new Set() ;
//     const rand = Random() ;
//     for ( let i = 1 ; i < limit ; i++ ) {
//         const state = rand.next().value ;

//         if ( cache.has( state ) ) {

//             console.log( state, i ) ;
//         }
//         else {
//             cache.add( state ) ;
//         }
//     }
//     return cache.size ;
}