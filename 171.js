function e168() {
// n = u(10^d - k)/(10k - 1)
    let sum = 0n;
    for (let d = 1; d < 99; d++ ) {
        for (let u = 1; u < 10; u++) {
            for (let k = 2; k < 10; k++) {
                let num = BigInt(u) * ( 10n**BigInt(d) - BigInt(k) );
                let den = 10n*BigInt(k) - 1n;
                let n = num / den;
                if ( n * den == num ) {
		    const N = 10n*BigInt(n) + BigInt(u);
		    const strN = N.toString();
                    if (parseInt(strN.charAt(0)) <= u) {
                        console.log( `N=${N}, num=${num}, den=${den}, d=${d}, u=${u}, k=${k}, n=${n}` );
                        sum += N;
		    }
                }
            }
        }
    }
    console.log( `final sum=${sum}` );
  
}
