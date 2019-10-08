
function NextTriples( triple ) {

    const { a, b, c } = triple ;
    const a2 = 2 * a, b2 = 2 * b, c2 = 2 * c, c3 = 3 * c ;

    return [
        { a: ( a - b2 + c2 ),  b: ( a2 - b + c2 ),  c: ( a2 - b2 + c3 )  }, 
        { a: ( a + b2 + c2 ),  b: ( a2 + b + c2 ),  c: ( a2 + b2 + c3 )  }, 
        { a: ( -a + b2 + c2 ), b: ( -a2 + b + c2 ), c: ( -a2 + b2 + c3 ) }, 
    ] ;

}


function Recurse( triple, MAX_PERIMETER ) {

    const { a, b, c } = triple ;

    const perimeter = a + b + c ;
    if ( perimeter > MAX_PERIMETER ) return 0 ;

    const holeSize = c / ( a - b ) ;
    if ( holeSize !== Math.floor( holeSize ) ) return 0 ;

    let count = Math.floor( MAX_PERIMETER / perimeter ) ;

    console.log( triple, count ) ;

    for ( const nextTriple of NextTriples( triple ) ) {
        count += Recurse( nextTriple, MAX_PERIMETER ) ;
    }

    return count ;

}



// only triples where |a-b| === 1
// divide max_perimeter by triple_perimeter to get all triangles for that triple
function E139( max_perimeter ) {

    const triple = { a:3, b:4, c:5 } ;

    return Recurse( triple, max_perimeter ) ;

}