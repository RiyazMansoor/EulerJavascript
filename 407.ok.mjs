
function E407( limit ) {

    const lfs = new LeastFactors( limit+1 ) ;

    let sum = 0 ;

    for ( let n = 2 ; n <= limit ; n++ ) {

        const nfactors = lfs.Factors( n ) ;
        if ( nfactors.size === 1 ) {
            sum += 1 ;
            continue ;
        }

        let factor_power_max = 0 ;
        for ( const [ base, power ] of nfactors.entries() ) {
            const factor_power = base ** power ;
            if ( factor_power > factor_power_max ) {
                factor_power_max = factor_power ;
            }
        }

        for ( let a = n - factor_power_max ; a > 0 ; a -= factor_power_max ) {

            if ( ( a * ( a + 1 ) ) % n === 0 ) {
                sum += a + 1 ;
//                 console.log( n, a+1, factor_power_max ) ;
                break ;
            }

            if ( ( a * ( a - 1 ) ) % n === 0 ) {
                sum += a ;
//                 console.log( n, a, factor_power_max ) ;
                break ;
            }

        }

    }

    return sum ;

}

function E407X( limit ) {

    const lfs = new LeastFactors( limit+1 ) ;

    let sum = 0, list = [] ;

    for ( let n = 2 ; n <= limit ; n++ ) {
        for ( let a = n - 1 ; a > 0 ; a-- ) {
            if ( (a*a) % n === a ) {
                sum += a ;
                list.push( a ) ;
//                 if ( a === 11304 ) console.log( "n", n ) ;
                break ;
            }
        }
    }

//     console.log( sum ) ;
//     return list ;
    return sum ;

}