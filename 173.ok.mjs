

// square ring whose hole side is n -> 4(n+1)
// cum square rings whose whole side is 1 -> 2n(n+3)

function E173( limit ) {

    // largest hole that can form a ring is
    const sqside_max = Math.floor( limit / 4 ) - 1

    let count = 0 ;

    for ( let sqside = 1 ; sqside <= sqside_max ; sqside++ ) {
        let tiles = limit ;
        for ( let layer = sqside ; true ; layer += 2 ) {
            tiles -= 4 * ( layer + 1 ) ;
            if ( tiles < 0 ) break ;
            count++ ;
//             console.log( count, sqside, 4*(layer+1), limit-tiles ) ;
        }
    }

    return count ;

}