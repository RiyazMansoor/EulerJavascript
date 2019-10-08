/*
   for number N
   if N % f0  == 0 => (17)     -> f1, f2, f8, f13
   if N % f1  == 0 => (2,3,13) -> f0, f2, f3, f4, f10, f12, f13
   if N % f2  == 0 => (19)     -> f3, f7, f13
   if N % f3  == 0 => (23)     -> f6, f13
   if N % f4  == 0 => (29)     -> f5, f13
   if N % f5  == 0 => (7,11)   -> f0, f4, f10, f12, f13 
   if N % f6  == 0 => (5,19)   -> f1, f3, f7, f13
   if N % f7  == 0 => (7,11)   -> f0, f4, f10, f12, f13
   if N % f8  == 0 => ()       -> f9, f10, f11, f12, f13
   if N % f9  == 0 => (11)     -> 
   if N % f10 == 0 => (13)     -> 
   if N % f11 == 0 => (3,5)    -> 
   if N % f12 == 0 => ()       -> 
   if N % f13 == 0 => (5,11)   -> 
   
 */

// 104743
// limit as in 2^limit
function E308( limit ) {

    const numers = [ 17, 78, 19, 23, 29, 77, 95, 77,  1, 11, 13, 15, 1, 55 ] ;
    const denoms = [ 91, 85, 51, 38, 33, 29, 23, 19, 17, 13, 11,  2, 7,  1 ] ;

    const numer_factors = [   [17], [2,3,13],   [19],   [23],   [29], [7,11], [5,19], [7,11],   [], [11], [13], [3,5],  [], [5,11] ] ;
    const denom_factors = [ [7,13],   [5,17], [3,17], [2,19], [3,11],   [29],   [23],   [19], [17], [13], [11],   [2], [7],     [] ] ;

    let state = 2, iteration = 0, state_map = { 2:1, 3:0, 5:0, 7:0, 11:0, 13:0, 17:0, 19:0, 23:0, 29:0 } ;

    while ( state != limit ) {
        
        let index = 0 ;
        while ( state % denoms[index]  != 0 ) {
            index++ ;
        }

        for ( const factor of denom_factors[index] ) {
            state_map[factor]--;
        }
        for ( const factor of numer_factors[index] ) {
            state_map[factor]++;
        }

        state *= numers[index] / denoms[index] ;
        state = Math.round( state, 0 ) ;
        iteration++ ;

        console.log( `iteration = ${iteration}, state = ${state}, fraction = ${index} | ${numers[index]}/${denoms[index]} | ${numer_factors[index]}/${denom_factors[index]} `, state_map ) ;

    }

    return iteration ;

}