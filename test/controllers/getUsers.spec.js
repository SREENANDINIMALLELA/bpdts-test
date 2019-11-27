const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../app");
const expect = chai.expect;

chai.use(chaiHttp);

describe("usersController", function() {
  it("should return 200 and contain users data when invoking getUsers (/users GET)", function(done) {
    chai
      .request(server)
      .get("/users")
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.data).to.include({
          id: 135,
          first_name: "Mechelle",
          last_name: "Boam",
          email: "mboam3q@thetimes.co.uk",
          ip_address: "113.71.242.187",
          latitude: -6.5115909,
          longitude: 105.652983
        });
      });
    done();
  });
});
