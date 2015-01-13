/**
 * Created by Pencroff on 10.12.2014.
 */
/*global exports: true*/


configManager = require('kea-config');

exports.register = function (server, options, next) {
    if (options && options.confPath) {
        configManager.setup(options.confPath);
    }
    server.expose(configManager);

    if (options && options.decorateServer) {
        server.decorate('server', 'configManager', server.plugins['hapi-kea-config']);
    }

    next();
};

exports.register.attributes = {
    pkg: require('../package.json')
};