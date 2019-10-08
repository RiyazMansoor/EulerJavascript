
class PrimeFactors {

    constructor( upto_n ) {

        /*
            Goal :  to create a map of least factors, as well as the list of primes upto 
                    the supplied n.

            How :   by creating a bit sieve using Uint32Array for space conservation
                    with a target limit of 1e8 
                    ( using booleans crashes for the developers system for 1e8 )

                    the sieve is created for odd numbers only to maximise space usage

                    all primes in 'hard_primes' are hard coded to increase space usage
                    with slightly increased processing overhead

         */

        const hard_primes = [ 3,5,7,11,13,17,19,23,29,31,37,41,43,47 ] ;
        const primes_set = new Set( [ 2 ].concat( hard_primes ) ) ;
        const largest_hard_prime = hard_primes[hard_primes.length-1] ;
        const factors_map = new Map() ;

        const block = 64 ;
        const array_length = Math.ceil( upto_n / block ) ;
        const sieve = new Uint32Array( array_length ) ;

        for ( const prime of hard_primes ) {
            const i1 = Math.floor( prime / block ) ;
            const i1_rem_mask = 1 << ( Math.floor( ( prime % block ) / 2 ) ) ;
            if ( ( sieve[i1] & i1_rem_mask ) === 0 ) {
                for ( let n2 = prime * prime ; n2 < upto_n ; n2 += 2 * prime ) {
                    const i2 = Math.floor( n2 / block ) ;
                    const i2_rem_mask = 1 << ( Math.floor( ( n2 % block ) / 2 ) ) ;
                    if ( ( sieve[i2] & i2_rem_mask ) === 0 ) {
                        sieve[i2] |= i2_rem_mask ;
                    }
                }
            }
        }

        for ( let n1 = largest_hard_prime + 2 ; n1 < upto_n ; n1 += 2 ) {
            const i1 = Math.floor( n1 / block ) ;
            const i1_rem_mask = 1 << ( Math.floor( ( n1 % block ) / 2 ) ) ;
            if ( ( sieve[i1] & i1_rem_mask ) === 0 ) {
                primes_set.add( n1 ) ;
                for ( let n2 = n1 * n1 ; n2 <= upto_n ; n2 += 2 * n1 ) {
                    const i2 = Math.floor( n2 / block ) ;
                    const i2_rem_mask = 1 << ( Math.floor( ( n2 % block ) / 2 ) ) ;
                    if ( ( sieve[i2] & i2_rem_mask ) === 0 ) {
                        sieve[i2] |= i2_rem_mask ;
                        factors_map.set( n2,  n1 ) ;
                    }
                }
            }
         }


        this.Max = upto_n ;
        this.PrimesHardCoded = [ 2].concat( hard_primes ) ;
        this.PrimesSet = primes_set ;
        this.FactorsMap = factors_map ;

    }

    PrimesSet() {
        return this.PrimesSet ;
    }

    IsPrime( n ) {
        return this.PrimesSet.has( n ) ;
    }


    Factors( n ) {

        const map = new Map() ;

        if ( n < 2 ) {
            throw `n must be >= 2 int - but n == ${n}` ;
        }

        if ( this.IsPrime( n ) ) {
            map.set( n, 1 ) ;
            return map ;
        } 

        for ( const factor of this.PrimesHardCoded ) {
            let count = 0 ;
            while ( n % factor === 0 && n > 1 ) {
                count++ ;
                n /= factor ;
            }
            if ( count > 0 ) {
                map.set( factor, count ) ;
            }
            if ( n === 1 ) {
                return map ;
            }
        }

        if ( n >= this.Max ) {
            throw `Cannot factorise '${n}' which is greater than Max = ${this.Max}` ;
        }

        const f_map = this.FactorsMap ;
        for ( let factor = f_map.get( n ) ; factor !== undefined ; factor = f_map.get( n ) ) {
            let count = 0 ;
            while ( f_map.get( n ) === factor && n > 1 ) {
                count++
                n /= factor ;
            }
            if ( count > 0 ) {
                map.set( factor, count ) ;
            }
            if ( n === 1 ) {
                return map ;
            }
        }
        let power = map.get( n ) ;
        power = ( power ) ? power + 1 : 1 ;
        map.set( n, power ) ; 

        return map ;       

    }

    MultiplyN( map, n ) {

        if ( this.IsPrime( n ) ) {
            map.set( n, 1 + ( map.get( n ) || 0 ) ) ;
            return map ;
        } 

        for ( const factor of this.PrimesHardCoded ) {
            let count = 0 ;
            while ( n % factor === 0 && n > 1 ) {
                count++ ;
                n /= factor ;
            }
            if ( count > 0 ) {
                map.set( factor, count + ( map.get( factor ) || 0 ) ) ;
            }
            if ( n === 1 ) {
                return map ;
            }
        }

        if ( n >= this.Max ) {
            throw `Cannot factorise '${n}' which is greater than Max = ${this.Max}` ;
        }

        const f_map = this.FactorsMap ;
        for ( let factor = f_map.get( n ) ; factor !== undefined ; factor = f_map.get( n ) ) {
            let count = 0 ;
            while ( f_map.get( n ) === factor && n > 1 ) {
                count++
                n /= factor ;
            }
            if ( count > 0 ) {
                map.set( factor, count + ( map.get( factor ) || 0 ) ) ;
            }
            if ( n === 1 ) {
                return map ;
            }
        }
        map.set( n, 1 + ( map.get( n ) || 0 ) ) ; 

        return map ;       

    }

    Multiply( ...nums ) {

        const map = new Map() ;

        loop_nums :
        for ( let n of nums ) {

            if ( this.IsPrime( n ) ) {
                map.set( n, 1 + ( map.get( n ) || 0 ) ) ;
                continue ;
            } 

            for ( const factor of this.PrimesHardCoded ) {
                let count = 0 ;
                while ( n % factor === 0 && n > 1 ) {
                    count++ ;
                    n /= factor ;
                }
                if ( count > 0 ) {
                    map.set( factor, count + ( map.get( factor ) || 0 ) ) ;
                    if ( n === 1 ) {
                        continue loop_nums ;
                    }
                }
            }

            if ( n >= this.Max ) {
                throw `Cannot factorise '${n}' which is greater than Max = ${this.Max}` ;
            }

            const f_map = this.FactorsMap ;
            for ( let factor = f_map.get( n ) ; factor !== undefined ; factor = f_map.get( n ) ) {
                let count = 0 ;
                while ( f_map.get( n ) === factor && n > 1 ) {
                    count++
                    n /= factor ;
                }
                if ( count > 0 ) {
                    map.set( factor, count + ( map.get( factor ) || 0 ) ) ;
                    if ( n === 1 ) {
                        continue loop_nums ;
                    }
                }
            }
            map.set( n, 1 + ( map.get( n ) || 0 ) ) ; 
        
        }

        return map ;       

    }

}