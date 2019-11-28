const axios = require('axios');

async function getUsers() {

    axios.all([getLondonUsers(), getUserList()])
        .then(axios.spread(function (londonUsers, allUsers) {
            const london = londonUsers.data;

            const filteredUsers = allUsers.data.filter(function(user) {
                return mathDistanceToLondon(user.latitude, user.longitude) < 50;
            });

            london.concat(filteredUsers);
        }))
        .catch(function(error) {
            console.log(error);
        })
}

function getLondonUsers() {
    return axios.get('https://bpdts-test-app.herokuapp.com/city/London/users');
}

function getUserList() {
    return axios.get('https://bpdts-test-app.herokuapp.com/users');
}

function mathDistanceToLondon(lat, lon) {
    const londonLat = 51.509865;
    const londonLon = -0.118092;

	if ((londonLat == lat) && (londonLon == lon)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * londonLat/180;
		var radlat2 = Math.PI * lat/180;
		var theta = londonLon-lon;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
        return dist;
	}
}

module.exports.getUsers = getUsers;