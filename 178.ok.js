
/*

growth by number of digits (depth) for all step numbers 
            or if pan has been reached

            depth
            0	1	2	3	 4	 5	 6	  7	  8	  9	 10
         -----------------------------------------------
digit  0 |	1	1	2	3	 6	10	20	 35	 70	126	251
       1 |	1	2	3	6	10	20	35	 70	126	251	460
       2 |	1	2	4	7	14	25	50	 91	181	334	660
       3 |	1	2	4	8	15	30	56	111	208	409	770
       4 |	1	2	4	8	16	31	61	117	228	436	845
       5 |	1	2	4	8	16	31	61	117	228	436	845
       6 |	1	2	4	8	15	30	56	111	208	409	770
       7 |	1	2	4	7	14	25	50	 91	181	334	660
       8 |	1	2	3	6	10	20	35	 70	126	251	460
       9 |	1	1	2	3	 6	10	20	 35	 70	126	251



growth by number of digits (depth) for all PAN step numbers 

            depth
	        10	  11    12	  13	14	  15	16	  17	18    19	20
         --------------------------------------------------------------
digit  0 |	 1	   1    10    11	65	  77   350   440  1700  2244  7751
       1 |	 0	   1     1    11	12	  77	90   440   545	2245  2924
       2 |	 0	   0     1	   1	12	  13	90   105   545	 680  2925
       3 |	 0 	   0     0	   1	 1	  13	15   105   135	 680   950
       4 |	 0	   0     0	   0	 1	   2	15	  30   135	 270   950
       5 |	 0	   0     0	   0	 1	   2	15	  30   135	 270   950
       6 |	 0 	   0     0	   1	 1	  13	15	 105   135	 680   950
       7 |	 0	   0     1	   1	12	  13	90	 105   545	 680  2925
       8 |	 0	   1     1	  11	12	  77	90	 440   545	2245  2924
       9 |	 1 	   1    10	  11	65	  77   350	 440  1700  2244  7751


    for 9 only :
        E178(20) = 7751         0s
        E178(29) = 3764397      10s
        E178(32) = 39615366     32s
        E178(35) = 254187943    7m 53s

 */

function E178( max_depth ) {

    // create array of all possible counts bottom up
    const rows = 10, cols = max_depth-9 ;
    const counts = new Array( rows ) ;
    for ( let row = 0 ; row < rows ; row++ ) {
        counts[row] = new Array( cols ).fill( 1 ) ;
    }
    for ( let col = 1 ; col < cols ; col++ ) {
        counts[0][col] = counts[1][col-1] ;
        counts[9][col] = counts[8][col-1] ;
        for ( let row = 1 ; row < (rows-1) ; row++ ) {
            counts[row][col] = counts[row-1][col-1] + counts[row+1][col-1] ;
        }
    }
    
    const cache = {} ;

    const results = [] ;
    let count = 0 ;

    for ( let depth = 10 ; depth <= max_depth ; depth++ ) {



        for ( let i = 1 ; i < 10 ; i++ ) {

            const instance = {
                depth:      1, 
                digit:      i, 
                pan:        ( 1 << i ), 
                sequence:   [ i ], 
                max:        ( i == 9 ) ? 8 : 9, 
                min:        ( i == 0 ) ? 1 : 0
            } ;

            const result = recurse( instance, { MAX_DEPTH: depth, PAN: 1023, COUNTS: counts, CACHE: cache } ) ;
            results.push( result ) ;
            count += result ;
//             console.log( `digit=${i} => depth=${depth} => result=${result} || cache=${Object.keys(cache).length}` ) ;
 
        }
    }

    console.log( Object.keys(cache).length ) ;
 
    return count ;

}

// instance { depth, digit, pan, sequence, max, min }
// BYREF { MAX_DEPTH, PAN, CACHE }
function recurse( instance, BYREF ) {  // this_depth, this_digit, this_pan, this_seq, MAX_DEPTH, PAN, CACHE ) {

    const { depth, digit, pan, sequence, max, min } = instance ;
    const { MAX_DEPTH, PAN, COUNTS, CACHE } = BYREF ;

    if ( pan === PAN ) {
//         console.log( `PANned :: depth=${depth}, pan=${pan}, min=${min}, max=${max}, binary=${pan.toString(2)}, counts=${COUNTS[digit][MAX_DEPTH-depth]} seq=${sequence}` ) ;
        return COUNTS[digit][MAX_DEPTH-depth] ;
    }

    const depth_rem = MAX_DEPTH - depth ;
    const cache_key = depth_rem + "|" + digit + "|" + pan ;
    const cache_count = CACHE[cache_key] ;
    if ( cache_count ) {
//         console.log( `CACHE hit :: key=${cache_key}, value=${cache_count}, seq=${sequence} ` ) ;
        return cache_count ;
    }

    if ( depth === MAX_DEPTH ) {
        return 0 ;
    }

    const closest = Math.min( Math.abs( digit - max ), Math.abs( digit - min ) ) ;
    const distance = closest + max - min ;
    if ( distance === depth_rem ) {
//         console.log( `Distance=${distance} === Rem=${depth_rem} :: depth=${depth}, pan=${pan}, min=${min}, max=${max}, binary=${pan.toString(2)}, counts=${COUNTS[digit][MAX_DEPTH-depth]} seq=${sequence}` ) ;
        return 1 ;
    } 
    if ( distance > depth_rem ) {
//         console.log( `Distance=${distance} >>> Rem=${depth_rem} :: depth=${depth}, pan=${pan}, min=${min}, max=${max}, binary=${pan.toString(2)}, counts=${COUNTS[digit][MAX_DEPTH-depth]} seq=${sequence}` ) ;
        return 0 ;
    }

    let new_digits = [] ;
    switch ( digit ) {
        case 0 :  new_digits.push( 1 ) ; break ;
        case 9 :  new_digits.push( 8 ) ; break ;
        default : new_digits.push( digit - 1, digit + 1 ) ;
    }

    let count = 0 ;

    for ( const new_digit of new_digits ) {

        const pos = ( 1 << new_digit ) ;
        const new_pan = pan | pos ;
        
        let new_max = max, new_min = min ;
        if ( new_pan === pan ) {
            // do nothing as max and min has not changed
        }
        else if ( new_digit === max ) {
            new_max-- ;
            while ( ( new_pan & ( 1 << new_max ) ) > 0 ) {
                new_max-- ;
            }
        }
        else if ( new_digit === min ) {
            new_min++ ;
            while ( ( new_pan & ( 1 << new_min ) ) > 0 ) {
                new_min++ ;
            }
        }
        else {
            // do nothing
        }

        const new_instance = {
            depth:      depth + 1, 
            digit:      new_digit, 
            pan:        new_pan, 
            sequence:   sequence.concat( [ new_digit ] ), 
            max:        new_max, 
            min:        new_min
        }

        count += recurse( new_instance, BYREF ) ;

    }

    CACHE[cache_key] = count ;

    return count ;
    
}

