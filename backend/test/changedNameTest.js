const chai = require('chai');
var chaiHttp = require('chai-http');
const app = require('../app');
const should = require('should');
const jsonWeb = require('jsonwebtoken');

chai.use(chaiHttp);

describe('App', function() {
    it('POST call should return a updated json token for a changed user', function(done) {
        this.timeout(5000);
        chai.request(app)
            .post('/api/users/login')
            .send({'data': 'auth0|5e6d97ca0845710c92221b3e'})
            .end(function(err, res){
                console.log("-------------------------------");
                console.log("Getting Token for John Stewart\n");
                jsonWeb.verify(res.text, "123456", (err, decoded) =>{
                    console.log("Token name: " + decoded.name);
                    console.log("-------------------------------");
                    chai.assert(decoded.name, "John Stewart");
                })
                res.should.have.property('status', 200);
                done();
            });
            console.log("\n\n");
    });
});