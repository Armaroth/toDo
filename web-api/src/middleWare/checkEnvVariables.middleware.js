require('dotenv').config();
function checkEnvVariables(req, res, next) {
    if (!process.env.JWT_ACCESS_KEY || !process.env.JWT_REFRESH_KEY) {
        res.error = 'No secret keys available.Cannot proceed.'
    }
    next();
}
module.exports = checkEnvVariables;