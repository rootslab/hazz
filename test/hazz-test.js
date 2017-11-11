/*
 * Hazz test.
 */

exports.test  = function ( done, assertions ) {
    var log = console.log
        , exit = typeof done === 'function' ? done : function () {}
        , assert = assertions || require( 'assert' )
        , Hazz = require( '../' )
        , max_len = 5
        , h = Hazz( max_len )
        , k = Hazz( max_len + 1 )
        , hlength = max_len << 11
        , klength = ( max_len + 1 ) << 11
        , s1 = 'HAZZ?!'
        , s2 = 'HAZZ??'
        , s3 = 'PAZZ??'
        , a1 = s1.split( '' )
        , a2 = s2.split( '' )
        , b1 = new Buffer( s1 )
        , b2 = new Buffer( s2 )
        , b3 = new Buffer( s3 )
        , r1 = -1
        , r2 = -1
        , r3 = -1
        , r4 = -1
        ;

    log( '- max input bytes to parse (%d bytes)', max_len );

    log( '\n- check if size of the pseudo-random tables are correct' );
    log( '  > table h: %d bytes, max input length: %d', hlength, hlength >>> 11 );
    log( '  > table k: %d bytes, max input length: %d', klength, klength >>> 11 );
    assert.ok( h.table.length === hlength, 'table size should be: ' + hlength );
    assert.ok( k.table.length === klength, 'table size should be: ' + klength );
   
    log( '\n- (good) hashng Buffers with table H:' );
    r1 = h.do( 0, b1 );
    r2 = h.do( 0, b2 );
    assert.ok( r1 === r2, 'the result should be the same! now: ' + r1 + ',' + r2 );

    r1 = h.do( 0, b2 );
    r2 = h.do( 0, b3 );
    assert.ok( r1 !== r2, 'the result should not be the same! now: ' + r1 + ',' + r2 );

    r1 = h.do( 0, s2 );
    r2 = h.do( 0, s3 );
    log( '\n- hashing using Strings:' );
    log( '- we expect incorrect results: \n  - %s -> %s\n  - %s -> %s', s2, r1, s3, r2 );
    
    log( '\n- hashng Buffers with table K:' );
    r1 = k.do( 1, b1 );
    r2 = k.do( 1, b2 );
    assert.ok( r1 !== r2, 'the result should not be the same! now: ' + r1 + ',' + r2 );

    r1 = k.do( 1, s2 );
    r2 = k.do( 1, s3 );
    log( '\n- hashing using Strings:' );
    log( '- we expect incorrect results: \n  - %s -> %s\n  - %s -> %s', s2, r1, s3, r2 );
    assert.ok( r1 === r2, 'the result should be the same! now: ' + r1 + ',' + r2 );  

    log( '- check function 1 results after refill, reuslts should be different' );
    r1 = h.do( 1, b1 );
    h.refill();
    r2 = h.do( 1, b1 );
    assert.ok( r1 !== r2, 'the result should be different! ' + r1 + ' === ' + r2 );
    /**/
    exit();
};

// single test execution with node
if ( process.argv[ 1 ] === __filename  ) exports.test = exports.test();