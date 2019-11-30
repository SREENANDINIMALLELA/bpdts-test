const axios = require('axios');
const geolib = require('geolib');
const _ = require('lodash');
const constants = require('../../lib/constants');

const getUsers = async (req, res) => {

  try {
    const usersByCity = getUsersFromCity(req.params.city);
    const usersByDistance = getUsersWithinDistance(constants[req.params.city], 50);
    
    const [londonUsers, filteredUsers] = await Promise.all([usersByCity, usersByDistance]);
    
    res.status(200).send(_.union(londonUsers.data, filteredUsers));
  } catch(errors) {
    res.send(errors);
  }
}

const getUsersFromCity = (city) => axios.get(`https://bpdts-test-app.herokuapp.com/city/${city}/users`);

const getAllUsers = () => axios.get('https://bpdts-test-app.herokuapp.com/users');

const getDistance = (coOrdSet1, coOrdSet2) => {
  const distanceInMetres = geolib.getDistance(coOrdSet1, coOrdSet2);
  return geolib.convertDistance(distanceInMetres, "mi");
}

const getUsersWithinDistance = async (city, distance) => {
  const allUsers = await getAllUsers();
  const usersWithinDistance = allUsers.data.filter(({latitude, longitude}) => {
    return getDistance(city, {latitude, longitude}) <= distance;
  });

  return usersWithinDistance;
}

module.exports = {
  getUsers,
  getUsersFromCity,
  getAllUsers,
  getDistance,
  getUsersWithinDistance
}
