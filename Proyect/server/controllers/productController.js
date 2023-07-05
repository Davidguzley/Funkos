const Product = require('../models/productModel');
const mongoose = require('mongoose');

// Create new workout
const createProduct = async (req, res) => {
    res.json({mssg: 'createProduct'})
};

// Get all products
const getProducts = async (req, res) => {
    const products = await Product.find({}).sort({createdAt: -1});

    res.status(200).json(products);
};

// Get a single product
const getProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such product'});
    }

    const product = await Product.findById(id);

    if (!product) {
        return res.status(404).json({error: 'No such product'});
    }

    res.status(200).json(product);
};

// Delete a product
const deleteProduct = async (req, res) => {
    res.json({mssg: 'deleteProduct'})
};

// Update a product
const updateProduct = async (req, res) => {
    res.json({mssg: 'updateProduct'})
};

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct
};