/**
 * Created by sergii.danilov on 27/05/2014.
 */
var config = {};

config.web = {
    port: process.env.WEB_PORT || 8805,
    sessionKey: '6ketaq3cgo315rk9',
    paging: {
        defaultPageSize: 25,
        numberVisiblePages: 10
    }
};

module.exports = config;