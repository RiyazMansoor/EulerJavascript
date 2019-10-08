

// returns the next 3 primitive pythagorean triples
function NextTriples( triple ) {

    const [ a, b, c ] = triple ;
    const a2 = 2 * a, b2 = 2 * b, c2 = 2 * c, c3 = 3 * c ;

    return [
        [ ( a - b2 + c2 ),  ( a2 - b + c2 ),  ( a2 - b2 + c3 )  ], 
        [ ( a + b2 + c2 ),  ( a2 + b + c2 ),  ( a2 + b2 + c3 )  ], 
        [ ( -a + b2 + c2 ), ( -a2 + b + c2 ), ( -a2 + b2 + c3 ) ], 
    ] ;

}

function recurse( depth, triple, container ) {

    if ( triple[2] > container.limit ) {
        return ;   
    }
//      console.log( triple ) ;

    container.count++ ;
    if ( depth === container.depth ) {
        container.triples.push( triple ) ;
        return ;
    }

    const new_triples = NextTriples( triple ) ;

    for ( const new_triple of new_triples ) {
        recurse( depth+1, new_triple, container ) ;
    }

}

function E540( depth, limit ) {

    let source = [ [ 3, 4, 5 ] ] ;

    let count = 0 ;   
     
    do {
        const target = [] ;
        for ( const triple of source ) {
            const container = { count:0, triples:[], depth:depth, limit:limit } ;
            recurse( 0, triple, container ) ;
            count += container.count - 1 ;
            container.triples.forEach( t => target.push( t ) ) ;
        }
        source = target ;
        console.log( count, source.length ) ;
    } while ( source.length > 0 ) ;
    
    return count ;

}

/*
function E540( limit ) {

/*
    const triple = { a:3, b:4, c:5 } ;

    const container = { count:0, triples:[], depth:depth, limit:limit } ;
    recurse( 0, triple, container ) ;

    console.log( container ) ;
* /

    const LIMIT = limit ; // 3141592653589793 ; // 3,141,592,653,589,793
    const M_MAX = Math.ceil( Math.sqrt( LIMIT ) ) ;

    const pfs = new PrimeFactors( M_MAX + 1 ) ;

    const cache_odd = new Map() ;
    const cache_even = new Map() ;
    let count = 1 ;
    let n_tmp = 1 ;

    for ( let m = 3 ; m < M_MAX ; m++ ) {
    
        if ( m % 100000 === 0 ) console.log( ` m=${m-1} n=${n_tmp} count=${count}` ) ;

        // n_max is inclusive ie upto m-1
        let n_max = Math.floor( Math.sqrt( limit - m*m ) ) ;
        if ( n_max >= m ) {
            n_max = m - 1 ;
        }
        n_tmp = n_max ;

        if ( pfs.IsPrime( m ) ) {
            count += Math.floor( n_max / 2 )  ;
            continue ;
        }

        const factors = Array.from( pfs.Factors( m ).keys() ) ;
        let period = factors.reduce( ( product, current ) => product * current, 1 ) ;

        // special case for odd m to adjust for odd-odd m-n
        let cache = cache_even ;
        if ( m % 2 === 1 ) {
            period *= 2 ;
            cache = cache_odd ;
        }

        const period_sieve = period + 1 ; 
        const period_cnt = Math.floor( n_max / period );
        const period_rem = n_max % period ;

        let sieve = cache.get( period ) ;
        if ( !sieve ) {
            const period1 = period + 1 ; // seive created from start..end ( where end exclusive )
            sieve = new BitSieve( 1, period1 ) ;
            sieve.SetByIterable( factors ) ;
            if ( factors[0] !== 2 ) {
                // m is odd
                sieve.SetByArithmeticSeries( 1, 2 ) ;
            }
            cache.set( period, sieve ) ;
        }

//         const max = ( n_max < period ) ? n_max : period ;
        count += period_cnt * ( period - sieve.Count ) ;
        if ( period_rem > 0 ) {
            count += period_rem - sieve.CountTo( period_rem+1 ) ;
        }

    }

    return count ;

}

*/
/*
function E540_( limit ) {

    let base = [ { a:3, b:4, c:5 } ] ;
    let count = 1 ;

    while ( base.length > 0 ) {

        let result = [] ;
        for ( const triple of base ) {
            const container = { count:0, triples:[], depth:20, limit:limit } ;
            recurse( 0, triple, container ) ;
            result = result.concat( container.triples ) ;
            count += container.count - 1
        }

        base = result ;

    }

    return count ;
}





function recurse( depth, triple, container ) {

    if ( triple.c > container.limit ) {
        return ;   
    }
//      console.log( triple ) ;

    container.count++ ;
    if ( depth === container.depth ) {
        container.triples.push( triple ) ;
        return ;
    }

    const new_triples = NextTriples( triple ) ;

    for ( const new_triple of new_triples ) {
        recurse( depth+1, new_triple, container ) ;
    }

}


/*
    for limit == 1e2
    m == 2 (2,4,8) => count == 6 (1+2+3)
    m == 3 (3,9)   => count == 3 (1+2)
    m == 5 (5)     => count == 2 (2)
    m == 6 (6)     => count == 2 (2)
    m == 7 (7)     => count == 3 (3)

    1e11 => 7242664693  ( 1m40s )
    1e12 => 72133273399 ( 14m30s )
 */

