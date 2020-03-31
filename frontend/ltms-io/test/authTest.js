/*
how to use:

installs in frontend/ltms-io:
    npm install mocha chai should chai-http

open package.json
    "scripts: {
        "test": "mocha"
    }"

in terminal run command:
    mocha --exit

exit flag ends the server after tests have finished
*/


const chai = require('chai');
var chaiHttp = require('chai-http');
const app = require('../../../backend/app');
const should = require('should');

chai.use(chaiHttp);

describe('App', function() {
    it('POST call should return a unique json token for a user', function(done) {
        chai.request(app)
            .post('/api/users/login')
            .send({'data': 'auth0|5e6d97ca0845710c92221b3e'})
            .end(function(err, res){
                console.log(res.text);
                res.should.have.property('status', 200);
                done();
            });
    });
    it('POST call should return 404 given invalid user', function(done) {
        chai.request(app)
            .post('/api/users/login')
            .send({'data': 'auth0|e6d97ca0845710c92221b3e'})
            .end(function(err, res){
                console.log(res.text);
                res.should.have.property('status', 404);
                done();
            });
    });
    it('POST call should return 400 given no authID was sent', function(done) {
        chai.request(app)
            .post('/api/users/login')
            .send({'data': ''})
            .end(function(err, res){
                console.log(res.text);
                res.should.have.property('status', 400);
                done();
            });
    });
});