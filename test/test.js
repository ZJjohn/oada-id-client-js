'use strict';
var fs = require('fs');
var express = require('express');
var expect = require("chai").expect;
var core = require("..");

var stateObj = {
	key: "kjdsinafnj32lkndsfi103n4",
	domain: "oada.com",
	conf: "configuration",
	callback: function() {},
	options: "noOp",
};

var optionsIDT = {
    client_id: 'zhihao Jiang',
    redirect_uri: 'https:www.purdue.edu',
    privateKey: {
        pem: fs.readFileSync('../examples/sever-client/Privkey.pem'),
        kid: 'key_id_corresponding_to_pem',
    },
};


var domain = "oada.com";
var configuration = "configuration";
var parameters = "parameters";
var opts = "options";


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

    describe('#getIDToken', function(){
        it('should call authorize()', function(){
            core.getIDToken(domain, optionsIDT, function(err, redirect_uri){
                    if (err) res.redirect(redirect_uri);
                    }, function(err, IDToken){
                if (err) { return console.dir(err); } // Soemthing went wrong

                console.dir(idToken);
            })
        });
    });


});
