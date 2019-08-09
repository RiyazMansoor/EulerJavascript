

function recurse_178( this_depth, this_digit, this_min, this_max, this_pan, MAX_DEPTH ) {

    if ( this_depth == MAX_DEPTH ) {
        if ( this_max == this_min ) {
            return 1 ;
        }
        return 0 ;
    }

    const closest_edge = Math.min( Math.abs( this_digit - this_max ), Math.abs( this_digit - this_min ) ) ;
    const distance = closest_edge + this_max - this_min ;
    if ( distance == ( MAX_DEPTH - this_depth ) ) {
        return 1 ;
    } 
    if ( distance < ( MAX_DEPTH - this_depth ) ) {
        return 0 ;
    }

    let this_new_digits = [] ;
    switch ( this_digit ) {
        case 0 : this_new_digits.push( 1 ) ; break ;
        case 9 : this_new_digits.push( 8 ) ; break ;
        default : this_new_digits.push( this_digit - 1, this_digit + 1 ) ;
    }

    let this_count = 0 ;

    for ( const new_this_digit of this_new_digits ) {

        let new_this_pan = this_pan ;

        let new_this_min = this_min ;
        if ( new_this_digit == this_min ) {
            let pos = ( 1 << new_this_digit ) ;
            new_this_pan = this_pan | pos ;
            while ( pos < this_max ) {
                pos = pos << 1 ;
                if ( ( new_this_pan & pos ) == 1 )
            }
        }

        let new_this_max = this_max ;
        if ( new_this_digit == this_max ) {
            
        }

        this_count += recurse_178( this_digit + 1, new_this_digit, new_this_min, new_this_max, MAX_DEPTH ) ;

    }
    

    return this_count ;

}


function E178() {


}