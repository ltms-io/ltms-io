const chai = require('chai');
var chaiHttp = require('chai-http');
const app = require('../app');
const should = require('should');
const expect = chai.expect;

chai.use(chaiHttp);

describe("Team Backend Routes", () => {
  describe("Send Rubric", () => {
    it("POST call for send rubrics with email and tournament name given should succeed", (done) => {
      chai.request(app)
      .post("/api/teams/sendrubrics/5e7f18462b37260116171336")
      .send({
        email: "test@nonexistentemail.com",
        tournName: "Test Non-Existent Tournament"
      })
      .end( (err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal("Email sent successfully");
        done();
      });
    });

    it("POST call for send rubrics with at least one of email or tournament name missing should not succeed", (done) => {
      chai.request(app)
      .post("/api/teams/sendrubrics/5e7f18462b37260116171336")
      .send({
        email: "test@nonexistentemail.com",
      })
      .end( (err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.equal("No email and/or tournament name given");
      });

      chai.request(app)
      .post("/api/teams/sendrubrics/5e7f18462b37260116171336")
      .send({
        tournName: "Test Non-Existent Tournament"
      })
      .end( (err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.equal("No email and/or tournament name given");
      });

      chai.request(app)
      .post("/api/teams/sendrubrics/5e7f18462b37260116171336")
      .send({})
      .end( (err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.equal("No email and/or tournament name given");
        done();
      });
    });

    it("POST call for send rubrics with an empty email should not succeed", (done) => {
      chai.request(app)
      .post("/api/teams/sendrubrics/5e7f18462b37260116171336")
      .send({
        email: "",
        tournName: "Test Non-Existent Tournament"
      })
      .end( (err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.equal("No email and/or tournament name given");
        done();
      });
    });

    it("POST call for send rubrics with an invalid/non-existent team id should not succeed", (done) => {
      chai.request(app)
      .post("/api/teams/sendrubrics/5e7f18462b37123456123456")
      .send({
        email: "test@nonexistentemail.com",
        tournName: "Test Non-Existent Tournament"
      })
      .end( (err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Team doesn't exist");
        done();
      });
    });
  });
});
