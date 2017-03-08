var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../../app');

chai.use(chaiHttp);


describe('Mail Page', function() {
    it('Index page shoul have a get method', function (done) {
        chai.request(server)
            .get("/mail")
            .end(function(err, res){
                res.should.have.status(200);
                done();
            });
    });

    it('should have a post Method', function (done) {
        chai.request(server)
            .post("/mail")
            .send({"id" : 1})
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('SUCCESS');
                done();
            });
    });


    it('shouldn\'t have a put Method', function (done) {
        chai.request(server)
            .put("/mail/1")
            .send({"data" : 1})
            .end(function(err, res){
                res.should.have.status(404);
                done();
            });
    });

    it('shouldn\'t have a delete Method', function (done) {
        chai.request(server)
            .put("/mail/1")
            .end(function(err, res){
                res.should.have.status(404);
                done();
            });
    });
});