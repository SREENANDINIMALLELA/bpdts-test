const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('getUsersController', function() {
  it('should return 200 on getUsers (/users GET)', function(done) {
      chai.request(server)
        .get('/users')
        .end(function(err, res){
          res.should.have.status(200);
          done();
        });
    });
});