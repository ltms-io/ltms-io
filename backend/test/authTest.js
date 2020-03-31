const chai = require('chai');
var chaiHttp = require('chai-http');
const app = require('../app');
const should = require('should');
const jsonWeb = require('jsonwebtoken');

chai.use(chaiHttp);

describe('App', function() {
    it('POST call should return a unique json token for a user', function(done) {
        this.timeout(5000);
        chai.request(app)
            .post('/api/users/login')
            .send({'data': 'auth0|5e6d97ca0845710c92221b3e'})
            .end(function(err, res){
                console.log("-------------------------------");
                console.log("Getting Token for John Smith\n");
                jsonWeb.verify(res.text, "123456", (err, decoded) =>{
                    console.log("Token name: " + decoded.name);
                    console.log("-------------------------------");
                    chai.assert(decoded.name, "John Smith");
                })
                res.should.have.property('status', 200);
                done();
            });
            console.log("\n\n");
    });
    it('POST call should return 404 given non-existant user', function(done) {
        this.timeout(5000);
        chai.request(app)
            .post('/api/users/login')
            .send({'data': 'auth0|e6d97ca0845710c92221b3e'})
            .end(function(err, res){
                console.log("-------------------------------");
                console.log("Sending request for non-existant user\n");
                console.log("Response from the server: " + res.text);
                console.log("-------------------------------");
                res.should.have.property('status', 404);
                done();
            });
            console.log("\n\n");
    });
    it('POST call should return 400 given no authID was sent', function(done) {
        this.timeout(5000);
        chai.request(app)
            .post('/api/users/login')
            .send({'data': ''})
            .end(function(err, res){
                console.log("-------------------------------");
                console.log("Sending request for no user\n");
                console.log("Response from the server: " + res.text);
                console.log("-------------------------------");
                res.should.have.property('status', 400);
                done();
            });
            console.log("\n\n");
    });
    it("POST call should send two different json tokens given two user inputs", function(done) {
        this.timeout(5000);
        chai.request(app)
            .post('/api/users/login')
            .send({'data': 'auth0|5e6d97ca0845710c92221b3e'})
            .end( (err, res) => {
                console.log("-------------------------------");
                console.log("Getting Token for John Smith\n");
                jsonWeb.verify(res.text, "123456", (err, decoded) =>{
                    console.log("Token name: " + decoded.name);
                    console.log("-------------------------------");
                    chai.assert(decoded.name, "John Smith");
                })
                res.should.have.property('status', 200);
            });
        chai.request(app)
            .post('/api/users/login')
            .send({'data': 'auth0|5e6d4b450845710c9221941f'})
            .end((err, res) => {
                console.log("-------------------------------");
                console.log("Getting Token for jackdoherty@purdue.edu\n");
                jsonWeb.verify(res.text, "123456", (err, decoded) =>{
                    console.log("Token name: " + decoded.name);
                    console.log("-------------------------------");
                    chai.assert(decoded.name, "jackdoherty@purdue.edu");
                })
                res.should.have.property('status', 200);
                done();
            });
            console.log("\n\n");
    });
    it("POST call should respond with whole user as a token", function(done) {
        this.timeout(5000);
        chai.request(app)
            .post('/api/users/login')
            .send({'data': 'auth0|5e6d97ca0845710c92221b3e'})
            .end( (err, res) => {
                console.log("-------------------------------");
                console.log("Getting Token for John Smith\n");
                jsonWeb.verify(res.text, "123456", (err, decoded) =>{
                    console.log("Token contents: ");
                    console.log("Name: " + decoded.name);
                    console.log("Email: " + decoded.email);
                    console.log("auth0id: " + decoded.auth0id);
                    console.log("EventAuthorizer: " + decoded.eventAuthorizer);
                    console.log("UserAuthorizer: " + decoded.userAuthorizer);
                    console.log("Mongo Id: " + decoded._id);
                    console.log("-------------------------------");
                    chai.assert(decoded.name, "John Smith");
                    chai.assert(decoded.email, "email3@email.com");
                    chai.assert(decoded.auth0id, "auth0|5e6d97ca0845710c92221b3e");
                    chai.assert(decoded._id, "5e7a559ea962e63d00522276");
                    chai.assert(decoded.userAuthorizer, true);
                    chai.assert(!decoded.eventAuthorizer, true);
                })
                done();
        })
    })
    it()
});