const axios = require('axios');
const geolib = require('geolib');
const constants = require('../../lib/constants');

const getUsers = (req, res) => {
  axios.all([getUsersFromCity("London"), getUsersWithinDistance(constants.LONDON, 50)])
  .then(axios.spread(function(londonUsers, filteredUsers) {
    res.status(200).send(londonUsers.data.concat(filteredUsers));
  }))
  .catch(errors => {
    res.status(500).send(errors);
  })
}

const getUsersFromCity = (city) => axios.get(`https://bpdts-test-app.herokuapp.com/city/${city}/users`);

const getAllUsers = () => axios.get('https://bpdts-test-app.herokuapp.com/users');

const getDistance = (coOrdSet1, coOrdSet2) => {
  const distanceInMetres = geolib.getDistance(coOrdSet1, coOrdSet2);
  return geolib.convertDistance(distanceInMetres, "mi");
}

const getUsersWithinDistance = (city, distance) => {
  return getAllUsers()
    .then( users => {
      return users.data.filter(function(user){
        return getDistance(city, asCoOrds(user.latitude, user.longitude)) <= distance;
      })
    })
    .catch( error => {
      return error;
    })
}

const asCoOrds = (lat, lon) => {
  return {latitude: lat, longitude: lon}
};

module.exports.getUsers = getUsers;
module.exports.getUsersFromCity = getUsersFromCity;
module.exports.asCoOrds = asCoOrds;
module.exports.getDistance = getDistance;
