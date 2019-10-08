

// square ring whose hole side is n -> 4(n+1)
// cum square rings whose whole side is 1 -> 2n(n+3)

function E174( limit ) {

    const N = new Uint32Array( Math.floor( limit / 4 ) ) ;

    // largest hole that can form a ring is
    const sqside_max = Math.floor( limit / 4 ) - 1

    for ( let sqside = 1 ; sqside <= sqside_max ; sqside++ ) {
        let cum_tiles = 0 ;
        for ( let layer = sqside ; true ; layer += 2 ) {
            cum_tiles += 4 * layer + 4 ;
            if ( cum_tiles > limit ) break ;
            N[cum_tiles/4]++ ;
        }

    }

    const counts = new Uint32Array( 16 ) ;
    for ( const n of N ) {
        if ( n > 0 && n < 16 ) counts[n]++ ;
    }

    console.log( counts.slice( 1 ) ) ;

    return counts.slice( 1, 11 ).reduce( ( tot, val ) => tot + val, 0 ) ;

}