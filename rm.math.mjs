
function GCD( n1, n2 ) {

    let tmp = 0 ;
    while ( n1 ) {
        tmp = n1 ;
        n1 = n2 % n1 ;
        n2 = tmp ;
    }

    return n2 ;

}

function BigGCD( n1, n2 ) {

    let tmp = 0n ;
    while ( n1 ) {
        tmp = n1 ;
        n1 = n2 % n1 ;
        n2 = tmp ;
    }

    return n2 ;

}

function ArrayGCD( list ) {

	let cur_list = Array.from( list ) ;
	while ( cur_list.length > 1 ) {
		const new_list = [], cur_list_length = cur_list.length ;
		for ( let i = 0 ; i < cur_list_length ; i += 2 ) {
			const gcd = GCD( cur_list[i], cur_list[i+1] ) ;
			if ( gcd === 1 ) return 1 ;
			new_list.push( gcd ) ;
		}
		if ( cur_list_length % 2 === 1 ) {
			new_list.push( cur_list[ cur_list_length - 1 ] ) ;
		}
		cur_list = new_list
	}
	return cur_list[0] ;
}

function LCM( n1, n2 ) {

	// assuming n2 > n1 following order has minimum chance of int overflow
	return n2 / GCD( n1, n2 ) * n1 ;

}

function BigLCM( n1, n2 ) {

	return n2 / BigGCD( n1, n2 ) * n1 ;

}

function IsCoPrime( n1, n2 ) {

	// fast exit for even numbers
	if ( ( n1 | n2 ) & 1 === 0 ) {
		return false ;
	}

	return GCD( n1, n2 ) === 1 ;

}

function LeastFactor( num ) {

    if ( !Number.isInteger( num ) ) {
        throw `LeastFactor Error :: num=${num} is invalid` ; 
    }

    if ( num === 1 ) {
    	return 1 ;
    }

    for ( const factor of [ 2, 3, 5 ] ) {
        if ( num % factor === 0 ) {
            return factor ;
        }
    }

    const sqrt_num = Math.floor( Math.sqrt( num ) ) ;
    const steps = [ 0, 4, 6, 10, 12, 16, 22, 24 ] ;

    for ( let jump = 7 ; jump <= sqrt_num ; jump += 30 ) {
        for ( const step of steps ) {
            const factor = jump + step ;
            if ( num % factor === 0 ) {
                return factor ;
            }
        }
    }

    return num ;

}


function IsPrime( num ) {

    return ( num === LeastFactor( num ) ) ;

}

function NextPrime( num ) {

	num += ( num % 2 === 0 ) ? 1 : 0 ;
	while ( !IsPrime( num ) ) {
		num += 2 ;
	}
	return num ;

}


function Factorise( num ) {

    if ( !Number.isInteger( num ) ) {
        throw `Factorise Error :: num=${num} is invalid` ; 
    }

	const factors = new Map( [ ] ) ;

    if ( num === 1 ) {
    	return factors ;
    }

    for ( const factor of [ 2, 3, 5 ] ) {
        if ( num % factor === 0 ) {
            let power = 0 ;
            while ( num % factor === 0 ) {
            	power++ ;
            	num /= factor ;
            }
            factors.set( factor, power ) ;
            if ( num === 1 ) {
            	return factors ;
            }
        }
    }

    const sqrt_num = Math.floor( Math.sqrt( num ) ) ;
    const steps = [ 0, 4, 6, 10, 12, 16, 22, 24 ] ;

    for ( let jump = 7 ; jump <= sqrt_num ; jump += 30 ) {
        for ( const step of steps ) {
            const factor = jump + step ;
            if ( num % factor === 0 ) {
				let power = 0 ;
				while ( num % factor === 0 ) { //  && num > 1 ) {
					power++ ;
					num /= factor ;
				}
				factors.set( factor, power ) ;
				if ( num === 1 ) {
					return factors ;
				}
            }
        }
    }

	if ( num > 1 ) {
		factors.set( num, 1 ) ;
	}

    return factors ;

}