/*
function E540( limit ) {

    const LIMIT = ( limit ) ? limit : 3141592653589793 ;
    const M_MAX = Math.floor( Math.sqrt( LIMIT ) ) ;

    const pfs = new PrimeFactors( M_MAX ) ;
    const m_sieve = new Array( M_MAX + 1 ).fill( false ) ; 

    const evn_mask = 0x55555555 ;
    const evn_sieve = new Uint32Array( Math.ceil( M_MAX / 32 ) ).fill( evn_mask) ;
    const odd_mask = 0xAAAAAAAA ;
    const odd_sieve = new Uint32Array( Math.ceil( M_MAX / 32 ) ).fill( odd_mask ) ;

    const cnt_sieve = new Uint8Array( Math.ceil( M_MAX / 32 ) ) ;

//     const t_sieve = new Array( M_MAX + 1 ) ;
//     const t_match = new Array( M_MAX + 1 ) ;

    let count = 0 ;

    for ( let m = 2 ; m <= M_MAX ; m++ ) {
    
        if ( m_sieve[m] ) continue ;

//         console.log(m, count) ;

        const m_is_odd = ( m % 2 === 1 ) ;
        const factors = Array.from( pfs.Factors( m ).keys() ) ;
        const period = factors.reduce( ( product, current ) => product * current, 1 ) ;
        const mod_period = period * ( m_is_odd ? 2 : 1 ) ;
        const mod_period1 = mod_period + 1 ;

        const sieve = ( m_is_odd ) ? odd_sieve : evn_sieve ;

        for ( const factor of factors ) {
            if ( factor === 2 ) continue ;
            const step = 2 * factor ;
            const start = ( m_is_odd ) ? step : factor ;
            for ( let i = start ; i < mod_period1 ; i += step ) {
                const i2 = Math.floor( i / 32 ) ;
                sieve[i2] |= ( 1 << ( i % 32 ) ) ;
            }
        }

        // padd last uint32 with zeros
        const rem = mod_period1 %  32 ;
        if ( rem > 0 ) {
            const mask = ( 1 << rem ) - 1 ;
            sieve[ Math.floor( mod_period1 / 32 ) ] &= mask ;
        }

        let period_match_count = 0 ;
        const arr_len = Math.floor( mod_period1 / 32 ) ;
        for ( let i = 0 ; i <= arr_len ; i++ ) {
            period_match_count += BitCount32( sieve[i] ) ;
            cnt_sieve[i] =  period_match_count ;
        }

//         if ( m_is_odd ) {
//             for ( let i = 1 ; i < mod_period1 ; i += 2 ) {
//                 t_sieve[i] = true ;
//                 t_sieve[i+1] = false ;
//             }
//             for ( const factor of factors ) {
//                 const factor2 = 2 * factor ;
//                 for ( let i = factor2 ; i < mod_period1 ; i += factor2 ) {
//                     t_sieve[i] = true ;
//                 }
//             }
//         } else {
//             for ( let i = 1 ; i < mod_period1 ; i += 2 ) {
//                 t_sieve[i] = false ;
//                 t_sieve[i+1] = true ;
//             }            
//             for ( const factor of factors ) {
//                 if ( factor === 2 ) continue ;
//                 for ( let i = factor ; i < mod_period1 ; i += 2*factor ) {
//                     t_sieve[i] = true ;
//                 }
//             }
//         }


//         let cum = 0 ;
//         for ( let i = 1 ; i < mod_period1 ; i++ ) {
//             if ( !t_sieve[i] ) {
//                 cum++ ;
//             }
//             t_match[i] = cum ;
//         }
//         const period_match_count = t_match[mod_period] ;

        const gcd_same_m_s = Array.from( gcd_same( factors, M_MAX ) ).sort( ( a, b ) => a - b ) ;

        for ( const new_m of gcd_same_m_s ) {

            let n_max = Math.floor( Math.sqrt( limit - new_m*new_m ) ) ;
            if ( n_max >= new_m ) {
                n_max = new_m - 1 ;
            }

            const period_cnt = Math.floor( n_max / mod_period );
            const period_rem = n_max % mod_period ;

            count += period_cnt * period_match_count ;
            if ( period_rem > 0 ) {
//                 count += t_match[period_rem] ;
                const rem_ind = Math.floor( period_rem / 32 ) ;
                if ( rem_ind > 0 ) {
                    count += cnt_sieve[rem_ind-1] ;
                }
                const rem_rem = period_rem % 32 ;
                if ( rem_rem > 0 ) {
                    count += BitCount32( sieve[rem_ind] & ( 1 << ( rem_rem + 1 ) - 1 ) ) ;
                }
//                 count += BitCount32Upto( sieve, period_rem+1 ) ;
            }

            m_sieve[new_m] = true ;
//             console.log( m, new_m, count );

        }

        const mask_reset = ( m_is_odd ) ? odd_mask : evn_mask ;
        for ( let i = 0 ; i <= arr_len ; i++ ) {
            sieve[i] = mask_reset ;
        }

    }

    return count ;

}


function gcd_sets( instance, constants ) {

    const { product, position } = instance ;
    const { LIMIT, FACTORS } = constants ;

    const factor = FACTORS[position] ;

    let this_product = product ;
    let this_values = [ ] ;

    for ( let pos = position ; pos < FACTORS.length ; pos++ ) {
        while ( true ) {
            if ( pos+1 < FACTORS.length && FACTORS[pos+1] * this_product < LIMIT ) {
                const new_instance = { product: this_product, position:pos+1 } ;
                const new_values = gcd_sets( new_instance, constants ) ;
    //             if ( new_values.length > 0 ) {
                    this_values.push( new_values ) ;
    //             }
            }
            this_product *= factor ;
            if ( this_product > LIMIT ) break ;
            this_values.push( this_product ) ;
        } 
        if ( factor * this_product > LIMIT ) break ;
    }

    return this_values ;

}

function gcd_same( factors, limit ) {
    
    const gcd = factors.reduce( ( prod, val ) => prod * val, 1 ) ;
    
    let last = [ gcd ], now = [] ;

    const results = new Set( last ) ;

    while ( last.length > 0 ) {
        for ( const last_num of last ) {
            for ( const factor of factors ) {
                const num = last_num * factor ;
                if ( num > limit ) break ;
                if ( !results.has( num ) ) {
                    now.push( num ) ;
                    results.add( num ) ;
                }
            }
        }
        last = now ;
        now = [] ;
    }

    return results ;

}

function BitCount32Upto( uint32s, upto ) {
    const i_max = Math.floor( upto / 32 ) ;
    const i_rem = upto % 32 ;
    let count = 0 ;
    for ( let i = 0 ; i < i_max ; i++ ) {
        count += BitCount32( uint32s[i] ) ;
    }
    const mask = ( 1 << i_rem ) - 1 ;
    count += BitCount32( uint32s[i_max] & mask ) ;
    const firstbitadjustment = ( uint32s[0] & 1 ) ? 0 : 1 ;
    return upto - count - firstbitadjustment ;
}

function BitCount32( uint32 ) {
    uint32 = uint32 - ((uint32 >> 1) & 0x55555555)
    uint32 = (uint32 & 0x33333333) + ((uint32 >> 2) & 0x33333333)
    return ((uint32 + (uint32 >> 4) & 0xF0F0F0F) * 0x1010101) >> 24
}

*/

