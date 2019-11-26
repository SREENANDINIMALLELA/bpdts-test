const axios = require('axios');

function getUsers() {
    // request('https://bpdts-test-app.herokuapp.com/city/London/users', {json: true}, (err, res, body) => {
    //     if (err) { return console.log('An error occurred: ' + err); }

    // });

    getDistanceToLondon(51.752022, -1.257677);
}

function getDistanceToLondon(lat, lon) {
    const bingMapsUrl = "https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?key="
    const apiKey = "AtDXbxI0pFNS3JMaYucCwE7v4YKWGvcrKXANUEYAQVZLKuiLJ4er4BltRuUX9ra-"

    const londonLat = 51.509865;
    const londonLon = -0.118092;

    axios.post(bingMapsUrl + apiKey, {
        "origins": [{
            "latitude": londonLat,
            "longitude": londonLon
        }],
        "destinations": [{
            "latitude": lat,
            "longitude": lon
        }],
        "travelMode": "driving",
        "distanceUnit": "mi"
    })
        .then(function (response) {
            const distance = response.data.resourceSets[0].resources[0].results[0].travelDistance
            console.log(
                distance
            );
            return distance;
        })
        .catch(function (error) {
            console.log(error);
        })
}

module.exports.getUsers = getUsers;