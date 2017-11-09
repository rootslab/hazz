/*
 * Hazz, a pseudo-random data filled table to generate 2 random, indipendent, very fast hash functions.
 *
 * Copyright(c) 2017 Guglielmo Ferri <44gatti@gmail.com>
 * MIT Licensed
 */

exports.Hazz = ( function () {
    var log = console.log
        , floor = Math.floor
        , abs = Math.abs
        , min = Math.min
        , pick = Math.random
        // returns a random integer between min and max
        , rand = function ( min, max ) {
            min = + min || 0;
            max = + max || 0;
            // round() produces a non-uniform distribution
            return min + floor( pick() * ( max - min + 1 ) );
        }
        , build = function ( ilen ) {
            var size = ilen << 11  // 2 * 256 * 4
                , i = 0
                , table = new Buffer( size );
                ;
            for ( ; i < size; ++i )
                table[ i ] = rand( 0, 0xffffffff );

            return table;
        }
        , Hazz = function ( input_length ) {
            var me = this
                , is = me instanceof Hazz
                , ilen = input_length > 0 ? input_length : 1
                ;
            if ( ! is ) return new Hazz( ilen );
            
            me.ilength = ilen;
            // init random table
            me.table = build( ilen )
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
            table[ i ] = rand( 0, 0xffffffff );
            
        return me;
    };


    hproto.do = function ( n, data, range ) {
        var me = this
            , input = data || new Buffer( 0 )
            , table = me.table
            , gap = ( n & 1 ) ? ( table.length >>> 1 ) : 0
            , dlen = min( me.ilength, data.length )
            , pos = -1
            , sum = 0
            , i = 0
            ;
        for ( ; i < dlen; ++i ) {
            pos = gap + ( i << 10 ) + ( input[ i ] << 2 );
            // faster than sum += table.readUInt32BE( pos );
            sum += ( table[ pos ] << 24 >>> 0 )
                + ( table[ pos + 1 ] << 16 )
                + ( table[ pos + 2 ] << 8 )
                + table[ pos + 3 ]
                ;
        }
        // log( n, input, sum, r, sum % r )
        return ( range >>> 1 ) ? sum % range : sum;
    }

    return Hazz;

} )();

exports.Hazz.version = require( '../package' ).version;
