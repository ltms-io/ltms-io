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
    it('app should return user email3', function(done) {
        chai.request(app)
            .get('/api/users/5e7a559ea962e63d00522276')
            .end(function(err, res){
                //console.log(res.body.name);
                res.should.have.property('status', 200);
                res.body.should.have.property('name');
                chai.assert(res.body.name, "John Stuart");
                done();
        });
    });
    it('app should return user searched', function(done) {
        chai.request(app)
            .post('/api/users/search')
            .send({'name': 'John Stuart'})
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.property('status', 200);
                done();
            });
    });
    it('app should send 404 for wrong input', function(done){
        chai.request(app)
            .post('/api/users/search')
            .send({'name': 'John Allen'})
            .end(function(err, res){
                res.should.have.property('status', 404);
                done();
            });
    });
});