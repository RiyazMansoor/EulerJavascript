


function is_achilles( map ) {

    const powers = Object.values( map ) ;
    
    // n % p^2 == 0
    for ( let power of powers ) {
        if ( power == 1 ) return false ;
    }
    
    // n != a^b  
    const gcd = Numbers.GCD( ...powers ) ;
    return gcd == 1 ;

} 

function euler_totient( map, numbers ) {

    let tmp_map = Object.assign( {}, map ) ;

    // bases should NOT vary in this calculation
    let bases = Object.keys( map ).map( ( base ) => parseInt( base ) ) ; 

    for ( const base of bases ) {

        if ( base == 2 ) continue ;

        Numbers.MultiplyMap( tmp_map, numbers.PrimeFactorsOf( base - 1 ) ) ;
        
    }   

    // here bases must always be from the original      
    for ( const base of bases ) {

        tmp_map[base]-- ;
    
    }

    return tmp_map ;

}

function step( this_depth, this_value, this_num, this_options, limit, numbers ) {

    if ( this_depth > 1 ) {
        if ( is_achilles( this_num ) ) {
            const totient =  euler_totient( this_num, numbers ) ;
            // console.log( "XXX", this_num, this_value, totient ) ;
            if ( is_achilles( totient ) )  {
                console.log( this_num, this_value, totient ) ;
                return 1 ;
            }
        }
    }

    let this_count = 0 ;

    for ( let pi = 0 ; pi < this_options.length ; pi++ ) {
   
        const prime = this_options[pi] ;
        
//         if ( this_depth == 0 && prime == 3 ) 
//             console.log("YES") ;

        if ( ( this_value * ( prime ** 3 ) ) > limit ) break ;

        let new_this_value = this_value * prime ** 2 ;
        let new_this_num = Object.assign( {}, this_num ) ;
        Numbers.MultiplyMap( new_this_num, { [prime]: 2 } ) ;

        while ( new_this_value < limit ) {

//             console.log( new_this_num, new_this_value ) ;

            this_count += step( this_depth + 1, new_this_value, new_this_num, this_options.slice( pi+1 ), limit, numbers ) ;
             
            new_this_value *= prime ;
            Numbers.MultiplyMap( new_this_num, { [prime]: 1 } ) ;

        }

    }
    

    return this_count ;

}

function E302( limit ) {

    const numbers = new Numbers( Math.trunc( Math.pow( limit/4, 0.34 ) ) ) ;
    const primes = numbers.Primes() ;
    console.log( primes ) ;

    const count = step( 0, 1, {}, primes, limit, numbers ) ;

    return count ;


}
