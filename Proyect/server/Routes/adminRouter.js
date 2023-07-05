let CONSTANTS = require("../constantsProject");
const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');

const {
    createAdmin,
    getAdmins,
    getAdmin,
    deleteAdmin,
    updateAdmin
} = require('../controllers/adminController');

// Require auth for all admin routes
router.use(requireAuth);

// GET all Admin users
router.get('/', getAdmins);

// POST a new Admin user
router.post('/', createAdmin);

// DELETE a single Admin user
router.delete('/:id', deleteAdmin);

// UPDATE a single Admin user
router.patch('/:id', updateAdmin);

module.exports = router;