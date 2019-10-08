/**
 * Sieve based on bit using Uint32Array from start..end ( excluding )
 *
 * @author riyaz.mansoor@gmail.com
 * @modified 20190821
 */
class BitSieve {

    constructor( start, end ) {

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

        const block = this.Block ;
        const shift = this.Shift ;
        const sieve = this.Sieve ;

        let count = 0 ;
        for ( let i = start ; i < end ; i += step ) {
            const sieve_ind = Math.floor( i / block ) - shift ;
            const sieve_ind_bit_mask = 1 << ( i % block ) ;
            if ( ( sieve[sieve_ind] & sieve_ind_bit_mask ) === 0 ) {
                sieve[sieve_ind] |= sieve_ind_bit_mask ;
                count++ ;
            } 
        }

        this.Count += count ;

        return this ;

    }

    IsSet( position ) {
        
        const block = this.Block ;
        const sieve = this.Sieve ;

        const sieve_ind = Math.floor( position / block ) - this.Shift ;
        const sieve_ind_bit_mask = 1 << ( position % block ) ;

        return ( sieve[sieve_ind] & sieve_ind_bit_mask ) > 0 ;

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

    Clear() {

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
        for ( let i_bit = sieve_rem ; i_bit < this.Block ; i_bit++ ) {
            count += ( sieve[sieve_ind] & ( 1 << i_bit ) ) === 0 ? 0 : 1 ;
        }

        // all uint starting sieve_rem+1 ( remaining blocks )
        for ( let i_ind = sieve_ind+1 ; i_ind < sieve.length ; i_ind++ ) {
            count += BitSieve.BitCount32( sieve[i_ind] ) ;
        }
        
        return this.Count - count ;

    }

    Print() {
        let cum = 0 ;
        for ( const uint of this.Sieve ) {
            const this_count = BitSieve.BitCount32(uint) ;
            cum += this_count ;
            console.log( `${uint.toString(2).padStart(32,'0')}, ${this_count}, ${cum} ` ) ;
        }
    }

    // from internet
    static BitCount32( n ) {
        n = n - ((n >> 1) & 0x55555555)
        n = (n & 0x33333333) + ((n >> 2) & 0x33333333)
        return ((n + (n >> 4) & 0xF0F0F0F) * 0x1010101) >> 24
    }

}