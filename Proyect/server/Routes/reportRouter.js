let CONSTANTS = require("../constantsProject");
const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');

const { addReport, getReports } = require('../controllers/reportController');

// Add report to the database
router.post('/', addReport);

// GET all reports
router.get('/', requireAuth, getReports);

module.exports = router;