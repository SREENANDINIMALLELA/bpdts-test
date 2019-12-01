const express = require("express");
const app = express();

const usersRoutes = require('./controllers/users/routes.js');

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.use('/users', usersRoutes);

module.exports = app;
