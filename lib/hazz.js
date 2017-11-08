/*
 * Hazz
 * Copyright(c) 2017 Guglielmo Ferri <44gatti@gmail.com>
 * MIT Licensed
 */

exports.version = require( '../package' ).version;
exports.Hazz = ( function () {
    var Hazz = function () {
            var me = this
                , is = me instanceof Hazz
                ;
            if ( ! is ) return new Hazz();
            
        }
        , hproto = Hazz.prototype
        ;

    hproto.do = function () {
        var me = this
            ;
        return me;
    };

    return Hazz;

} )();