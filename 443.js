
function fn( n, prev_fn_value ) {
    return prev_fn_value + NumUtil.GCD( n, prev_fn_value ) ;
}

function E443( max_n ) {

    const results = new Array( 5 ).fill( undefined ) ;
    results[4] = 13

    let prev_fn_value = 13 ;
    for ( let n = 5 ; n < max_n ; n++ ) {
        results.push( fn( n, results[n-1] ) ) ;
        console.log( n, results[n] ) ;
//         if ( n % 1000 == 0 ) console.log( n, results[n] ) ;
    }

    return 0 ;

}