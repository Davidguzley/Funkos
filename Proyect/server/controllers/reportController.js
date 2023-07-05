const Report = require('../models/reportModel');

// Create new report
const addReport = async (req, res) => {
    const {SKU, token_id, product_name} = req.body;
    //add doc todb
    try{
        const report = await Report.create({SKU, token_id, product_name});
        res.status(200).json(report);
    }catch(error){
        res.status(400).json({error: error.message});
    }
};

// Get all products
const getReports = async (req, res) => {
    res.json({mssg: 'getReports'})
};

module.exports = {
    addReport,
    getReports
};