const axios = require('axios');

function getUsers(req, res) {
  axios.all([getLondonUsers()])
    .then(axios.spread(function(londonUsers) {
      res.status(200).send(londonUsers.data);
    }))
    .catch(errors => {
      res.status(500).send(errors);
    })
}

function getLondonUsers() {
  return axios.get('https://bpdts-test-app.herokuapp.com/city/London/users');
}

module.exports.getUsers = getUsers;
