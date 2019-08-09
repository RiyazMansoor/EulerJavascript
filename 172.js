

function recurse_172( this_depth, this_options, this_seq, MAX_DEPTH, CACHE ) {

    if ( this_depth == MAX_DEPTH ) {
//         console.log( this_seq ) ;
        return 1 ;
    }

    let this_count = 0 ;

    for ( let digit = 0 ; digit < this_options.length ; digit++ ) {

        let digit_count = this_options[digit] ;
        if ( digit_count == 0 ) continue ;

        const new_this_options = this_options.slice() ;
        new_this_options[digit]--;

        const cache_key = new_this_options.slice().sort().join( "," ) ;
        const cache_key_value = CACHE[cache_key] ;

        if ( cache_key_value ) {

//             console.log( `CACHE[ ${cache_key} ] = ${cache_key_value}` ) ;
            this_count += cache_key_value ;
        
        } else {

            const new_this_seq = this_seq.concat( [ digit ] ) ;

            const recurse_count = recurse_172( this_depth + 1, new_this_options, new_this_seq, MAX_DEPTH, CACHE ) ;
            CACHE[cache_key] = recurse_count ;
            this_count += recurse_count ;

        }

    }

    return this_count ;

}


function E172( max_depth ) {

    const options = new Array( 10 ).fill( 3 ) ;
    
    const result = recurse_172( 0, options, [], max_depth, {} ) ;
    const actual_result = result / 10 * 9

    console.log( ` final result = ${result} but excluding leading zeros ${actual_result}` ) ;

    return actual_result ;

}