var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../../app');

chai.use(chaiHttp);


describe('Index Page', function() {
    it('Index page shoul have a get method', function (done) {
        chai.request(server)
            .get("/")
            .end(function(err, res){
                res.should.have.status(200);
                done();
            });
    });

    it('shouldn\'t have a post Method', function (done) {
        chai.request(server)
            .put("/")
            .send({"data" : 1})
            .end(function(err, res){
                res.should.have.status(404);
                done();
            });
    });

    it('shouldn\'t have a put Method', function (done) {
        chai.request(server)
            .put("/1")
            .send({"data" : 1})
            .end(function(err, res){
                res.should.have.status(404);
                done();
            });
    });

    it('shouldn\'t have a delete Method', function (done) {
        chai.request(server)
            .put("/1")
            .end(function(err, res){
                res.should.have.status(404);
                done();
            });
    });
});