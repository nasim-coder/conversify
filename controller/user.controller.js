const { user } = require('../models/index')
const {hash, compare} = require('bcrypt');
exports.register = async (req, res)=>{
    const { firstName, lastName, email, password } = req.body;
    const userFound = await user.findOne({where:{ email}});
    if(userFound){
        return res.status(200).send({success: false, message: 'email already exist'});
    }
    const hashedpassword = await hash(password, 10);
    const created = await user.create({firstName, lastName, email, password: hashedpassword});
    res.status(201).send({success: true, message: 'registered successfully'});
}

exports.signin = async (req, res)=>{

}

exports.userList = async (req, res)=>{

}

exports.userDetails = async (req, res)=>{

}
