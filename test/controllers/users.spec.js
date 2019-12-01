const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../app");
const expect = chai.expect;
const nock = require('nock');

const responseData = require('../utils/responseData');
const controller = require('../../controllers/users/functions');

chai.use(chaiHttp);

describe("usersController.getUsersFromCity", () => {
  it("should return a populated users when called with a valid city", (done) => {

    nock('https://bpdts-test-app.herokuapp.com')
      .get('/city/London/users')
      .reply(200, responseData.usersData);

    controller.getUsersFromCity("London")
      .then( result => {
        expect(result).to.have.status(200);
        expect(result.data).to.have.lengthOf(10);
      });

    done();

  });

  it("should return an empty array when no results for city found", (done) => {

    nock('https://bpdts-test-app.herokuapp.com')
      .get('/city/INVALID/users')
      .reply(200, []);

    controller.getUsersFromCity("INVALID")
      .then( result => {
        expect(result).to.have.status(200);
        expect(result.data).to.have.lengthOf(0);
      });

    done();

  });
});

describe("usersController.getDistance", () => {
  it("should return a correct distance when given 2 valid co-ordinate sets", (done) => {

    const place1 = { latitude: 51.509865, longitude: -0.118092 };
    const place2 = { latitude: 51.752022, longitude: -1.257677 };

    const result = controller.getDistance(place1, place2);

    expect(result).to.equal(51.716102958721066);
    done();
  })
});


