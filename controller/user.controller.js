const { user } = require('../models/index')
const { hash, compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');
require('dotenv').config();
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
    const {email, password} = req.body;
    const loginuser = await user.findOne({where:{ email }});
    if(!loginuser){
        return res.status(400).send({success: false, message:'No user found with the provided email'});
    }
    const isCorrct = await compare(password, loginuser.password);

    if(!isCorrct){
        return res.status(200).send({success: false, message: 'Incorrect password'});
    }
    const token = sign({id: loginuser.id, firstName: loginuser.firstName, email: loginuser.email}, process.env.secret, {expiresIn: "5h"});
    return res.status(200).send({success: true, message: 'loggedin successfully', token });

}

exports.userList = async (req, res)=>{
const userslist = await user.findAll({
    attributes: ['firstName', 'lastName']
});
res.status(200).send({success: true, data: userslist});

}

exports.userDetails = async (req, res)=>{

}
