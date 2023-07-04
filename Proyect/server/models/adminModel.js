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
}, { timestamps: true });

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

adminSchema.statics.login = async function(email, password) {
    //validation
    if (!email || !password) {
        throw Error('All fields must be filled');
    }

    const admin = await this.findOne({ email });
    if (!admin) {
        throw Error('Incorrect Email');
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
        throw Error('Incorrect password');
    }

    return admin;
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;