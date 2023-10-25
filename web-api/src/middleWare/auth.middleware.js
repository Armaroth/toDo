const jwt = require('jsonwebtoken');

function validateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);
    let user;
    try {
        user = jwt.verify(JSON.parse(token), process.env.JWT_SECRET_KEY);
        if (!(typeof user === 'object' && 'id' in user)) {
            throw new Error('invalid user extracted from token');
        }
        res.locals.user = user;
    } catch (e) {
        console.log('here')
        return res.sendStatus(401);
    }
    next();
}
module.exports = validateToken;