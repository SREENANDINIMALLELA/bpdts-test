const axios = require('axios');
const geolib = require('geolib');
const _ = require('lodash');
const constants = require('../../lib/constants');

const getUsers = async (req, res) => {
  try {
    const usersByCity = getUsersFromCity(req.params.city);
    const usersByDistance = getUsersWithinDistance(constants[req.params.city], 50);
    
    const [londonUsers, filteredUsers] = await Promise.all([usersByCity, usersByDistance]);
    
    res.status(200).json(_.union(londonUsers.data, filteredUsers));
  } catch(errors) {
    res.send(errors);
  }
}

const getUsersFromCity = (city) => axios.get(`https://bpdts-test-app.herokuapp.com/city/${city}/users`);

const getAllUsers = () => axios.get('https://bpdts-test-app.herokuapp.com/users');

const getDistance = (from, to) => {
  const distanceInMetres = geolib.getDistance(from, to);
  return geolib.convertDistance(distanceInMetres, "mi");
}

const getUsersWithinDistance = async (city, distance) => {
  const allUsers = await getAllUsers();
  return allUsers.data.filter(({latitude, longitude}) => {
    return getDistance(city, {latitude, longitude}) <= distance;
  });
}

module.exports = {
  getUsers,
  getUsersFromCity,
  getAllUsers,
  getDistance,
  getUsersWithinDistance
}
