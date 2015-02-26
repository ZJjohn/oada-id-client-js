'use strict';
var fs = require('fs');
var request = require('supertest');
var express = require('express');
var expect = require("chai").expect;
var app = express();
var login = require("..").middleware;
var core = require("..");

var domain = "oada.com";
var configuration = "configuration";
var parameters = "parameters";
var opts = "options";

var stateObj = {
    key: "kjdsinafnj32lkndsfi103n4",
    domain: "oada.com",
    conf: "configuration",
    callback: function() {},
    options: "noOp",
};

var options = {
    client_id: 'jf93caauf3uzud7f308faesf3@identity.oada-dev.com',
    'redirect_uri': 'http://localhost:3007/redirect',
    privateKey: {
        pem: fs.readFileSync('test/Privkey.pem'),
        kid: 'keyid',
    },
    scope: 'bookmarks.machines.harvesters',
};


describe("core", function(){

    describe(' init', function(){
        it('should be initialed', function(){
            expect(core.init).to.be.a.function;
        });

        it('should be assigned', function(){
            core.init(opts);
        });
    });


    describe('#storeState', function() {

        it('should be exported', function() {
            expect(core.storeState).to.be.a.function;
        });

        it('should store and retrieve the same object', function() {
            core.storeState(stateObj, function (err, stateTok){
                expect(err).to.not.be.ok;
                expect(stateTok).to.be.ok;

                core.retrieveState(stateTok, function(err, stateObjRet) {
                    expect(err).to.be.not.ok;
                    expect(stateObjRet).to.be.equal(stateObj);
                });
            });
        });

        it ('should not allow storeState overwrite without overwriting retrieveState', function (){
            var storeState = core.storeState;

            core.storeState = undefined;
            core.retrieveState('', function(err){
                expect(err).to.be.ok;
                core.storeState = storeState;
            });
        });

        it ('should not allow retrieveState overwrite without overwriting storeState', function (){
            var retrieveState = core.retrieveState;

            core.retrieveState = undefined;
            core.storeState('', function(err){
                expect(err).to.be.ok;
                core.retrieveState = retrieveState;
            });
        });

    });
});



app.use('/who',
   login.getIDToken('identity.oada-dev.com', options));
app.use('/get',
    login.getAccessToken('identity.oada-dev.com', options));
/*app.use('/redirect', login.handleRedirect());
app.use('/redirect', function(req, res) {
    res.json(req.token);
});*/


describe("middleWare", function(){
    describe("GET /who", function(){
        it('should generate the IDToken', function(done){
            request(app)
                .get('/who')
                .expect(302, done);

        });
    });

    describe("GET /get", function(){
        it('generate the access token', function(done){
            request(app)
                .get('/get')
                .expect(302, done);
        });
    });


   /* describe("GET /redirect", function(){
        it('should handleRedirect', function(done){
            request(app)
                .get('/redirect')
                .expect(302, done);
        });
    });*/
    //})

});
