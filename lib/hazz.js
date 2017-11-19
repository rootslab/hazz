/*
 * Hazz, a pseudo-random-data-filled-table to generate
 * k indipendent, very fast hash functions.
 *
 * Copyright(c) 2017 Guglielmo Ferri <44gatti@gmail.com>
 * MIT Licensed
 */

exports.Hazz = ( function () {
    var log = console.log
        , floor = Math.floor
        , abs = Math.abs
        , max = Math.max
        , min = Math.min
        , pick = Math.random
        // returns a random integer between min and max
        , rand = function ( min, max ) {
            min = + min || 0;
            max = + max || 0;
            // round() produces a non-uniform distribution
            return min + floor( pick() * ( max - min + 1 ) );
        }
        , build = function ( ilen, k ) {
            var i = 0
                // size : k * ilen * 256 * 4
                , size = k * ( ilen << 10 )
                , table = new Buffer( size )
                ;
            for ( ; i < size; ++i )
                table[ i ] = rand( 0, 0xff );

            return table;
        }
        , offsets = function ( ilen, k ) {
            var i = 0
                , mt = new Array( k )
                , tlen = ( ilen << 10 )
                ;
            for ( i = 0; i < k ; ++i )
                mt[ i ] = i * tlen;
            return mt;
        }
        , Hazz = function ( input_length, n ) {
            var me = this
                , is = me instanceof Hazz
                , ilen = input_length > 0 ? input_length : 16
                , k = n ? max( n, 2 ) : 2
                ;
            if ( ! is ) return new Hazz( ilen, k );
            
            me.ilength = ilen;
            // init random table
            me.table = build( ilen, k );
            // fill a support table with precalculated offsets
            me.gaps = offsets( ilen, k )
            me.hfn = k;
        }
        , hproto = Hazz.prototype
        ;
    
    hproto.refill = function () {
        var me = this
            , table = me.table
            , tsize = table.length
            , ilen = me.ilength
            , i = 0
            ;
        for ( ; i < tsize; ++i )
            table[ i ] = rand( 0, 0xff );
            
        return me;
    };

    hproto.do = function ( n, data, range ) {
        var me = this
            , input = data || new Buffer( 0 )
            , table = me.table
            , gaps = me.gaps
            , k = min( me.hfn - 1, n )
            , ilen = min( me.ilength, input.length )
            , pos = -1
            , sum = 0
            , i = 0
            ;
        for ( ; i < ilen; ++i ) {
            // select read position, sum offsets for bucket, row and cell
            pos = gaps[ k ] + ( i << 10 ) + ( input[ i ] << 2 );
            // faster than sum += table.readUInt32BE( pos );
            sum += ( table[ pos ] << 24 >>> 0 )
                + ( table[ pos + 1 ] << 16 )
                + ( table[ pos + 2 ] << 8 )
                + table[ pos + 3 ]
                ;
        }
        return ( range >>> 1 ) ? sum % range : sum;
    }

    hproto.all = function ( data, range ) {
        var me = this
            , input = data || new Buffer( 0 )
            , ilen = min( me.ilength, input.length )
            , table = me.table
            , gaps = me.gaps
            , hfn = me.hfn
            , sums = new Array( hfn )
            , pos = -1
            , off = 0
            , i = 0
            , k = 0
            ;
        // initialize the vector of sums 
        for ( ; k < hfn; ++k ) sums[ k ] = 0;
        // calculate sums in parallel is faster
        for ( ; i < ilen; ++i ) {
            off = ( i << 10 ) + ( input[ i ] << 2 );
            for ( k = 0; k < hfn ; ++k ) {
                pos = gaps[ k ] + off;
                sums[ k ] += ( table[ pos ] << 24 >>> 0 )
                    + ( table[ pos + 1 ] << 16 )
                    + ( table[ pos + 2 ] << 8 )
                    + table[ pos + 3 ]
                    ;
            }
        }
        // apply modulus only to the final results
        if ( range >>> 1 )
            for ( k = 0; k < hfn; ++k ) sums[ k ] %= range;
        return sums;
    };

    return Hazz;

} )();

exports.Hazz.version = require( '../package' ).version;
