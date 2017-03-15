process.env.RABBITMQ_QUEUE = 'test';
process.env.MAIL_PROVIDERS='';
process.env.DATABASE = "test";
process.env.MONGODB_DATABASE ='test';
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../app');
var mongoose = require('mongoose');

chai.use(chaiHttp);

after(function (done) {
    mongoose.connection.db.dropDatabase(function () {
        mongoose.connection.close(function () {
            done();
        });
    });
});

describe('Mail Page', function() {
    it('Index page shoul have a get method', function (done) {
        chai.request(server)
            .get("/mail/api/v1")
            .end(function(err, res){
                res.should.have.status(400);
                done();
            });
    });

    it('should have a post Method', function (done) {
        chai.request(server)
            .post("/mail/api/v1")
            .send({
                "subject" : "test",
                "content" : "test",
                "receiver_name" : "test",
                "receiver_email" : "test@test.tst"
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
            .put("/mail/api/v1/1")
            .send({"data" : 1})
            .end(function(err, res){
                res.should.have.status(404);
                done();
            });
    });

    it('shouldn\'t have a delete Method', function (done) {
        chai.request(server)
            .delete("/mail/api/v1/1")
            .end(function(err, res){
                res.should.have.status(404);
                done();
            });
    });
});