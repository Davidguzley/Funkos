const Admin = require('../models/adminModel');
const jwt = require ('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await Admin.login(email, password);
        
        // create a token for admin
        const token = createToken(user._id)
        
        res.status(200).json({email, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const logoutUser = async (req, res) => {
    res.json({mssg: 'logout user'})
};

module.exports = { loginUser, logoutUser };