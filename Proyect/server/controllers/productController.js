const createProduct = async (req, res) => {
    res.json({mssg: 'createProduct'})
};

const getProducts = async (req, res) => {
    res.json({mssg: 'getProducts'})
};

const getProduct = async (req, res) => {
    res.json({mssg: 'getProduct'})
};

const deleteProduct = async (req, res) => {
    res.json({mssg: 'deleteProduct'})
};

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