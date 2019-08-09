
/**
 For a^x * b^y * ... * c^3 
   1) is NOT achilles c ^ 4 upwards will NOT be achilles
 If 

 */

function is_achilles( map ) {

    const powers = Object.values( map ) ;
    
    // n % p^2 == 0
    for ( const power of powers ) {
        if ( power == 1 ) return false ;
    }
    
    // n != a^b  
    const gcd = NumUtil.GCD( ...powers ) ;
    return gcd == 1 ;

} 

function euler_totient( map, factors ) {

    const tmp_map = Object.assign( {}, map ) ;

    const bases = Object.keys( map ).map( ( base ) => parseInt( base ) ) ; 

    for ( const base of bases ) {

        tmp_map[base]-- ;
    
        if ( base == 2 ) continue ;
        NumUtil.MultiplyMap( tmp_map, factors[base] ) ;
        
    }   

    return tmp_map ;

}

function recurse1( this_depth, this_value, this_num, this_primes, limit, factors ) {

    let this_count = 0 ;
    const this_num_totient =  euler_totient( this_num, factors ) ;

    if ( this_depth > 1 ) {

        // ensure if a strong achilles then it is counted
        if ( is_achilles( this_num ) ) {
            if ( is_achilles( this_num_totient ) )  {
//                 console.log( this_num, this_value, this_num_totient ) ;
                this_count = 1 ;
            }
        }

    }

    // look ahead to see if there are absolutely no possibility of a solution
    if ( this_depth > 2 && this_primes.length > 0 ) {

        const this_num_bases_inerr = [] ;
        for ( const [ base, prime ] of Object.entries( this_num_totient ) ) {
            if ( prime == 1 ) this_num_bases_inerr.push( parseInt( base ) ) ;
        }

        if ( this_num_bases_inerr.length > 0 ) {
            
            const running_factors = {} ;
            let running_value = this_value  ;
            for ( const prime of this_primes ) {
                const big_prime = BigInt( prime ) ;
                running_value *= big_prime * big_prime ;
                if ( running_value < limit ) {
                    NumUtil.MultiplyMap( running_factors, factors[prime] ) ;
                }
            }

            for ( const base of this_num_bases_inerr ) {
                if ( !running_factors[base] ) {
//                     console.log( "path fail => ", this_num, this_num_totient ) ;
                    return this_count ;
                }
            }

        }

    }

    for ( const [ pi_str, prime ] of Object.entries( this_primes ) ) {
   
        const pi = parseInt( pi_str ) ;
        const big_prime = BigInt( prime ) ;
        
        if ( ( this_value * big_prime**3n ) > limit ) break ;

        let new_this_value = this_value * big_prime**2n ;
        let new_this_num = Object.assign( {}, this_num ) ;
        new_this_num[prime] = 2 ;

        while ( new_this_value < limit ) {

            this_count += recurse( this_depth + 1, new_this_value, new_this_num, this_primes.slice( pi+1 ), limit, factors ) ;
             
            new_this_value *= big_prime ;
            new_this_num[prime]++ ;

        }

    }
    
//     if ( this_depth < 4 ) console.log( this_depth, this_num ) ;

    return this_count ;

}


function E302( limit ) {

    const numbers = new PrimeGenerator( Math.trunc( Math.pow( limit/4, 0.34 ) ) ) ;
    const primes = numbers.Primes() ;

    const factors = {}, factor_next = {} ;
    for ( const prime of primes ) {
        factors[prime] = numbers.PrimeFactorsOf( prime - 1 ) ;
        factor_next[prime] = {} ;
    }
    for ( const [ pi, prime ] of primes ) {
        for ( const [ base, power ] of factors[prime] ) {
            for ( let pi_next = pi+1 ; pi_next < primes.length ; pi_next++ ) {
                
            }
        }
        factors[prime] = numbers.PrimeFactorsOf( prime - 1 ) ;
        factor_next[prime] = 0 ;
    }



//     let factor_cum = null ;
//     const factors_cum = {} ;
//     for ( const prime of primes.slice().reverse() ) {
//         const new_factor_cum = Object.assign( {}, factors[prime] ) ;
//         if ( factor_cum ) {
//             NumUtil.MultiplyMap( new_factor_cum, factor_cum ) ;
//         }
//         factor_cum = new_factor_cum ;
//         factors_cum[prime] = new_factor_cum ;
//     }

//     console.log( factors, factors_cum ) ;

    console.log( "prime count = " + primes.length ) ;

    const count = recurse( 0, 1n, {}, primes, BigInt( limit ), factors ) ;

    return count ;


}

// function step( this_depth, this_value, this_num, this_primes, limit, factors ) {

// //     if ( this_primes.length == 0 ) return 0 ;

// //     const this_prime = this_primes[0] ;
// //     const this_big_prime = BigInt( this_prime ) ;

// //     if ( this_value * this_big_prime**3n > limit ) return 0 ;

//     // this_num will always be achilles compliant except for n = a^b rule => need gcd of powers
//     const this_num_powers_gcd = NumUtil.GCD( ...Object.values( this_num ) ) ;

//     let this_count = 0 ;

//     for ( const [ pi_str, this_prime ] of Object.entries( this_primes ) ) {

//         const pi = parseInt( pi_str ) ;

//         const this_big_prime = BigInt( this_prime ) ;
//         if ( this_value * this_big_prime**3n > limit ) break ;

//         const this_num_totient = NumUtil.MultiplyMap( euler_totient( this_num, factors ), factors[this_prime] ) ;
//         const this_num_totient_powers = Object.values( this_num_totient ) ;
//         const this_num_totient_powers_gcd = NumUtil.GCD( ...this_num_totient_powers ) ;
//         const this_num_totient_powers_min = this_num_totient_powers.reduce( ( min, cur ) => { return ( min > cur ) ? cur : min }, 100 ) ;

//         let new_this_value = this_value * this_big_prime ;
//         const new_this_num = Object.assign( {}, this_num ) ;
//         new_this_num[this_prime] = 1 ;

//         for ( let power = 2 ; true ; power++ ) {

//             new_this_value *= this_big_prime ;
//             if ( new_this_value > limit ) break ;

//             new_this_num[this_prime]++ ;

//             if ( this_depth > 0 && power > 2 ) {
//                 if ( this_num_totient_powers_min > 1 ) {
//                     if ( this_num_powers_gcd == 1 || NumUtil.GCD( this_num_powers_gcd, power ) == 1 ) {
//                         if ( this_num_totient_powers_gcd == 1 || NumUtil.GCD( this_num_totient_powers_gcd, power - 1 ) == 1 ) {
// //                             console.log( this_num, this_value, new_this_num, new_this_value ) ;
//                             this_count++ ;
//                         }
//                     }
//                 }

//             }

//             // recurse
//             this_count += step( this_depth + 1, new_this_value, new_this_num, this_primes.slice( pi+1 ), limit, factors ) ;

//         }

//     }

//      if ( this_depth < 4 && this_count == 0 ) console.log( this_depth, this_num ) ;

//     return this_count ;

// }

