const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const adminSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

adminSchema.statics.signup = async function(first_name, last_name, email, password) {
    const exists = await this.findOne({ email });

    if (exists) {
        throw Error('Email alredy in use');
    }

    //validation
    if (!email || !password || !first_name || !last_name) {
        throw Error('All fields must be filled');
    }
    if (!validator.isEmail(email)){
        throw Error('Email is not valid');
    }
    if (!validator.isStrongPassword(password)){
        throw Error('Password not stong enough');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const admin = await this.create({ first_name, last_name, email, password: hash });

    return admin;
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;