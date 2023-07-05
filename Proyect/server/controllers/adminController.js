const Admin = require('../models/adminModel');
const jwt = require ('jsonwebtoken');
const mongoose = require('mongoose');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// Create new Admin user
const createAdmin = async (req, res) => {
    const {first_name, last_name, email, password} = req.body

    // signup Admin
    try {
        const admin = await Admin.signup(first_name, last_name, email, password);
        
        // create a token for admin
        const token = createToken(admin._id)
        
        res.status(200).json({email, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const getAdmins = async (req, res) => {
    const admins = await Admin.find({}).sort({createdAt: -1});

    res.status(200).json(admins);
};

const getAdmin = async (req, res) => {
    res.json({mssg: 'getAdmin'})
};

const deleteAdmin = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such admin'});
    }

    const admin = await Admin.findOneAndDelete({_id: id});

    if (!admin) {
        return res.status(404).json({error: 'No such admin'});
    }

    res.status(200).json(admin);
};

const updateAdmin = async (req, res) => {
    res.json({mssg: 'updateAdmin'})
};

module.exports = {
    createAdmin,
    getAdmins,
    getAdmin,
    deleteAdmin,
    updateAdmin
};