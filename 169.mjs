
function E169( num ) {

    const sum_powers_2 = [ ] ;
    while ( num > 0 ) {
        const max_power_2 = Math.floor( Math.log2( num ) ) ;
        const max_power_2_num = Math.pow( 2, max_power_2 ) ;
        sum_powers_2.push( max_power_2_num ) ;
        num -= max_power_2_num ;
    }

    const sum_frequency = new Map( [ [ 1, 0 ] ] ) ;
    let max_power = sum_powers_2[0] ;
    while ( max_power > 1 ) {
        sum_frequency.set( max_power, 0 ) ;
        max_power /= 2 ;
    }
    sum_powers_2.forEach( sum_power => sum_frequency.set( sum_power, 1 ) ) ;

    const instance = { sum_powers: sum_powers_2, sum_frequency: sum_frequency, pos: 0 }

    return instance ;

}

function recurse( instance ) {

    const { sum_powers, sum_frequency, pos } = instance ;

    let is_countable = true ;
    for ( const frequencey of sum_frequency ) {
        if ( frequencey > 2 ) {
            is_countable = false ;
            break ;
        }
    }

    let count = is_countable ? 1 : 0 ; 
    if ( pos == sum_powers.length ) {
        return count ;
    }    

//     let is_reduced_from_pos = true ;
    
    

}