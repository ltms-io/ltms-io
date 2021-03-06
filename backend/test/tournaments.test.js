const chai = require('chai');
var chaiHttp = require('chai-http');
const app = require('../app');
const should = require('should');
const expect = chai.expect;

chai.use(chaiHttp);

describe("Tournament Backend Routes", () => {
  describe("Search", () => {
    it("POST call for search with empty or no fields given should not succeed", (done) => {
      chai.request(app)
      .post("/api/tournaments/search")
      .send({})
      .end( (err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Bad request: no searchable fields included.");
      });

      chai.request(app)
      .post("/api/tournaments/search")
      .send({
        tournament_name: "",
        user_name: "",
        date: ""
      })
      .end( (err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Bad request: no searchable fields included.");
        done();
      });
    });

    it("POST call for search with no fields except for an invalid director username should not succeed", (done) => {
      chai.request(app)
      .post("/api/tournaments/search")
      .send({
        user_name: "testthisisveryfaketest"
      })
      .end( (err, res) => {
        expect(res).to.have.status(404);
        expect(res.text).to.equal("No results found");
        done();
      });
    });

    it("POST call for search with fields that do not match should not succeed", (done) => {
      chai.request(app)
      .post("/api/tournaments/search")
      .send({
        tournament_name: "testthisisveryfaketest",
        user_name: "testthisisalsofaketest",
        date: "2022-05-03T19:00:00.000Z"
      })
      .end( (err, res) => {
        expect(res).to.have.status(404);
        expect(res.text).to.equal("No results found");
        done();
      });
    });

    it("POST call for search with fields that do match should succeed", (done) => {
      chai.request(app)
      .post("/api/tournaments/search")
      .send({
        tournament_name: "Test"
      })
      .end( (err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.not.be.empty;
      });

      chai.request(app)
      .post("/api/tournaments/search")
      .send({
        user_name: "John"
      })
      .end( (err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.not.be.empty;
      });

      chai.request(app)
      .post("/api/tournaments/search")
      .send({
        date: "2020-04-20T19:00:00.000Z"
      })
      .end( (err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.not.be.empty;
      });

      chai.request(app)
      .post("/api/tournaments/search")
      .send({
        tournament_name: "test",
        user_name: "John"
      })
      .end( (err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.not.be.empty;
      });

      chai.request(app)
      .post("/api/tournaments/search")
      .send({
        user_name: "John",
        date: "2020-04-20T19:00:00.000Z"
      })
      .end( (err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.not.be.empty;
      });

      chai.request(app)
      .post("/api/tournaments/search")
      .send({
        tournament_name: "test",
        date: "2020-04-20T19:00:00.000Z"
      })
      .end( (err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.not.be.empty;
      });

      chai.request(app)
      .post("/api/tournaments/search")
      .send({
        tournament_name: "test",
        user_name: "John",
        date: "2020-04-20T19:00:00.000Z"
      })
      .end( (err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.not.be.empty;
        done();
      });
    });
    it("GET call should return success given valid tournament", (done) => {
      chai.request(app)
      .get("/api/tournaments/schedule/5e7c53f30c6d5700d3701567")
      .send()
      .end( (err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.not.be.empty;
        done();
      })
    });
    it("GET call should return error given invalid tournament", (done) => {
      chai.request(app)
      .get("/api/tournaments/schedule/5e834fd76221c1118acfcf2d")
      .send()
      .end( (err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.empty;
        done();
      })
    });

    it("PDF GET with INVALID tourney ID should return bad request", done => {
      chai.request(app)
        .get("/api/tournaments/1/pdf")
        .send()
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        })
    });

    it("PDF GET with VALID tounrey ID should return success", done => {
      chai.request(app)
        .get("/api/tournaments/5e7a5410be7af1ae4acc6314/pdf")
        .send()
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        })
    });
  });
});
