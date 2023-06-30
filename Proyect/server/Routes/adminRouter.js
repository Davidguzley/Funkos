let CONSTANTS = require("../constantsProject");
const express = require('express');
const router = express.Router();

const {
    createAdmin,
    getAdmins,
    getAdmin,
    deleteAdmin,
    updateAdmin
} = require('../controllers/adminController');

// GET all Admin users
router.get('/', getAdmins);

// GET a single Admin user
router.get('/:id', getAdmin);

// POST a new Admin user
router.post('/', createAdmin);

// DELETE a single Admin user
router.delete('/:id', deleteAdmin);

// UPDATE a single Admin user
router.patch('/:id', updateAdmin);

module.exports = router;