const Admin = require('../models/adminModel');
const jwt = require ('jsonwebtoken');

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
    res.json({mssg: 'deleteAdmin'})
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