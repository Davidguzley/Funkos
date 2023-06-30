let CONSTANTS = require("../constantsProject");
const express = require('express');
const router = express.Router();

const { loginUser, logoutUser } = require('../controllers/autenticationController');

router.post('/login', loginUser);

router.post('/logout', logoutUser);

module.exports = router;