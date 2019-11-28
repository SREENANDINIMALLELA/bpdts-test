const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../app");
const expect = chai.expect;
const nock = require('nock');

const responseData = require('../utils/responseData');
const controller = require('../../controllers/users/functions');

chai.use(chaiHttp);

describe("usersController.getUsersFromCity", () => {
  it("should return an array of London users called with 'London'", (done) => {

    nock('https://bpdts-test-app.herokuapp.com')
      .get('/city/London/users')
      .reply(200, responseData);

    controller.getUsersFromCity("London")
      .then( result => {
        expect(result).to.have.status(200);
      });

    done();

  });
});
