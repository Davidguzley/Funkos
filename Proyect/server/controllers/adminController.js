const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// Create new Admin user
const createAdmin = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    // signup Admin
    try {
        const admin = await Admin.signup(first_name, last_name, email, password);

        // create a token for admin
        const token = createToken(admin._id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all admin users
const getAdmins = async (req, res) => {
    const admins = await Admin.find({}).sort({ createdAt: -1 });

    res.status(200).json(admins);
};

// Delete a specific admin user
const deleteAdmin = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such admin' });
    }

    const admin = await Admin.findOneAndDelete({ _id: id });

    if (!admin) {
        return res.status(404).json({ error: 'No such admin' });
    }

    res.status(200).json(admin);
};

// Update and validate new user information
const updateAdmin = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such admin' });
    }

    const { first_name, last_name, email } = req.body;

    try {
        let admin = await Admin.findById(id);

        if (!admin) {
            return res.status(404).json({ error: 'No such admin' });
        }

        // Check if any field is empty
        if (!first_name || !last_name || !email) {
            return res.status(400).json({ error: 'All fields must be filled' });
        }

        // Check if the email is being changed
        if (email !== admin.email) {
            const emailExists = await Admin.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ error: 'Email already in use' });
            }
        }

        // Update admin attributes
        admin.first_name = first_name;
        admin.last_name = last_name;
        admin.email = email;

        const updatedAdmin = await admin.save();

        res.status(200).json(updatedAdmin);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createAdmin,
    getAdmins,
    deleteAdmin,
    updateAdmin,
};
