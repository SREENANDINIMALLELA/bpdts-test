const axios = require('axios');

function getUsers(req, res) {
  axios.all([getUsersFromCity("London")])
    .then(axios.spread(function(londonUsers) {
      res.status(200).send(londonUsers.data);
    }))
    .catch(errors => {
      res.status(500).send(errors);
    })
}

function getUsersFromCity(city) {
  return axios.get(`https://bpdts-test-app.herokuapp.com/city/${city}/users`);
}

module.exports.getUsers = getUsers;
module.exports.getUsersFromCity = getUsersFromCity;
