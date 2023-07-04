const Product = require('../models/productModel');

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
    res.json({mssg: 'getProduct'})
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