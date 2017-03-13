process.env.DATABASE = "test";
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
                res.should.have.status(400);
                done();
            });
    });

    it('should have a post Method', function (done) {
        var mock = new Meme();
        chai.request(server)
            .post("/mail")
            .send({
                "subject" : "test",
                "content" : "this is a tes",
                "receiver_name" : "test receiver",
                "receiver_email" : "test@test.com"
            })
            .end(function(err, res){
                res.should.have.status(202);
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
            .delete("/mail/1")
            .end(function(err, res){
                res.should.have.status(404);
                done();
            });
    });
});