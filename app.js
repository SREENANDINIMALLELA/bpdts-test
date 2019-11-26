const express = require("express");
const app = express();

const usersRoutes = require('./routes/users/routes.js');

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get('/users', function(req, res) {
    res.send('List of users');
})

app.use('/', usersRoutes);

module.exports = app;