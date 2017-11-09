var log = console.log
    , Hazz = require( '../' )
    , maxlen = 5
    , range = 100
    , h = Hazz( maxlen )
    // String
    , sdata = 'HAZZ!'
    // Buffer
    , bdata = new Buffer( sdata )
    // Array
    , adata = sdata.split( '' )
    , h0 = null
    , h1 = null
    ;

// use String
h0 = h.do( 0, sdata, range )
h1 = h.do( 1, sdata, range )

log( '(h0, h1): (%d, %d), max length: %d, k(String): "%s" ', h0, h1, maxlen, sdata );

// using an Array leads to the same result of using a String
h0 = h.do( 0, adata, range )
h1 = h.do( 1, adata, range )

log( '(h0, h1): (%d, %d), max length: %d, k(Array): "%s" ', h0, h1, maxlen, adata );

// we have a different result using a Buffer
h0 = h.do( 0, bdata, range )
h1 = h.do( 1, bdata, range )

log( '(h0, h1): (%d, %d), max length: %d, k(Buffer): "%s" ', h0, h1, maxlen, bdata );
