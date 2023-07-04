const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    SKU: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;