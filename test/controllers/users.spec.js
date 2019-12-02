const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../app");
const expect = chai.expect;
const nock = require('nock');

const responseData = require('../utils/responseData');
const controller = require('../../controllers/users/functions');
const constants = require('../../lib/constants');

chai.use(chaiHttp);

describe("usersController.getUsersFromCity", () => {
  it("should return a populated array of users when called with a valid city", async () => {

    nock('https://bpdts-test-app.herokuapp.com')
      .get('/city/London/users')
      .reply(200, responseData.usersByCityData);

    return controller.getUsersFromCity("London")
      .then( result => {
        expect(result).to.have.status(200);
        expect(result.data).to.have.lengthOf(10);
      });

  });

  it("should return an empty array when no results for city found", async () => {

    nock('https://bpdts-test-app.herokuapp.com')
      .get('/city/INVALID/users')
      .reply(200, []);

    return controller.getUsersFromCity("INVALID")
      .then( result => {
        expect(result).to.have.status(200);
        expect(result.data).to.have.lengthOf(0);
      });

  });
});

describe("usersController.getDistance", () => {
  it("should return a correct distance when given 2 valid co-ordinate sets", async () => {

    const place1 = { latitude: 51.509865, longitude: -0.118092 };
    const place2 = { latitude: 51.752022, longitude: -1.257677 };

    const result = controller.getDistance(place1, place2);

    return expect(result).to.equal(51.716102958721066);
  })
});

describe("usersController.getUsersWithinDistance", () => {
  it("should return a filtered array of users within set filter distance", async () => {

    nock('https://bpdts-test-app.herokuapp.com')
      .get('/users')
      .reply(200, responseData.allUsersData);

    const london = constants.London;

    return controller.getUsersWithinDistance(london, 50)
      .then(result => {
        expect(result).to.have.lengthOf(2);
      });
  });

  it("should return an empty array when no users found within set filter distance", async () => {

    nock('https://bpdts-test-app.herokuapp.com')
      .get('/users')
      .reply(200, responseData.noLondonUsersData);

    const london = constants.London;

    return controller.getUsersWithinDistance(london, 50)
      .then(result => {
        expect(result).to.have.lengthOf(0);
      });
  });
});

describe("usersController.getUsers", () => {
  it("should return a combined array of users when retrieved users from both sources", async () => {

    nock('https://bpdts-test-app.herokuapp.com')
      .get('/users')
      .reply(200, responseData.allUsersData);

    nock('https://bpdts-test-app.herokuapp.com')
      .get('/city/London/users')
      .reply(200, responseData.usersByCityData);

      chai.request(server)
        .get('/users/London')
        .end((error, result) => {
            expect(result.body).to.have.lengthOf(12);
        })

  });

  it("should return 200 with an error message when data retrieval throws error", async () => {

    nock('https://bpdts-test-app.herokuapp.com')
      .get('/users')
      .reply(404, responseData.allUsersData);

    nock('https://bpdts-test-app.herokuapp.com')
      .get('/city/London/users')
      .reply(200, responseData.usersByCityData);

      chai.request(server)
        .get('/users/London')
        .end((error, result) => {
          expect(result).to.have.status(200);
          expect(result.body.message).to.contain('404');
        });

  })
})


