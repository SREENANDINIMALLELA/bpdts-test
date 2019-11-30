const express = require('express');
const functions = require('./functions');

const router = new express.Router();

router.get('/users/:city', functions.getUsers);

module.exports = router;