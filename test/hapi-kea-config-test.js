/**
 * Created by Pencroff on 11.12.2014.
 */

var path = require('path'),
    expect = require('chai').expect,
    root = __dirname,
    Hapi = require('hapi'),
    hapiConfig = require('../src/hapi-kea-config'),
    configManager = require('kea-config');

describe('Hapi Config', function () {
    var server;

    beforeEach(function(done){
        server = new Hapi.Server();
        done();
    });

    it('should expose config-manager', function (done) {
        var options = {someFlag: true};
        server.register({
                register: hapiConfig,
                options: options
            }, function (err) {
                if (err) {
                    done(err);
                }
            }
        );
        expect(server.plugins['hapi-kea-config']).to.exist;
        expect(server.plugins['hapi-kea-config']).to.eql(configManager);
        done();
    });
    it('should setup by confPath options', function (done) {
        var testPath = path.join(root, './testConfigFiles'),
            options = { confPath: testPath };
        server.register({
                register: hapiConfig,
                options: options
            }, function (err) { if (err) { done(err); } }
        );
        expect(server.plugins['hapi-kea-config'].has('web')).to.equal(true);
        expect(server.plugins['hapi-kea-config'].get('web.port')).to.equal(4343);
        done();
    });
    it('should support server decoration by configManager', function (done) {
        var testPath = path.join(root, './testConfigFiles'),
            options = {
                confPath: testPath,
                decorateServer: true
            };
        server.register({
                register: hapiConfig,
                options: options
            }, function (err) { if (err) { done(err); } }
        );
        expect(server.configManager).to.be.exist();
        expect(server.configManager.has('web')).to.equal(true);
        expect(server.configManager.get('web.port')).to.equal(4343);
        done();
    });

});