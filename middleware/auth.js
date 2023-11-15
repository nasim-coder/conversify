const { verify } = require('jsonwebtoken');
require('dotenv').config();
exports.isLoggedIn = async (req, res, next) => {
    try {
        const token = req?.headers?.authorization?.split(' ')[1];
        const decoded = verify(token, process.env.secret);
        if (decoded) {
            req.data = decoded;
            next();
        } else {
            res.status(401).send({ success: false, message: 'authentication failed' });
        }
    } catch (err) {
        res.status(401).send({ success: false, message: 'authentication failed' });
    }

}