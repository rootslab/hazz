/*
 * Hazz#all test.
 */

exports.test  = function ( done, assertions ) {
    var log = console.log
        , exit = typeof done === 'function' ? done : function () {}
        , assert = assertions || require( 'assert' )
        , Hazz = require( '../' )
        , max_len = 5
        , hfn = 3
        , range = 1 << 16
        , h = Hazz( max_len, hfn )
        , k = Hazz( max_len + 1, hfn + 1 )
        , s1 = 'HAZZ?!'
        , s2 = 'HAZZ??'
        , s3 = 'PAZZ??'
        , b1 = new Buffer( s1 )
        , b2 = new Buffer( s2 )
        , b3 = new Buffer( s3 )
        , h0 = -1
        , h1 = -1
        , h2 = -1
        , hr = [] 
        ;

    log( '\n- input data is: %s, length: %d bytes', b1, b1.length );

    log( '\n- hashing Buffers with table H functions, one at a time' );
    
    h0 = h.do( 0, b1 );
    h1 = h.do( 1, b1 );
    h2 = h.do( 2, b1 );

    log( '\n - table H read : %s, length: %d bytes', b1.slice( 0, max_len ), max_len )

    log( ' - h0: %d', h0 );
    log( ' - h1: %d', h1 );
    log( ' - h2: %d', h2 );

    log( '\n- hashing Buffers with table H functions, all together' );
    hr = h.all( b1 );
    log( ' - hr[0]: %s', hr[ 0 ] );
    log( ' - hr[1]: %s', hr[ 1 ] );
    log( ' - hr[2]: %s', hr[ 2 ] );

    log( '\n- check if results are the same' );

    assert.ok( h0 === hr[ 0 ], 'the result should be the same! now: ' + h0 + ',' + hr[ 0 ] );
    assert.ok( h1 === hr[ 1 ], 'the result should be the same! now: ' + h1 + ',' + hr[ 1 ] );
    assert.ok( h2 === hr[ 2 ], 'the result should be the same! now: ' + h2 + ',' + hr[ 2 ] );


    log( '\n-> hashing Buffers with table K functions, one at a time, within a range' );
    
    k0 = k.do( 0, b1, range );
    k1 = k.do( 1, b1, range );
    k2 = k.do( 2, b1, range );

    log( '\n - table K read : %s, length: %d bytes', b1.slice( 0, max_len + 1 ), max_len + 1 )

    log( ' - k0: %d', h0, range );
    log( ' - k1: %d', h1, range );
    log( ' - k2: %d', h2, range );

    log( '\n- hashing Buffers with table K functions, all together' );
    hr = h.all( b1 );
    log( ' - kr[0]: %s', hr[ 0 ], range );
    log( ' - kr[1]: %s', hr[ 1 ], range );
    log( ' - kr[2]: %s', hr[ 2 ], range );

    log( '\n- check if results are the same' );

    assert.ok( h0 === hr[ 0 ], 'the result should be the same! now: ' + h0 + ',' + hr[ 0 ] );
    assert.ok( h1 === hr[ 1 ], 'the result should be the same! now: ' + h1 + ',' + hr[ 1 ] );
    assert.ok( h2 === hr[ 2 ], 'the result should be the same! now: ' + h2 + ',' + hr[ 2 ] );
    exit();
};

// single test execution with node
if ( process.argv[ 1 ] === __filename ) exports.test = exports.test();