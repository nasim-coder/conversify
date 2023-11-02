const { verify } = require('jsonwebtoken');
require('dotenv').config();
exports.isLoggedIn = async (req, res, next)=>{
    console.log('555');
    const token = req.headers.authorization.split(' ')[1];
    const decoded = verify(token, process.env.secret);
    console.log('token', token);
    console.log('decoded', decoded);
    if(decoded){
        req.data = decoded;
        next();
    }else{
        res.status(401).send({success: false, message: 'authentication failed'});
    }
}