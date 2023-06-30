const createAdmin = async (req, res) => {
    res.json({mssg: 'createAdmin'})
};

const getAdmins = async (req, res) => {
    res.json({mssg: 'getAdmins'})
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