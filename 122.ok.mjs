

function iter( list, ValueTarget, LenLimit ) {

    const value = list[ list.length - 1 ] ;
    if ( value === ValueTarget ) {
        return list ;
    }

    const candidates = [] ;
    for ( let i = 0 ; i < list.length ; i++ ) {
        for ( let j = i + 1 ; j < list.length ; j++ ) {
            const sum = list[i] + list[j] ;
            if ( sum <= ValueTarget && sum > value && list.indexOf( sum ) < 0 ) {
                candidates.push( sum ) ;
            }
        }
    }
    if ( list.length < LenLimit && value * 2 <= ValueTarget ) {
        candidates.push( value * 2 ) ;
    }
    candidates.reverse() ;

    for ( const candidate of candidates ) {
        const new_list = list.concat( [ candidate ] )  
        if ( new_list.length < LenLimit ) {
            const listFound = iter( new_list, ValueTarget, LenLimit ) ;
            if ( listFound ) return listFound ;
        }
    }

    return false ;

}

function E122( limit ) {

    let sum = 0 ;

    for ( let k = 2 ; k <= limit ; k++ ) {

        const MinSteps = Math.ceil( Math.log2( k ) ) ; 

        for ( let bound = MinSteps + 1 ; true ; bound++ ) {
            const listFound = iter( [1], k, bound ) ;
            if ( listFound ) {
                sum += listFound.length - 1 ;
                console.log( k, MinSteps, listFound.length - 1, listFound ) ;
                break ;
            }
        }

    }

    return sum ;

}