/*

n^15 + 1 === ( n^5 + 1 ) ( n^10 - n^5 + 1 )
         === ( n + 1 ) ( n^4 - n^3 + n^2 - n + 1 ) ( n^5 ( n^5 - 1 ) + 1 )
         === ( n + 1 ) ( n^3 ( n - 1 ) + n ( n - 1 ) + 1 ) ( n^5 ( n^5 - 1 ) + 1 )


*/

function E421( max_n, max_prime ) {

    const lfs = new LeastFactors( max_prime ) ;
    const pn1 = new PowerNumber() ; // equal to 1
    
    for ( n = 3 ; n < max_n ; n++ ) {
        
        const np1 = new PowerNumber( lfs.Factors( n ) ) ;
        const nless1 = new PowerNumber( lfs.Factors( n - 1 ) ) ;

        const f1 = lfs.Factors( n + 1 ) ;
        const f2 = nless1.Multiply( np1 ).Add( pn1 ).Add( nless1.Multiply( np1.Power( 3 ) ) ) ;
        const f3 = np1.Power( 5 ).Add( pn1 ).Add( np1.Power( 5 ) ) ;

        console.log( f1, f2.Map, f3.Map ) ;
    }

}