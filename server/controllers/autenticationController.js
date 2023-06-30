const loginUser = async (req, res) => {
    res.json({mssg: 'login user'})
};

const logoutUser = async (req, res) => {
    res.json({mssg: 'logout user'})
};

module.exports = { loginUser, logoutUser, signupUser };