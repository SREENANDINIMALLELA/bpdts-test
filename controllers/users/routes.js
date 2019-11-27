const express = require('express');
const functions = require('./functions');

const router = new express.Router();

router.get('/users', functions.getUsers);

module.exports = router;