function SameFactors( factors, limit ) {
    
    const gcd = factors.reduce( ( prod, val ) => prod * val, 1 ) ;

    if ( gcd > limit ) {
    	return new Set() ;
    }
    
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

function BinarySearch( array, target ) {

    if ( target > array[array.length-1] ) {
        return array.length ;
    }

    let start = 0, end = array.length - 1;
    let index = Math.floor( ( end - start ) / 2 ) + start ;
    
    while ( start < end ) {

        var value = array[index];

        if ( value === target ) {
            break;
        }
        
        if ( target < value ) {
            end = index;
        }
        else {
            start = index + 1;
        }

        index = Math.floor( ( end - start ) / 2 ) + start ;

    }
    
    return index;

}





/**
 * Sieve based on bit using Uint32Array from start..end ( excluding )
 *
 * @author riyaz.mansoor@gmail.com
 * @modified 20190821
 */
class BitSieve {

    constructor( start, end ) {

        if ( !start || !end ) {
            throw `Sieve Error :: start=${start} or end=${end} of sieve is undefined` ;
        }

        const block = 32 ;
        const shift = Math.floor( start / block ) ;
        const sieve = new Uint32Array( Math.ceil( end / block ) - shift ) ;

        this.Block = block ;
        this.Shift = shift ;
        this.Start = start ;
        this.End   = end ;
        this.Sieve = sieve ;
        this.Count = 0 ;

    }

    SetByArithmeticSeries( start, step, end ) {
        
        if ( !end ) {
            end = this.End ;
        }

        if ( start < this.Start || end > this.End ) {
            throw `Bounds Error :: start actual=${this.Start} is=${start}, end actual=${this.End} is=${end} ` ;
        }

        const sieve = this.Sieve ;

        for ( let index = start ; index < end ; index += step ) {
            const [ sieve_ind, sieve_ind_bit_mask ] = getPosition( index ) ;
            if ( ( sieve[sieve_ind] & sieve_ind_bit_mask ) === 0 ) {
                sieve[sieve_ind] |= sieve_ind_bit_mask ;
                this.Count++ ;
            } 
        }

        return this ;

    }

    SetByIterable( iterable ) {

        for ( const multiple of iterable ) {
            let start = Math.floor( this.Start / multiple ) * multiple ;
            if ( this.Start % multiple !== 0 ) {
                start += multiple ;
            }
            this.SetByArithmeticSeries( start, multiple ) ;
        }

        return this ;

    }

    IsSet( index ) {
        
        const [ sieve_ind, sieve_ind_bit_mask ] = getPosition( index ) ;

        return ( sieve[sieve_ind] & sieve_ind_bit_mask ) > 0 ;

    }

    Set( index ) {
        
        const [ sieve_ind, sieve_ind_bit_mask ] = getPosition( index ) ;

        if ( ( sieve[sieve_ind] & sieve_ind_bit_mask ) === 0 ) {
            sieve[sieve_ind] |= sieve_ind_bit_mask ;
            this.Count++ ;
        }

    }

    Clear( index ) {
        
        const [ sieve_ind, sieve_ind_bit_mask ] = getPosition( index ) ;

        if ( ( sieve[sieve_ind] & sieve_ind_bit_mask ) > 0 ) {
            sieve[sieve_ind] &= ~sieve_ind_bit_mask ;
            this.Count-- ;
        }

    }

    ClearAll() {

        this.Count = 0 ;
        this.Sieve.fill( 0 ) ;
        
        return this ;

    }

//     Count( bit ) {
//         const ones = this.Count - ( IsSet( 0 ) ? 1 : 0 ) ;
//         return bit ? ones : this.Max - ones - 1 ;
//     }

    // not including n
    CountTo( n ) {

        if ( !n || n <= this.Start || n > this.End ) {
            throw `Bounds Error :: to n=${n} NOT between start=${this.Start} and end=${this.End}  ` ;
        }

        const block = this.Block ;
        const sieve = this.Sieve ;
        const sieve_ind = Math.floor( n / block ) - this.Shift ;
        const sieve_rem = n % block ;

        let count = 0 ;

        // count those bits after sieve_rem for this uint only
        for ( let i_bit = sieve_rem ; i_bit < block ; i_bit++ ) {
            count += ( sieve[sieve_ind] & ( 1 << i_bit ) ) === 0 ? 0 : 1 ;
        }

        // all uint starting sieve_rem+1 ( remaining blocks )
        for ( let i_ind = sieve_ind+1 ; i_ind < sieve.length ; i_ind++ ) {
            count += BitSieve.BitCount32( sieve[i_ind] ) ;
        }
        
        return this.Count - count ;

    }

    Print( from ) {

        if ( !from ) {
            from = 0 ;
        }
        
        const upto = from + 10 ;
        
        for ( let index = from ; index < upto ; index++ ) {
            const uint = this.Sieve[index] ;
            const this_count = BitSieve.BitCount32( uint ) ;
            console.log( `${uint.toString(2).padStart(32,'0')}, bit_count=${this_count} ` ) ;
        }

    }

    getPosition( index ) {
        const sieve_ind = Math.floor( index / this.Block ) - this.Shift ;
        const sieve_ind_bit_mask = 1 << ( index % this.Block ) ;
        return [ sieve_ind, sieve_ind_bit_mask ] ;
    }

    // from internet
    static BitCount32( n ) {
        n = n - ((n >> 1) & 0x55555555)
        n = (n & 0x33333333) + ((n >> 2) & 0x33333333)
        return ((n + (n >> 4) & 0xF0F0F0F) * 0x1010101) >> 24
    }

}


class PowerNumber {

    constructor( pnum ) {
    	if ( !pnum ) {
    		this.Map = new Map() ;
    	}
    	else if ( Number.isInteger( pnum ) ) {
    		this.Map = Factorise( pnum ) ;
    	}
    	else if ( pnum.constructor === Map ) {
    		this.Map = new Map( pnum ) ;
    	}
    	else if ( pnum.constructor === PowerNumber ) {
    		this.Map = new Map( pnum.Map ) ;
    	}
    	else {
    		throw `unexpected type of pnum=${pnum} - not null, not an integer, not a map, not a PowerNumber ` ;
    	}
    }

    GCD( pnum ) {
        const new_pnum = new PowerNumber() ;
        for ( const [ factor, power ] of pnum.Map.entries() ) {
            const this_power = this.Map.get( factor ) ;
            if ( this_power ) {
                new_pnum.Map.set( factor, Math.min( this_power, power ) ) ;
            }
        }
        return new_pnum ;
    }

    Power( power ) {
        const new_pnum = new PowerNumber( this ) ;
        for ( const [ prime_factor, prime_factor_power ] of this.Map.entries() ) {
            new_pnum.Map.set( prime_factor, prime_factor_power + power ) ;
        }
        return new_pnum ;    	
    }

    Multiply( pnum ) {
        const new_pnum = new PowerNumber( this ) ;
        for ( const [ factor, power ] of pnum.Map.entries() ) {
            const this_power = ( this.Map.get( factor ) || 0 ) ;
            new_pnum.Map.set( factor, this_power + power ) ;
        }
        return new_pnum ;
    }

    Divide( pnum ) {
        const new_pnum = new PowerNumber( this ) ;
        for ( const [ factor, power ] of pnum.Map.entries() ) {
            const this_power = this.Map.get( factor ) ;
            if ( !this_power || this_power < power ) {
                throw `PowerNumber Divide :: not divisible by ${pnum}` ;
            }
            new_pnum.Map.set( factor, this_power - power ) ;
        }
        return new_pnum ;
    }

    Add( pnum ) {
    	const gcd = this.GCD( pnum ) ;
    	const rem_value = this.Divide( gcd ).Value() + pnum.Divide( gcd ).Value() ;
		if ( !Number.isSafeInteger( rem_value ) ) {
			throw `PowerFraction Add method :: an unsafe inter ${rem_value} left to factorise` ;
		}
		return gcd.Multiply( new PowerNumber( rem_value ) ) ;
    }

    Subtract( pnum ) {
    	const gcd = this.GCD( pnum ) ;
    	const rem_value = this.Divide( gcd ).Value() ; 
		if ( !Number.isSafeInteger( rem_value ) ) {
			throw `PowerFraction Subtract method :: an unsafe inter ${rem_value} left to factorise` ;
		}
		return gcd.Multiply( new PowerNumber( rem_value - pnum.Divide( gcd).Value() ) ) ;
    }

    Value() {
        let value = 1 ;
        for ( const [ factor, power ] of this.Map.entries() ) {
            value *= factor ** power ;
        }
        return value ;
    }

    BigValue() {
        let value = 1n ;
        for ( const [ factor, power ] of this.Map.entries() ) {
            value *= BigInt( factor ) ** BigInt( power ) ;
        }
        return value ;
    }

    toString() {
    	return this.Map.toString() ;
    }

}

class PowerFraction {

    constructor( numer_pnum, denom_pnum ) {
        if ( !numer_pnum || !denom_pnum ) {
            throw " numerator or denominator missing " ;
        }
        this.Numer = new PowerNumber( numer_pnum ) ;
        this.Denom = new PowerNumber( denom_pnum ) ;
    }

    Reduce() {
        const gcd = this.Numer.GCD( this.Denom ) ;
        return new PowerFraction( this.Numer.Divide( gcd ), this.Denom.Divide( gcd ) ) ;
    }

    Add( frac ) {
		const numer = this.Numer.Multiply( frac.Denom ).Add( this.Denom.Multiply( frac.Numer) ) ;
		return new PowerFraction( numer, this.Denom.Multiply( frac.Denom ) ) ;
    }

    Subtract( frac ) {
		const numer = this.Numer.Multiply( frac.Denom ).Subtract( this.Denom.Multiply( frac.Numer) ) ;
		return new PowerFraction( numer, this.Denom.Multiply( frac.Denom ) ) ;
    }

    Multiply( frac ) {
        return new Fraction( this.Numer.Multiply( frac.Numer ), this.Denom.Multiply( frac.Denom ) ) ;
    }

    Divide( frac ) {
        return new Fraction( this.Numer.Multiply( frac.Denom ), this.Denom.Multiply( frac.Numer ) ) ;
    }

    Reciprocal() {
    	return new PowerFraction( this.Denom, this.Number ) ;
    }

    toString() {
    	return `${this.Numer.toString()} / ${this.Denom.toString()} ` ;
    }

}



class LeastFactors {

	constructor( limit ) {

		if ( !Number.isInteger( limit) ) {
			throw `LeastFactors Constructor :: limit=${limit} is invalid` ; 
		}

		console.log( `LeastFactors initializing for limit = ${limit} ..... ` ) ;

		this.Limit = limit ;
		this.HardPrimes = [ 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97 ] ;
		this.AllPrimes = [].concat( this.HardPrimes ) ;
		this.FactorMap = new Map() ;

        for ( let num = 5 ; num < limit ; num += 2 ) {

        	if ( this.HasFactorsIn100( num ) ) continue ;
			if ( this.FactorMap.has( num ) ) continue ;

        	this.FactorMap.set( num, num ) ;
        	this.AllPrimes.push( num ) ;

        	for ( let n = num * num ; n <= limit ; n += 2 * num ) {

				if ( this.HasFactorsIn100( n ) ) continue ;
				if ( this.FactorMap.has( n ) ) continue ;

				this.FactorMap.set( n, num ) ;

        	}

        }

 		console.log( `LeastFactors initialized :: Prime Count = ${this.AllPrimes.length } Factor Map Size = ${this.FactorMap.size} ` ) ;

	}

	LeastFactor( num ) {
		
		let lf = HasFactorsIn100( num ) ;
		if ( lf ) {
			return lf ;
		}

		return this.FactorMap.get( num ) ;

	}

	Factors( num ) {

        if ( !Number.isInteger( num ) || num < 2 ) {
            throw `LeastFactors.Factors( num ) :: num must be >= 2 int : but num == ${num}` ;
        }

        if ( this.IsPrime( num ) ) {
            return new Map( [ [ num, 1 ] ] ) ;
        } 

        const map = new Map() ;

        for ( const factor of this.HardPrimes ) {
        	if ( num % factor === 0 ) {
				let count = 0 ;
				while ( num % factor === 0 ) {
					count++ ;
					num /= factor ;
				}
				map.set( factor, count ) ;
				if ( num === 1 ) {
					return map ;
				}
        	}
        }

        if ( num >= this.Limit ) {
            throw `Cannot fast factorise '${num}' which is greater than Limit = ${this.Limit}` ;
//             throw { msg:`Cannot fast factorise '${num}' which is greater than Limit = ${this.Limit}`, factors:map, remainder:num } ;
        }

        const fmap = this.FactorMap ;
        for ( let factor = fmap.get( num ) ; factor !== undefined ; factor = fmap.get( num ) ) {
        	if ( num % factor === 0 ) {
				let count = 0 ;
				while ( fmap.get( num ) === factor ) {
					count++
					num /= factor ;
				}
                map.set( factor, count ) ;
				if ( num === 1 ) {
					return map ;
				}
            }
        }

        return map ;       

	}

	IsPrime( num ) {

		if ( num < 100 ) {
			return this.HardPrimes.indexOf( num ) >= 0 ;
		}

		return this.FactorMap.get( num ) === num ;

	}

	Primes() {

		return this.AllPrimes ;
	
	}


	HasFactorsIn100( num ) {
	
		for ( const prime of this.HardPrimes ) {
			if ( num % prime === 0 ) return prime ;
		}
		return undefined ;

	}

}


class PrimeCount {

	constructor( limit ) {

		this.LeastFactors = new LeastFactors( limit ) ;

	}

	Phi() {

	}

	Pi( upto ) {

		if ( upto <= this.LeastFactors.Limit ) {
			return BinarySearch( this.LeastFactors.AllPrimes ) ;
		}

		const a = this.Pi( Math.floor( Math.pow( upto, 1/4 ) ) ) ;
		const b = this.Pi( Math.floor( Math.sqrt( upto ) ) ) ;
		const c = this.Pi( Math.floor( Math.cbrt( upto ) ) ) ;

		let result = this.Phi( upto, a ) + ( b + a - 2 ) * ( b - a + 1 ) / 2 ;

		for ( let i = a ; i < b ; i++ ) {

			const divP = Math.floor( upto / this.LeastFactors.AllPrimes[i] ) ;
			result -= this.Pi( divP ) ;

			if ( i < c ) {
				const b_i = this.Pi( Math.sqrt( divP ) ) ;
				for ( let j = i ; j < b_i ; j++ ) {
					result -= this.Pi( Math.floor( divP / this.LeastFactors.AllPrimes[j] ) ) - j ;
				}
			}

		}

		return result ;

	}

}


/*
function LeastFactors( num ) {

    if ( !Number.isInteger( num ) || num < 2 ) {
        throw `LeastFactor Error :: num=${num} is invalid` ; 
    }

    const array = new Uint32Array( num ).fill( 2 ) ;
    array[0] = 0 ;
    array[1] = 1 ;

    const sqrt_num = Math.floor( Math.sqrt( num ) ) ;

    for ( let i = 3 ; i < num ; i += 2 ) {
        if ( array[i] === 2 ) {
            for ( let j = i ; j < num ; j += 2 * i ) {
            	if ( array[j] === 2 ) {
            		array[j] = i ;
            	}
            }
        }
    }

	return array ;

}
*/

