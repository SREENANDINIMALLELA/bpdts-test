const express = require("express");
const app = express();

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get('/users', function(req, res) {
    res.send('List of users');
})

module.exports = app;