'use strict';
var fs = require('fs');
var request = require('supertest');
var express = require('express');
var app = express();
var login = require("..").middleware;

var options = {
    client_id: 'jf93caauf3uzud7f308faesf3@identity.oada-dev.com',
    'redirect_uri': 'http://localhost:3007/redirect',
    privateKey: {
        pem: fs.readFileSync('test/Privkey.pem'),
        kid: 'keyid',
    },
    scope: 'bookmarks.machines.harvesters',
};


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
