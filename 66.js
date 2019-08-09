
// x^2 - N*y^2 = k
function start_triple( N ) {
    const x = Math.ceil( Math.sqrt( N ) ) ;
    const k = x*x - N ;
    return { x:x, y:1, k:k }
}

