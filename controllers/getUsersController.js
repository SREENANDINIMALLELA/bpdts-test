const app = require('../app');

app.get('/users')

function getLondonUsers() {
    request('https://bpdts-test-app.herokuapp.com/city/London/users', {json: true}, (err, res, body) => {
        if (err) { return console.log('An error occurred: ' + err); }

    });
} 