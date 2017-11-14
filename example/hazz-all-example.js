var log = console.log
    , Hazz = require( '../' )
    , maxlen = 6
    , range = 100
    , h = Hazz( maxlen, 3 )
    , sdata = [ 'HAZZ!', 'HAZZ!?' ]
    , bdata = new Buffer( sdata[ 0 ] )
    , hr = null
    , h0 = null
    , h1 = null
    , h2 = null
    ;


h0 = h.do( 0, bdata, range )
h1 = h.do( 1, bdata, range )
h2 = h.do( 2, bdata, range )

hr = h.all( bdata, range )

log( '\n - [h0, h1, h2]: [%d, %d, %d], max length: %d, k(Buffer): "%s" (%d bytes)'
     , hr[ 0 ], hr[ 1 ], hr[ 2 ], maxlen, bdata, bdata.length
);

log( ' - (h0, h1, h2): (%d, %d, %d), max length: %d, k(Buffer): "%s" (%d bytes)'
     , h0, h1, h2, maxlen, bdata, bdata.length
);

bdata = new Buffer( sdata[ 1 ] )

h0 = h.do( 0, bdata, range )
h1 = h.do( 1, bdata, range )
h2 = h.do( 2, bdata, range )

hr = h.all( bdata, range )

log( '\n - [h0, h1, h2]: [%s], max length: %d, k(Buffer): "%s" (%d bytes)'
     , hr, maxlen, bdata, bdata.length
);

log( ' - (h0, h1, h2): (%d, %d, %d), max length: %d, k(Buffer): "%s" (%d bytes)'
     , h0, h1, h2, maxlen, bdata, bdata.length
);
log()