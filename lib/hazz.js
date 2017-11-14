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
                , size = k * ( ilen << 10 ) // k * 256 * 4
                , table = new Buffer( size )
                ;
            for ( ; i < size; ++i )
                table[ i ] = rand( 0, 0xff );

            return table;
        }
        , offsets = function ( tlen, k ) {
            var i = 0
                , mt = new Array( k )
                ;
            for ( i = 0; i <= k ; ++i )
                mt[ i ] = i * ( tlen / ( i + 1 ) );
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
            me.hfn = k - 1;
            // fill a support table with precalculated offsets
            me.gaps = offsets( me.table.length, k )
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
            , k = min( me.hfn, n )
            // , gap = k * ( table.length / ( k + 1 ) )
            , gaps = me.gaps
            , dlen = min( me.ilength, data.length )
            , pos = -1
            , sum = 0
            , i = 0
            ;
        for ( ; i < dlen; ++i ) {
            // pos = gap + ( i << 10 ) + ( input[ i ] << 2 );
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
            , table = me.table
            , tlen = table.length
            , hfn = me.hfn
            , dlen = min( me.ilength, data.length )
            , k = 0
            //, gap = 0
            , gaps = me.gaps
            , pos = -1
            , results = new Array( hfn + 1 )
            ;
        for ( ; k <= hfn; ++k ) {
            // gap = k * ( tlen / ( k + 1 ) );
            for ( i = 0, sum = 0; i < dlen; ++i ) {
                // pos = gap + ( i << 10 ) + ( input[ i ] << 2 );
                pos = gaps[ k ] + ( i << 10 ) + ( input[ i ] << 2 );
                // faster than sum += table.readUInt32BE( pos );
                sum += ( table[ pos ] << 24 >>> 0 )
                    + ( table[ pos + 1 ] << 16 )
                    + ( table[ pos + 2 ] << 8 )
                    + table[ pos + 3 ]
                    ;
            }
            results[ k ] = ( range >>> 1 ) ? sum % range : sum;
        }
        return results;
    }

    return Hazz;

} )();

exports.Hazz.version = require( '../package' ).version;
