let CONSTANTS = require("../constantsProject");
const express = require('express');
const router = express.Router();

const {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct
} = require('../controllers/productController');

// GET all products
router.get('/', getProducts);

// GET a single product
router.get('/:id', getProduct);

// POST a new product
router.post('/', createProduct);

// DELETE a single product
router.delete('/:id', deleteProduct);

// UPDATE a single product
router.patch('/:id', updateProduct);

module.exports = router;