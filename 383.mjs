
function FivePow( n ) {
    let count = 0 ;
    while ( n % 5 === 0 ) {
        count++ ;
        n /= 5 ;
    }
    return count ;
}

function FactorialFivePow( n ) {
    let count = 0 ;
    for ( let i = n ; i > 4 ; i-- ) {
        count += FivePow( i ) ;
    }
    return count ;
}

function E383( limit ) {

    // 1e10 => 16505212 in 1m1s
     
    let matches = 2 ; // i = 5, 10 

    let lhs_num, lhs_cnt, rhs_cnt ;

    for ( let i = 25 ; i <= limit ; i += 25 ) {

        lhs = 2 * i - 1 ;
        lhs_cnt = 0 ;
        rhs_cnt = 0 ;
        for ( j = 5 ; j <= lhs ; j *= 5 ) {
            lhs_cnt += Math.floor( lhs / j ) ;
            rhs_cnt += Math.floor(   i / j ) ;
        }
        rhs_cnt *= 2 ;
//         console.log( i, lhs_cnt, rhs_cnt ) ;
        if ( lhs_cnt >= rhs_cnt ) continue ;

        matches++ ;

        if ( lhs_cnt + FivePow( i / 5 ) >= rhs_cnt ) continue ;

        matches += 2 ;

    }

    return matches ;

    /*

    let matches = 2, 
        lhs_count = 8, rhs_count = 8,
        lhs_num = 39 , rhs_num = 20
    ;

    // each step : i += 5
    function step() {
        lhs_num += 10 ;
        lhs_count += FivePow( lhs_num - 9 ) + FivePow( lhs_num - 4 ) ;
        rhs_num += 5 ;
        rhs_count += 2 * FivePow( rhs_num ) ;
//         console.log( rhs_count / 2 - 1, (rhs_count / 2 - 1) * 5 ,lhs_count, rhs_count ) ;
    }

    for ( let i = 25 ; i <= limit ; i += 25 ) {

        const steps = [ [ 2, 2 ], [ 2, 2 ], [ 2, 2 ], [ 2, 2 ], [ 2, 2 ] ] ;
        steps[0][1] += 2 * FivePow( i / 25 ) ;
        steps[1][0] += FivePow( 2 * ( i + 5 ) / 25 ) ;
        steps[3][0] += FivePow( 2 * ( i + 15 ) / 25 ) ;
        
        step() ;
        if ( lhs_count < rhs_count ) matches++ ; // { matches++ ; console.log( i, lhs_count-rhs_count ) ; } ;

        step() ;
        if ( lhs_count < rhs_count ) matches++ ; // { matches++ ; console.log( i, lhs_count-rhs_count ) ; } ;

        step() ;
        if ( lhs_count < rhs_count ) matches++ ; // { matches++ ; console.log( i, lhs_count-rhs_count ) ; } ;

        step() ;
        step() ;

    }

    return matches ;


    const facs = new Map() ;

    let count = 0 ;

    for ( let i = 5 ; i <= limit ; i += 5 ) {
                
        const lhs = 2 * i - 1 ;
        let lhsfac = facs.get( lhs ) ;
        if ( !lhsfac ) {
            lhsfac = FactorialFivePow( lhs ) ;
            facs.set( lhs, lhsfac ) ;
        }
        else {
            console.log( "lhs cache", i, lhs )
        }

        const rhs = i ;
        let rhsfac = facs.get( rhs ) ;
        if ( !rhsfac ) {
            rhsfac = FactorialFivePow( rhs ) ;
            facs.set( rhs, rhsfac ) ;
        }
        else {
//             console.log( "rhs cache", i, rhs )
        }

        if ( lhsfac < 2 * rhsfac ) {
            console.log( `i=${i} lhs=${lhs} lfac=${lhsfac} 2rfac=${2*rhsfac} ` ) ;
            count++ ;
        }
        else {
            console.log( ` XXX i=${i} lhs=${lhs} lfac=${lhsfac} 2rfac=${2*rhsfac} ` ) ;
        }

    }

    return count ;

    */

}