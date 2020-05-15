const chai = require('chai');
var chaiHttp = require('chai-http');
const app = require('../app');
const should = require('should');
const expect = chai.expect;

chai.use(chaiHttp);

describe("Team Backend Routes", () => {
  describe("Send Rubrics", () => {
    // it("POST call for send rubrics with email and tournament name given should succeed", (done) => {
    //   chai.request(app)
    //   .post("/api/teams/sendrubrics/5e7f18462b37260116171336")
    //   .send({
    //     email: "test@nonexistentemail.com",
    //     tournName: "Test Non-Existent Tournament"
    //   })
    //   .end( (err, res) => {
    //     expect(res).to.have.status(200);
    //     expect(res.text).to.equal("Email sent successfully");
    //     done();
    //   });
    // });

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

    it("POST call for send rubrics with an invalid/non-existent team ID should not succeed", (done) => {
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

  describe("Delete Rubric", () => {
    it("PATCH call for delete rubric with no email or unique ID given should not succeed", (done) => {
      chai.request(app)
      .patch("/api/teams/rubricdelete/5e80fb3eedf94844d0918814")
      .send({})
      .end( (err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.equal("No unique ID or email given");
      });

      chai.request(app)
      .patch("/api/teams/rubricdelete/5e80fb3eedf94844d0918814")
      .send({
        email: "test@nonexistentemail.com"
      })
      .end( (err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.equal("No unique ID or email given");
      });

      chai.request(app)
      .patch("/api/teams/rubricdelete/5e80fb3eedf94844d0918814")
      .send({
        uniqueID: "testfakeIDtest"
      })
      .end( (err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.equal("No unique ID or email given");
        done();
      });
    });

    it("PATCH call for delete rubric with an invalid/non-existent team ID should not succeed", (done) => {
      chai.request(app)
      .patch("/api/teams/rubricdelete/5e7f18462b37123456123456")
      .send({
        email: "test@nonexistentemail.com",
        uniqueID: "testfakeIDtest"
      })
      .end( (err, res) => {
        expect(res).to.have.status(404);
        expect(res.text).to.equal("Team not found");
        done();
      });
    });

    it("PATCH call for delete rubric with an invalid/non-existent email/unique ID should not succeed", (done) => {
      chai.request(app)
      .patch("/api/teams/rubricdelete/5e80fb3eedf94844d0918814")
      .send({
        email: "test@nonexistentemail.com",
        uniqueID: "testfakeIDtest"
      })
      .end( (err, res) => {
        expect(res).to.have.status(404);
        expect(res.text).to.equal("Rubric not found");
        done();
      });
    });

    it("PATCH call for delete rubric with valid email and unique ID should succeed", (done) => {
      chai.request(app)
      .patch("/api/teams/5e80fb3eedf94844d0918814")
      .send({
        rubric: {
          email: "test@notreallyexistentemail.com",
          uniqueID: "testkindafakeIDtest",
          name: "Fake Name",
          coreValues: "random filler stuff",
          innovationProject: "random filler stuff",
          robotDesign: "random filler stuff"
        }
      })
      .end( (err, res) => {
        chai.request(app)
        .patch("/api/teams/rubricdelete/5e80fb3eedf94844d0918814")
        .send({
          email: "test@notreallyexistentemail.com",
          uniqueID: "testkindafakeIDtest"
        })
        .end( (err, res) => {
          expect(res).to.have.status(200);
          done();
        });
      });
    });
  });
});
